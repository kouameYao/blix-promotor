import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { Locale } from '@/i18n.config';

export const metadata: Metadata = {
  title: 'Home'
};

export default async function HomePage({
  params: { lang }
}: {
  params: { lang: Locale };
}) {
  const session = await auth();

  if (session && session.user) {
    return redirect('/fr/dashboard');
  } else {
    return redirect('/fr/login');
  }
}
