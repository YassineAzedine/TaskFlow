'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [token, setToken] = useState<string | null>(null);
  // const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setToken(null);
  //   router.push('/');
  // };

  return (
       <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
              <Link href="/">
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            TaskFlow
          </span>
        </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {token ? (
            <Link
              href="/dashboard/overview"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
              >
                Connexion
              </Link>
              <Link
                href="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </nav>
  );
}
