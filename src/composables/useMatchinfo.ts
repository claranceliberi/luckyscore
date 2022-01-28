import { supabase } from "@/lib/supabase";
import { ref } from "vue";

const allDetails = ref({});

/**
 * Retrieve match info by its id
 */
async function fetchMatchDetails(id: string) {
  try {
    const { data: match, error } = await supabase
      .from("match")
      .select(
        `*, 
     away_team:away_team(id,name),
     home_team:home_team(id,name)`,
      )
      .eq("id", id)
      .single();

    if (error) {
      console.log("error", error);
      return;
    }
    // handle for when no match are returned
    if (match === null) {
      allDetails.value = {};
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
