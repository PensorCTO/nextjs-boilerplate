import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

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
        <p className="mt-4 p-4 bg-red-800/50 text-red-300 text-center border border-red-600 rounded-md">
          {message}
        </p>
      )}
    </>
  );
};

export default async function SignupPage({ searchParams }: { searchParams?: { message?: string } }) {

  const signUp = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return redirect('/signup?message=Could not create user. Please try again.');
    }
    return redirect('/login?message=Check your email to confirm your account and log in.');
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
          <TemporaryLogo />
          <h1 className="text-2xl font-bold text-center mb-4">Create Your Account</h1>
          <p className="text-slate-400 text-center mb-8">Get started with secure video storage.</p>
          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="block text-slate-300 text-sm font-bold mb-2">Email Address</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-slate-300 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" name="password" placeholder="••••••••••••" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
            </div>
            <button formAction={signUp} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">Sign Up</button>
            <Messages message={searchParams?.message} />
          </form>
          <div className="text-center mt-6">
            <span className="text-slate-400">Already have an account? </span>
            <Link href="/login" className="font-bold text-cyan-400 hover:underline">Log In</Link>
          </div>
        </div>
      </main>
    </div>
  );
}