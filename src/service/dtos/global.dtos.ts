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
  content(content: any): void;
  id: string | number;
  name: string;
  shortCode: string;
  originalUrl: string;
  createdAt: string;
  clickCount: number;
  password: string;
  url?: string;
  type: string;
}
export interface Note {
  id: string | number;
  name: string;
  shortCode: string;
  originalUrl: string;
  createdAt: string;
  clickCount: number;
  password: string;
  url?: string;
  content: string;
  type: string;
}

export interface UserLinksResponse {
  data: Link[];
}
export interface UserNotesResponse {
  data: Note[];
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
export interface NoteDetails {
  content: string;
  password: string;
  shortCode: string;
  name: string;
  totalVisits: number;
  browsers: { name: string; count: number }[];
  topIPs: { ip: string; count: number }[];
  data: Note;
}
