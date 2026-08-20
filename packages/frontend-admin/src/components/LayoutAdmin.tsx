'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import HeaderAdmin from './Header';

interface LayoutAdminProps {
  children: ReactNode;
}

export default function LayoutAdmin({ children }: LayoutAdminProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64">
        <HeaderAdmin />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}