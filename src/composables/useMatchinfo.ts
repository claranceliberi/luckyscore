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
    let home_score = events?.filter(
      (e) => e.type === IEventType.Goal && e.team_id === match?.home.id,
    ).length;
    let away_score = events?.filter(
      (e) => e.type === IEventType.Goal && e.team_id === match?.away.id,
    ).length;

    // get shots
    let home_shots = events?.filter(
      (e) => e.type === IEventType.SHOT && e.team_id === match?.home.id,
    ).length;
    let away_shots = events?.filter(
      (e) => e.type === IEventType.SHOT && e.team_id === match?.away.id,
    ).length;

    // get shots ON Target
    let home_shots_on_target = events?.filter(
      (e) =>
        e.type === IEventType.SHOT_ON_TARGET && e.team_id === match?.home.id,
    ).length;
    let away_shots_on_target = events?.filter(
      (e) =>
        e.type === IEventType.SHOT_ON_TARGET && e.team_id === match?.away.id,
    ).length;

    // get Fouls
    let home_fouls = events?.filter(
      (e) => e.type === IEventType.FOUL && e.team_id === match?.home.id,
    ).length;
    let away_fouls = events?.filter(
      (e) => e.type === IEventType.FOUL && e.team_id === match?.away.id,
    ).length;

    // get Yellow Cards
    let home_yellow_cards = events?.filter(
      (e) => e.type === IEventType.YELLOW_CARD && e.team_id === match?.home.id,
    ).length;
    let away_yellow_cards = events?.filter(
      (e) => e.type === IEventType.YELLOW_CARD && e.team_id === match?.away.id,
    ).length;

    // get Red Cards
    let home_red_cards = events?.filter(
      (e) => e.type === IEventType.RED_cARD && e.team_id === match?.home.id,
    ).length;
    let away_red_cards = events?.filter(
      (e) => e.type === IEventType.RED_cARD && e.team_id === match?.away.id,
    ).length;

    // get Offsides
    let home_offsides = events?.filter(
      (e) => e.type === IEventType.OFFSIDE && e.team_id === match?.home.id,
    ).length;
    let away_offsides = events?.filter(
      (e) => e.type === IEventType.OFFSIDE && e.team_id === match?.away.id,
    ).length;

    // get Corners
    let home_corners = events?.filter(
      (e) => e.type === IEventType.CORNER && e.team_id === match?.home.id,
    ).length;
    let away_corners = events?.filter(
      (e) => e.type === IEventType.CORNER && e.team_id === match?.away.id,
    ).length;

    console.log(events?.filter((e) => e.type === IEventType.RED_cARD));

    match ? (match.home_score = home_score || 0) : null;
    match ? (match.away_score = away_score || 0) : null;
    match ? (match.home_shots = home_shots || 0) : null;
    match ? (match.away_shots = away_shots || 0) : null;
    match ? (match.home_shots_on_target = home_shots_on_target || 0) : null;
    match ? (match.away_shots_on_target = away_shots_on_target || 0) : null;
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
    console.log("got match!", match);
    console.log("got events!", events);
  } catch (err) {
    console.error("Error retrieving match data from db", err);
  }
}

export { allDetails, fetchMatchDetails };
