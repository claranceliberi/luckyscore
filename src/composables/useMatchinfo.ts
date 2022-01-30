import { supabase } from "@/lib/supabase";
import router from "@/router";
import { IMatchTeamJoin, Events, IEventType } from "@/types/global";
import { ref } from "vue";

const allDetails = ref<IMatchTeamJoin | null>(null);

/**
 * Retrieve match info by its id
 */
async function fetchMatchDetails(id: string) {
  try {
    const { data: match, error: error1 } = await supabase
      .from<IMatchTeamJoin>("match")
      .select("*,away:away_team ( * ),home:home_team ( * )")
      .eq("id", id)
      .single();

    const { data: events, error } = await supabase
      .from<Events>("events")
      .select(
        "*,team:team_id ( * ),player:player_id ( * ),assist:assist_id ( * )",
      )
      .eq("match_id", id);

    if (error1) {
      console.log("error", error1);
      return;
    }
    if (error) {
      console.log("error", error);
      return;
    }

    // get goals
    const home_score = events?.filter(
      (e) => e.type === IEventType.Goal && e.team_id === match?.home.id,
    ).length;
    const away_score = events?.filter(
      (e) => e.type === IEventType.Goal && e.team_id === match?.away.id,
    ).length;

    console.log(`score: ${home_score}-${away_score}`);

    match ? (match.home_score = home_score || 0) : null;
    match ? (match.away_score = away_score || 0) : null;

    // store response to allDetails
    allDetails.value = match;
    console.log("got match!", match);
    console.log("got events!", events);
  } catch (err) {
    console.error("Error retrieving match data from db", err);
  }
}

export { allDetails, fetchMatchDetails };
