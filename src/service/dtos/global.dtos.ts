import { LucideIcon } from 'lucide-react';
import React from 'react';
export interface LayoutProps {
  children: React.ReactNode;
}

export interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: string;
}
