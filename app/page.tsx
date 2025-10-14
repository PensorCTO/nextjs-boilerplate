import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Server Action to handle user logout
  const signOut = async () => {
    "use server";

    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  // --- Database Read Test ---
  const { data: noteData, error: noteError } = await supabase
    .from("notes")
    .select("title")
    .limit(1)
    .single();

  let noteStatus = "Waiting for data...";
  if (noteError) {
    console.error("Error fetching note:", noteError);
    noteStatus = "Failed to fetch from database. Check server logs.";
  } else if (noteData) {
    noteStatus = noteData.title;
  }
  // --- End of Test ---

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <div>
              {/* You can add your app logo or name here */}
              Crypto Locked Video
            </div>
            <form action={signOut}>
              <button className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                Logout
              </button>
            </form>
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-8 opacity-0 max-w-4xl px-3 py-12">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-2xl">
            Welcome, {user.email}
          </h2>

          <div className="p-4 border rounded-md">
            <h3 className="font-bold text-xl mb-2">
              Database Connection Test ✅
            </h3>
            <p>
              <strong>Status:</strong> {noteStatus}
            </p>
          </div>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>Powered by Supabase</p>
      </footer>
    </div>
  );
}