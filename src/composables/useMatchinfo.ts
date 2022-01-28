import { supabase } from "@/lib/supabase";
import router from "@/router";
import { IMatchTeamJoin } from "@/types/global";
import { PostgrestResponse } from "@supabase/supabase-js";
import { ref } from "vue";

const allDetails = ref<IMatchTeamJoin | null>(null);

/**
 * Retrieve match info by its id
 */
async function fetchMatchDetails(id: string) {
  try {
    const { data: match, error } = await supabase
      .from<IMatchTeamJoin>("match")
      .select("*,away:away_team ( * ),home:home_team ( * )")
      .eq("id", id)
      .single();

    if (error) {
      console.log("error", error);
      return;
    }

    // store response to allDetails
    allDetails.value = match;
    console.log("got match!", allDetails.value);
  } catch (err) {
    console.error("Error retrieving match data from db", err);
  }
}

export { allDetails, fetchMatchDetails };
