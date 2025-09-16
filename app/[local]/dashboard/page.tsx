import { redirect } from 'next/navigation';
import React from 'react';

import { auth } from '@/auth';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/fr/login');
  }

  console.log('session', session);

  return <div>Dashboard</div>;
}
