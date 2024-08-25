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
export interface LoginRequestBody {
  phone: string;
  password: string;
}
export interface Link {
  id: string | number;
  name: string;
  shortCode: string;
  originalUrl: string;
  createdAt: string;
  clickCount: number;
  url?: string;
}

export interface UserLinksResponse {
  data: Link[];
}
export interface LinkDetails {
  originalUrl: string;
  password: string;
  shortCode: string;
  name: string;
  totalVisits: number;
  browsers: { name: string; count: number }[];
  topIPs: { ip: string; count: number }[];
  data: Link;
}
