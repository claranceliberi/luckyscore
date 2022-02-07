import { Events, IMatchTeamJoin, IPlayerMatch } from "@/types/global";
import { supabase } from "./supabase";

export async function matchPlayers(match: string) {
  return await supabase
    .from<IPlayerMatch>("player_match")
    .select("*,player!player_match_player_id_fkey(id,full_name,team_id)")
    .eq("match", match);
}

export async function events(match: string) {
  const data = await supabase
    .from<Events>("events")
    .select("*")
    .eq("match_id", match);
}

export async function matchGetter(match: string) {
  const data = await supabase
    .from<IMatchTeamJoin>("match")
    .select("*,away:away_team ( * ),home:home_team ( * )")
    .eq("id", match)
    .single();
}
