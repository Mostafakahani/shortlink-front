import LayoutDashboard from '@/components/layout/Dashboard';

export default function DashboardLayoutInternal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutDashboard>{children}</LayoutDashboard>;
}
