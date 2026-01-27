import { supabase } from "@/lib/supabase";

export async function createTestUser({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}) {
  console.log("Creating test user...");
  // 1) Sign up (creates unconfirmed user if email confirmations are enabled)
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    console.error("Sign up error:", signUpError.message);
    throw new Error(`Sign up error: ${signUpError.message}`);
  }

  // signUpData.user may be undefined if not created; check
  const userId = signUpData?.user?.id;
  if (!userId) {
    console.warn(
      "User created but not signed in. You may need to sign in first before upserting profile.",
    );
  }

  // If we have current session user id, use it; otherwise after sign up you can sign in:
  let id = userId;
  if (!id) {
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    if (signInError) {
      // If sign in fails due to email confirmation required, skip profile upsert
      console.warn(
        "Sign in after sign up failed (maybe email confirmation required). Skipping profile upsert for now.",
      );
    } else {
      id = signInData?.user?.id;
    }
  }

  // 2) Upsert profile (only if we have the user id in session)
  // NOTE: This assumes you have a 'profiles' table. If not, this part will fail but user is created.
  if (id) {
    // Check if profiles table exists by trying to select from it first or just upsert
    // But for now we just try upsert as per user request
    const profile = {
      id, // must be same type (uuid)
      full_name: displayName,
      updated_at: new Date().toISOString(),
    };

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .upsert(profile, { onConflict: "id" })
      .select();

    if (profileError) {
      console.warn(
        `Profile upsert error (table might not exist): ${profileError.message}`,
      );
    } else {
      console.log("Profile updated:", profileData);
      return {
        user: signUpData.user ?? null,
        profile: profileData?.[0] ?? null,
      };
    }
  }

  return { user: signUpData.user ?? null, profile: null };
}

// Auto-run if imported (for quick test) - we will call this explicitly in main.tsx instead to rely on HMR
