import { PrismaClient } from '@prisma/client';
import { Scheme } from '@/data/schemes';

const prisma = new PrismaClient();

export async function getAllSchemes(): Promise<Scheme[]> {
    const raw = await prisma.scheme.findMany();
    return raw.map(r => ({
        ...r,
        category: r.category as any,
        title: JSON.parse(r.title),
        shortDescription: JSON.parse(r.shortDescription),
        longDescription: JSON.parse(r.longDescription),
        benefitsAmount: JSON.parse(r.benefitsAmount),
        eligibility: JSON.parse(r.eligibility),
        requiredDocuments: JSON.parse(r.requiredDocuments),
        startDate: r.startDate || undefined,
        endDate: r.endDate || undefined,
        launchedBy: r.launchedBy || undefined,
        status: r.status as any,
    }));
}

export async function getSchemeById(id: string): Promise<Scheme | null> {
    const r = await prisma.scheme.findUnique({ where: { id } });
    if (!r) return null;
    return {
        ...r,
        category: r.category as any,
        title: JSON.parse(r.title),
        shortDescription: JSON.parse(r.shortDescription),
        longDescription: JSON.parse(r.longDescription),
        benefitsAmount: JSON.parse(r.benefitsAmount),
        eligibility: JSON.parse(r.eligibility),
        requiredDocuments: JSON.parse(r.requiredDocuments),
        startDate: r.startDate || undefined,
        endDate: r.endDate || undefined,
        launchedBy: r.launchedBy || undefined,
        status: r.status as any,
    };
}
