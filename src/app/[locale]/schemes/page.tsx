import React, { Suspense } from 'react';
import SchemeListClient from '@/components/SchemeListClient';
import { getAllSchemes } from '@/lib/db-schemes';

export default async function SchemesPage() {
    const schemes = await getAllSchemes();
    
    return (
        <Suspense fallback={<div className="text-center py-10"><div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto"></div></div>}>
            <SchemeListClient initialSchemes={schemes} />
        </Suspense>
    );
}
