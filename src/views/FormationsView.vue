<template>
  <p class="header">All formations</p>

  <div class="forms">
    <FormationCard :players="players" />
  </div>
</template>

<script lang="ts">
  import FormationCard from "@/components/formations/FormationCard.vue";

  import { IPlayerMatch } from "@/types/global";
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "FormationsView",
    components: {
      FormationCard,
    },
    data() {
      return {
        players: [
          {
            match_id: "1",
            player_id: "Damour",
            red_card: 0,
            yellow_card: 2,
            off_side: 3,
            pitch_position: 1,
            subbed: "Not subbed",
            goals: 3,
            assists: 1,
            big_chances: 2,
            successful_dribbles: 3,
          },
          {
            match_id: "1",
            player_id: "Gershom",
            red_card: 0,
            yellow_card: 2,
            off_side: 3,
            pitch_position: 2,
            subbed: "Not subbed",
            goals: 3,
            assists: 1,
            big_chances: 2,
            successful_dribbles: 3,
          },
          {
            match_id: "1",
            player_id: "Yassin",
            red_card: 0,
            yellow_card: 2,
            off_side: 3,
            pitch_position: 3,
            subbed: "Not subbed",
            goals: 3,
            assists: 1,
            big_chances: 2,
            successful_dribbles: 3,
          },
          {
            match_id: "1",
            player_id: "Fredson",
            red_card: 0,
            yellow_card: 2,
            off_side: 3,
            pitch_position: 4,
            subbed: "Not subbed",
            goals: 3,
            assists: 1,
            big_chances: 2,
            successful_dribbles: 3,
          },
          {
            match_id: "1",
            player_id: "Blessing",
            red_card: 0,
            yellow_card: 2,
            off_side: 3,
            pitch_position: 5,
            subbed: "Not subbed",
            goals: 3,
            assists: 1,
            big_chances: 2,
            successful_dribbles: 3,
          },
          {
            match_id: "1",
            player_id: "Kenny",
            red_card: 0,
            yellow_card: 2,
            off_side: 3,
            pitch_position: 6,
            subbed: "Not subbed",
            goals: 3,
            assists: 1,
            big_chances: 2,
            successful_dribbles: 3,
          },
          {
            match_id: "1",
            player_id: "Liberi",
            red_card: 0,
            yellow_card: 2,
            off_side: 3,
            pitch_position: 7,
            subbed: "Not subbed",
            goals: 3,
            assists: 1,
            big_chances: 2,
            successful_dribbles: 3,
          },
          {
            match_id: "1",
            player_id: "Gervais",
            red_card: 0,
            yellow_card: 2,
            off_side: 3,
            pitch_position: 8,
            subbed: "Not subbed",
            goals: 3,
            assists: 1,
            big_chances: 2,
            successful_dribbles: 3,
          },
          {
            match_id: "1",
            player_id: "Isaac",
            red_card: 0,
            yellow_card: 2,
            off_side: 3,
            pitch_position: 9,
            subbed: "Not subbed",
            goals: 3,
            assists: 1,
            big_chances: 2,
            successful_dribbles: 3,
          },
          {
            match_id: "1",
            player_id: "Divin",
            red_card: 0,
            yellow_card: 2,
            off_side: 3,
            pitch_position: 10,
            subbed: "Not subbed",
            goals: 3,
            assists: 1,
            big_chances: 2,
            successful_dribbles: 3,
          },
          {
            match_id: "1",
            player_id: "Didier",
            red_card: 0,
            yellow_card: 2,
            off_side: 3,
            pitch_position: 11,
            subbed: "Not subbed",
            goals: 3,
            assists: 1,
            big_chances: 2,
            successful_dribbles: 3,
          },
        ] as IPlayerMatch[],
        loading: false,
        goalkeeper: {} as IPlayerMatch | undefined,
      };
    },
  });
</script>

<style scoped>
  .forms {
    gap: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  .header {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 40px;
    text-align: center;
  }
</style>
