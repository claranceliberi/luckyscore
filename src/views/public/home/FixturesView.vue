<script setup lang="ts">
  import MatchDay from "@/components/matchday/MatchesInMatchDay.vue";
  import { supabase } from "@/lib/supabase";

  import { IFixtures } from "@/types/global";

  const fixtures: IFixtures[] = [
    {
      name: "Matchday 1",
      matches: [
        {
          id: "86392",
          season: "302",
          time: "2021-05-16",
          match_status: "Finished",
          in_charge: "18:30",
          home_team: "Granada",
          away_team: "Deportivo Alavés",
          home_score: 4,
          away_score: 2,
          home_fouls: 10,
          away_fouls: 2,
          home_lineup: "",
          match_day: "1",
          description: "",
          home_shots: 0,
          away_shots: 0,
          away_lineup: "",
          home_corners: 0,
          away_corners: 0,
          home_shots_on_target: 0,
          away_shots_on_target: 0,
        },
        {
          id: "86392",
          season: "302",
          time: "2021-05-16",
          match_status: "Finished",
          in_charge: "18:30",
          home_team: "Granada",
          away_team: "Deportivo Alavés",
          home_score: 4,
          away_score: 3,
          home_fouls: 10,
          away_fouls: 2,
          home_lineup: "",
          match_day: "1",
          description: "",
          home_shots: 0,
          away_shots: 0,
          away_lineup: "",
          home_corners: 0,
          away_corners: 0,
          home_shots_on_target: 0,
          away_shots_on_target: 0,
        },
        {
          id: "86392",
          season: "302",
          time: "2021-05-16",
          match_status: "Live",
          in_charge: "18:30",
          home_team: "Granada",
          away_team: "Deportivo Alavés",
          home_score: 4,
          away_score: 151,
          home_fouls: 10,
          away_fouls: 2,
          home_lineup: "",
          match_day: "1",
          description: "",
          home_shots: 0,
          away_shots: 0,
          away_lineup: "",
          home_corners: 0,
          away_corners: 0,
          home_shots_on_target: 0,
          away_shots_on_target: 0,
        },
      ],
    },
  ];
</script>

<template>
  <div v-for="(fixture, key) in fixtures" :key="key" class="my-6">
    <MatchDay :name="fixture.name" :matches="fixture.matches" />
  </div>
</template>
