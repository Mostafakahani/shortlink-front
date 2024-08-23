'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function removeCookie(key: string) {
  await cookies().delete(key);
  redirect('/auth/login');
}
