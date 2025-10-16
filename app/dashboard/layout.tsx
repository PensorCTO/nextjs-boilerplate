import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { LogoutButton } from '@/app/components/LogoutButton';

// This async component fetches user data for the sidebar
const Sidebar = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Videos', href: '/videos' },
    { name: 'Upload', href: '/upload' },
    { name: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
      <div className="text-white text-2xl font-bold mb-10 p-2">
        CryptoLock
      </div>
      <nav className="flex-grow">
        <ul>
          {menuItems.map(item => (
            <li key={item.name}>
              <a href={item.href} className="flex items-center text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 my-1 transition-colors duration-200">
                <span className="w-5 h-5 bg-slate-600 rounded-sm mr-3"></span> {/* Icon placeholder */}
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-2">
        <div className="mb-4">
            <p className="text-sm text-slate-400">Logged in as:</p>
            <p className="text-base text-slate-200 truncate" title={user?.email}>{user?.email}</p>
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-800 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}