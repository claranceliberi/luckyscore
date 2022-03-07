import { supabase } from "@/lib/supabase";
import router from "@/router";
import { IMatchTeamJoin, Events, IEventType } from "@/types/global";
import { ref } from "vue";

const allDetails = ref<IMatchTeamJoin | null>(null);
const allEvents = ref<Events[] | null>(null);

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
      .eq("match_id", id)
      .order("created_at", { ascending: false });

    if (error1) {
      console.error("error", error1);
      return;
    }
    if (error) {
      console.error("error", error);
      return;
    }

    // get goals
    const home_score = events?.filter(
      (e) =>
        (e.type === IEventType.GOAL && e.team_id === match?.home.id) ||
        (e.type.toLowerCase() === "own goal" && e.team_id === match?.away.id),
    ).length;
    const away_score = events?.filter(
      (e) =>
        (e.type === IEventType.GOAL && e.team_id === match?.away.id) ||
        (e.type === IEventType.OWN_GOAL && e.team_id === match?.home.id),
    ).length;

    // get shots
    const home_shots = events?.filter(
      (e) => e.type === IEventType.SHOT && e.team_id === match?.home.id,
    ).length;
    const away_shots = events?.filter(
      (e) => e.type === IEventType.SHOT && e.team_id === match?.away.id,
    ).length;

    // get shots ON Target
    const home_shots_on_target = events?.filter(
      (e) =>
        e.type === IEventType.SHOT_ON_TARGET && e.team_id === match?.home.id,
    ).length;
    const away_shots_on_target = events?.filter(
      (e) =>
        e.type === IEventType.SHOT_ON_TARGET && e.team_id === match?.away.id,
    ).length;

    // get Fouls
    const home_fouls = events?.filter(
      (e) => e.type === IEventType.FOUL && e.team_id === match?.home.id,
    ).length;
    const away_fouls = events?.filter(
      (e) => e.type === IEventType.FOUL && e.team_id === match?.away.id,
    ).length;

    // get Yellow Cards
    const home_yellow_cards = events?.filter(
      (e) => e.type === IEventType.YELLOW_CARD && e.team_id === match?.home.id,
    ).length;
    const away_yellow_cards = events?.filter(
      (e) => e.type === IEventType.YELLOW_CARD && e.team_id === match?.away.id,
    ).length;

    // get Red Cards
    const home_red_cards = events?.filter(
      (e) => e.type === IEventType.RED_CARD && e.team_id === match?.home.id,
    ).length;
    const away_red_cards = events?.filter(
      (e) => e.type === IEventType.RED_CARD && e.team_id === match?.away.id,
    ).length;

    // get Offsides
    const home_offsides = events?.filter(
      (e) => e.type === IEventType.OFFSIDE && e.team_id === match?.home.id,
    ).length;
    const away_offsides = events?.filter(
      (e) => e.type === IEventType.OFFSIDE && e.team_id === match?.away.id,
    ).length;

    // get Corners
    const home_corners = events?.filter(
      (e) => e.type === IEventType.CORNER && e.team_id === match?.home.id,
    ).length;
    const away_corners = events?.filter(
      (e) => e.type === IEventType.CORNER && e.team_id === match?.away.id,
    ).length;

    console.log(match);

    match
      ? (match.home_score = match.forfeit ? match.home_score : home_score || 0)
      : null;
    match
      ? (match.away_score = match.forfeit ? match.home_score : away_score || 0)
      : null;

    match
      ? (match.home_shots =
          Number(home_shots) +
            Number(home_shots_on_target) +
            Number(home_score) || 0)
      : null;
    match
      ? (match.away_shots =
          Number(away_shots) +
            Number(away_shots_on_target) +
            Number(away_score) || 0)
      : null;
    match
      ? (match.home_shots_on_target =
          Number(home_shots_on_target) + Number(home_score) || 0)
      : null;
    match
      ? (match.away_shots_on_target =
          Number(away_shots_on_target) + Number(away_score) || 0)
      : null;
    match ? (match.home_fouls = home_fouls || 0) : null;
    match ? (match.away_fouls = away_fouls || 0) : null;
    match ? (match.home_yellow_cards = home_yellow_cards || 0) : null;
    match ? (match.away_yellow_cards = away_yellow_cards || 0) : null;
    match ? (match.home_red_cards = home_red_cards || 0) : null;
    match ? (match.away_red_cards = away_red_cards || 0) : null;
    match ? (match.home_offsides = home_offsides || 0) : null;
    match ? (match.away_offsides = away_offsides || 0) : null;
    match ? (match.home_corners = home_corners || 0) : null;
    match ? (match.away_corners = away_corners || 0) : null;

    // store response to allDetails
    allDetails.value = match;
    allEvents.value = events;
  } catch (err) {
    console.error("Error retrieving match data from db", err);
  }
}

export { allDetails, allEvents, fetchMatchDetails };
