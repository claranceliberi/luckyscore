<script setup lang="ts">
  import MatchDay from "@/components/matchday/MatchesInMatchDay.vue";

  import { IFixtures } from "@/types/global";

  const fixtures: IFixtures[] = [
    {
      name: "Matchday 1",
      matches: [
        {
          match_id: "86392",
          league_id: "302",
          league_name: "La Liga",
          match_date: "2021-05-01",
          match_status: "Finished",
          match_time: "18:30",
          match_hometeam_id: "7275",
          match_hometeam_name: "Deportivo Alavés",
          match_hometeam_score: "4",
          match_awayteam_id: "151",
          match_awayteam_name: "Granada",
          match_awayteam_score: "2",
        },
        {
          match_id: "86392",
          league_id: "302",
          league_name: "La Liga",
          match_date: "2021-05-16",
          match_status: "Finished",
          match_time: "18:30",
          match_hometeam_id: "7275",
          match_hometeam_name: "Deportivo Alavés",
          match_hometeam_score: "4",
          match_awayteam_id: "151",
          match_awayteam_name: "Granada",
          match_awayteam_score: "2",
        },
        {
          match_id: "86392",
          league_id: "302",
          league_name: "La Liga",
          match_date: "2021-05-16",
          match_status: "Live",
          match_time: "18:30",
          match_hometeam_id: "7275",
          match_hometeam_name: "Deportivo Alavés",
          match_hometeam_score: "4",
          match_awayteam_id: "151",
          match_awayteam_name: "Granada",
          match_awayteam_score: "2",
        },
      ],
    },
    {
      name: "Matchday 2",
      matches: [
        {
          match_id: "86392",
          league_id: "302",
          league_name: "La Liga",
          match_date: "2021-05-16",
          match_status: "Pending",
          match_time: "18:30",
          match_hometeam_id: "7275",
          match_hometeam_name: "Deportivo Alavés",
          match_hometeam_score: "4",
          match_awayteam_id: "151",
          match_awayteam_name: "Granada",
          match_awayteam_score: "2",
        },
      ],
    },
    {
      name: "Matchday 3",
      matches: [
        {
          match_id: "86392",
          league_id: "302",
          league_name: "La Liga",
          match_date: "2021-05-16",
          match_status: "Postponed",
          match_time: "18:30",
          match_hometeam_id: "7275",
          match_hometeam_name: "Deportivo Alavés",
          match_hometeam_score: "4",
          match_awayteam_id: "151",
          match_awayteam_name: "Granada",
          match_awayteam_score: "2",
        },
      ],
    },
    {
      name: "Matchday 4",
      matches: [
        {
          match_id: "86392",
          league_id: "302",
          league_name: "La Liga",
          match_date: "2021-05-16",
          match_status: "Pending",
          match_time: "18:30",
          match_hometeam_id: "7275",
          match_hometeam_name: "Deportivo Alavés",
          match_hometeam_score: "4",
          match_awayteam_id: "151",
          match_awayteam_name: "Granada",
          match_awayteam_score: "2",
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
