import React from 'react';
import HomePageClient from '@/components/HomePageClient';
import { getAllSchemes } from '@/lib/db-schemes';

export default async function HomePage() {
  const schemes = await getAllSchemes();
  
  return <HomePageClient initialSchemes={schemes} />;
}
