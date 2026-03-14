const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if (file === 'node_modules' || file === '.next') return;
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, '..', 'src'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Special case for Navbar.tsx which needs setLanguage
    if (file.endsWith('Navbar.tsx')) {
        content = content.replace(
            `import { useRouter } from 'next/navigation';\nimport { useLanguage } from '@/context/LanguageContext';`,
            `import { useTranslations, useLocale } from 'next-intl';\nimport { usePathname, useRouter } from '@/i18n/routing';`
        );
        content = content.replace(
            `const { language, setLanguage, t } = useLanguage();`,
            `const locale = useLocale();\n    const t = useTranslations();\n    const pathname = usePathname();\n    const setLanguage = (lang: string) => {\n        router.replace(pathname, { locale: lang });\n    };`
        );
        content = content.replace(/value=\{language\}/g, `value={locale}`);
        changed = true;
    } else {
        if (content.includes(`import { useLanguage } from '@/context/LanguageContext';`)) {
            let nextIntlImports = ["useLocale"];
            let hasTVar = false;
            let hasLanguageVar = false;

            if (content.includes("const { t, language }") || content.includes("const { language, t }") || content.includes("t(")) {
                nextIntlImports.push("useTranslations");
                hasTVar = true;
            }
            if (content.includes("language")) {
                hasLanguageVar = true;
            }

            content = content.replace(
                `import { useLanguage } from '@/context/LanguageContext';`,
                `import { ${nextIntlImports.join(', ')} } from 'next-intl';`
            );

            // Also replace useRouter from next/navigation with next-intl's if present, except in api routes (not applicable to TSX mostly, but just in case)
            if (content.includes(`import { useRouter } from 'next/navigation';`)) {
                content = content.replace(
                    `import { useRouter } from 'next/navigation';`,
                    `import { useRouter } from '@/i18n/routing';`
                );
            }

            // Replace hook calls
            const regexes = [
                /const\s+\{\s*t,\s*language\s*\}\s*=\s*useLanguage\(\);/g,
                /const\s+\{\s*language,\s*t\s*\}\s*=\s*useLanguage\(\);/g,
                /const\s+\{\s*language\s*\}\s*=\s*useLanguage\(\);/g,
                /const\s+\{\s*t\s*\}\s*=\s*useLanguage\(\);/g
            ];

            const replacement = [];
            if (hasTVar) replacement.push(`const t = useTranslations();`);
            if (hasLanguageVar) replacement.push(`const language = useLocale();`);

            for (const r of regexes) {
                if (r.test(content)) {
                    content = content.replace(r, replacement.join('\n  '));
                }
            }
            
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated', file);
    }
}
