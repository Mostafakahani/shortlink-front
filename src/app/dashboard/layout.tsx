import LayoutDashboard from '@/components/layout/Dashboard';
import { checkUserLoginStatus } from './checkUserLoginStatus';
import { redirect } from 'next/navigation';

export default async function DashboardLayoutInternal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = await checkUserLoginStatus();

  if (!isLoggedIn) {
    redirect('/auth/login');
  }

  return <LayoutDashboard>{children}</LayoutDashboard>;
}
