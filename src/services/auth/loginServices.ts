import { getSupabaseBroswerClient } from "@/src/lib/supabase/supabaseClient";
import * as z from "zod";

interface RegisterServicesProps {
  email: string;
  password: string;
}

// Data yang di dapat dari useLogin di kirim ke sini
async function signInNewUser({ email, password }: RegisterServicesProps) {
  const supabase = getSupabaseBroswerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export default signInNewUser;
