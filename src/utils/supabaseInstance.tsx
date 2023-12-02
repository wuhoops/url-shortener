import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPA_URL ?? "",
  process.env.SUPA_KEY ?? ""
);

export default supabase;
