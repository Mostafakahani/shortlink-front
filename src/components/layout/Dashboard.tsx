'use client';
import React from 'react';
import Link from 'next/link';
import {
  Bell,
  CircleUser,
  Home,
  Link2,
  Menu,
  Package,
  Package2,
  QrCode,
  Settings,
  ShoppingCart,
  SquareDashedBottomCodeIcon,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LayoutProps, NavItem } from '@/service/dtos/global.dtos';
import { ModeToggle } from '../ui/ModeToggle';
import { usePathname } from 'next/navigation';
import removeCookie from './removeCookie';
const handleLogout = () => {
  removeCookie('token'); // Replace 'token' with the actual cookie key if different
  // Optionally, add more logout logic here, like redirecting the user
};
export const navItems: NavItem[] = [
  {
    href: '/dashboard',
    icon: SquareDashedBottomCodeIcon,
    label: 'داشبورد',
  },
  {
    href: '/dashboard/links',
    icon: Link2,
    label: 'لینک ها',
    badge: '6',
  },
  {
    href: '/dashboard/notes',
    icon: Link2,
    label: 'یادداشت ها',
  },
  { href: '/dashboard/qrcodes', icon: QrCode, label: 'کیوآر کد ها' },
  {
    href: '/dashboard/settings',
    icon: Settings,
    label: 'تنظیمات حساب',
  },
  //   { href: '/analytics', icon: LineChart, label: 'Analytics' },
];

const NavLink: React.FC<NavItem> = ({
  href,
  icon: Icon,
  label,
  badge,
}) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex mb-1 items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-black/10 hover:dark:bg-white/10 ${
        isActive ? 'text-primary bg-black/10 dark:bg-white/10 ' : ''
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
      {badge && (
        <Badge className="mr-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {badge}
        </Badge>
      )}
    </Link>
  );
};

const MobileNavLink: React.FC<NavItem> = ({
  href,
  icon: Icon,
  label,
  badge,
}) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
        isActive ? 'text-primary bg-black/10 dark:bg-white/10' : ''
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
      {badge && (
        <Badge className="mr-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {badge}
        </Badge>
      )}
    </Link>
  );
};

const Sidebar: React.FC = () => (
  <div className="hidden border-l dark:border-white/10 bg-muted/40 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b dark:border-white/10 px-4 lg:h-[60px] lg:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
        >
          <Package2 className="h-6 w-6" />
          <span className="">ویکسا</span>
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="mr-auto h-8 w-8"
        >
          <Bell className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>
      </div>
    </div>
  </div>
);

const MobileNav: React.FC = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 md:hidden "
      >
        <Menu className="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="flex flex-col">
      <SheetHeader>
        <SheetTitle>
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold mt-10"
          >
            <span>ویکسا</span>
          </Link>
        </SheetTitle>
      </SheetHeader>
      <nav className="grid gap-2 text-lg font-medium mt-4">
        {navItems.map((item) => (
          <MobileNavLink key={item.href} {...item} />
        ))}
      </nav>
    </SheetContent>
  </Sheet>
);

const Header: React.FC = () => (
  <header className="flex h-14 items-center gap-4 border-b dark:border-white/10 bg-muted/40 px-4 lg:h-[60px] lg:px-6">
    <MobileNav />
    <div className="w-full flex-1">
      {/* <form>  //// Search input
        <div className="relative">
          <Search className="absolute right-2.5 top-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full appearance-none bg-background pr-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>*/}
    </div>
    <ModeToggle />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
        >
          <CircleUser className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
);

const LayoutDashboard: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-slate-100 dark:bg-black p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutDashboard;
