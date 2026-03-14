import React from 'react';
import { getSchemeById } from '@/lib/db-schemes';
import SchemeDetailClient from '@/components/SchemeDetailClient';
import { notFound } from 'next/navigation';

export default async function SchemePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const scheme = await getSchemeById(resolvedParams.id);

    if (!scheme) {
        notFound();
    }

    return <SchemeDetailClient scheme={scheme} />;
}
