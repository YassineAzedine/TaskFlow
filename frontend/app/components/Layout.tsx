'use client';
import React, { useState } from 'react';
import Sidebar from './dashboard/Sidebar';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar desktop */}
      <div className="hidden md:flex">
        <Sidebar sidebarOpen={false} setSidebarOpen={function (): void {
          throw new Error('Function not implemented.');
        } } userData={null}  />
      </div>

      {/* Sidebar mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative flex flex-col w-64 bg-white shadow-md">
            <Sidebar sidebarOpen={false} setSidebarOpen={function (): void {
              throw new Error('Function not implemented.');
            } } userData={null} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <main className="p-6">{children}</main>
      </div>

      {/* Mobile toggle button */}
      <button
        className="fixed bottom-6 right-6 md:hidden bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition z-50"
        onClick={() => setSidebarOpen(true)}
      >
        Menu
      </button>
    </div>
  );
}
