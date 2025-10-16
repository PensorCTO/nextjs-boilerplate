import { createClient } from '@/utils/supabase/server';
import React from 'react';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Dashboard</h1>
      <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
        <h2 className="text-xl font-semibold mb-4">Welcome Back, {user?.email}!</h2>
        <p className="text-slate-300">
          This is your secure landing dock. From here, you will be able to manage your encrypted video content.
        </p>
      </div>
    </div>
  );
}