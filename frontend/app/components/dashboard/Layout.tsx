// components/dashboard/Layout.tsx
'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface UserData {
  name: string;
  email: string;
  plan: string;
  projects: number;
  completedTasks: number;
  productivityScore: number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  userData: UserData | null;
}

export default function DashboardLayout({ children, userData }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        userData={userData}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          setSidebarOpen={setSidebarOpen}
          userData={userData}
        />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}