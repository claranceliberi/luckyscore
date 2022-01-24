import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tofusbgfjuqfuwzawljq.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQzMDAxOTE4LCJleHAiOjE5NTg1Nzc5MTh9.xqXs4kuTGfJK6gQVhiVz01lVRCiFmbUkkdd4L3AxoMw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
