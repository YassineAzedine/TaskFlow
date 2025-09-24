// components/dashboard/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface UserData {
  name: string;
  email: string;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  userData: UserData | null;
}

interface NavItem {
  id: string;
  name: string;
  icon: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'overview', name: 'Overview', icon: '📊', href: '/dashboard/overview' },
  { id: 'projects', name: 'Projects', icon: '📁', href: '/dashboard/projects' },
//   { id: 'tasks', name: 'Tasks', icon: '✅', href: '/dashboard/tasks' },
  { id: 'calendar', name: 'Calendar', icon: '📅', href: '/dashboard/calendar' },
//   { id: 'team', name: 'Team', icon: '👥', href: '/dashboard/team' },
  { id: 'analytics', name: 'Analytics', icon: '📈', href: '/dashboard/analytics' },
  { id: 'settings', name: 'Settings', icon: '⚙️', href: '/dashboard/settings' },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen, userData }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signin');
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            TaskFlow
          </span>
        </div>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <nav className="mt-8 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {userData?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{userData?.name || 'User'}</p>
            <p className="text-xs text-gray-500 truncate">{userData?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
}