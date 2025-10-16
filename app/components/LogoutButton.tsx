import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const LogoutButton = () => {
  const signOut = async () => {
    'use server';

    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  return (
    <form action={signOut}>
      <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
        Log Out
      </button>
    </form>
  );
};