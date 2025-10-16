import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';
import { CopyrightYear } from '@/app/components/CopyrightYear';
import Link from 'next/link';

const TemporaryLogo = () => (
  <svg height="60" width="200" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
    <rect width="200" height="60" rx="8" ry="8" style={{ fill: '#334155', stroke: '#64748b', strokeWidth: 2 }} />
    <text x="100" y="38" fontFamily="Arial, sans-serif" fontSize="20" fill="white" textAnchor="middle">
      Crypto Locked Video
    </text>
  </svg>
);

const Messages = ({ message }: { message?: string }) => {
  return (
    <>
      {message && (
        <p className="mt-4 p-4 bg-slate-700 text-slate-300 text-center border border-slate-600 rounded-md">
          {message}
        </p>
      )}
    </>
  );
};

export default async function LoginPage({ searchParams }: { searchParams?: { message?: string } }) {

  const signIn = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return redirect('/login?message=Could not authenticate user. Please check your credentials.');
    }
    return redirect('/dashboard');
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
          <TemporaryLogo />
          <h1 className="text-2xl font-bold text-center mb-4">Secure Access</h1>
          <p className="text-slate-400 text-center mb-8">Enter your credentials to access your content.</p>
          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="block text-slate-300 text-sm font-bold mb-2">Email Address</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-slate-300 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" name="password" placeholder="••••••••••••" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
            </div>
            <button formAction={signIn} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">Log In</button>
            <Messages message={searchParams?.message} />
          </form>
          <div className="text-center mt-6">
            <span className="text-slate-400">Don't have an account? </span>
            <Link href="/signup" className="font-bold text-cyan-400 hover:underline">Sign Up</Link>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>&copy; <CopyrightYear /> Crypto Locked Video Inc. All Rights Reserved.</p>
        <div className="mt-2">
          <a href="#" className="hover:text-cyan-400 mx-2">Privacy Policy</a> |
          <a href="#" className="hover:text-cyan-400 mx-2">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}