import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPA_URL ?? "",
  process.env.NEXT_PUBLIC_SUPA_KEY ?? ""
);

export default supabase;
