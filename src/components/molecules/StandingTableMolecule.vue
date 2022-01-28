<script setup lang="ts">
  import { ITableStatistics } from "@/types/global";
  import { reactive, ref } from "vue";

  interface ITeamStat {
    team_id: string;
    team_name: string;
    points: number;
    wins: number;
    draws: number;
    loss: number;
    goal_forward: number;
    goal_against: number;
    goal_difference: number;
    match_played: number;
  }

  type allTeamStatistics = {
    allStats: Array<ITableStatistics>;
  };

  const standingTableProps = defineProps<allTeamStatistics>();

  const allResults: ITeamStat[] = reactive<ITeamStat[]>([]);

  standingTableProps.allStats.forEach((singleTeam) => {
    const singleResults: ITeamStat = {
      team_id: "",
      team_name: "",
      points: 0,
      wins: 0,
      draws: 0,
      loss: 0,
      goal_forward: 0,
      goal_against: 0,
      goal_difference: 0,
      match_played: 0,
    };

    singleResults.team_id = singleTeam.id;
    singleResults.team_name = singleTeam.name;

    singleTeam.home_match?.forEach((homeStats) => {
      singleResults.goal_forward += homeStats.home_score;
      singleResults.goal_against += homeStats.away_score;
      if (homeStats.home_score > homeStats.away_score) {
        singleResults.points += 3;
        singleResults.wins += 1;
      } else if (homeStats.home_score === homeStats.away_score) {
        singleResults.points += 1;
        singleResults.draws += 1;
      } else {
        singleResults.loss += 1;
      }
    });

    singleTeam.away_match?.forEach((awayStats) => {
      singleResults.goal_forward += awayStats.away_score;
      singleResults.goal_against += awayStats.home_score;
      if (awayStats.away_score > awayStats.home_score) {
        singleResults.points += 3;
        singleResults.wins += 1;
      } else if (awayStats.away_score === awayStats.home_score) {
        singleResults.points += 1;
      } else {
        singleResults.loss += 1;
      }
    });

    singleResults.goal_difference =
      singleResults.goal_forward - singleResults.goal_against;

    singleResults.match_played =
      singleResults.loss + singleResults.wins + singleResults.draws;

    console.log(singleResults);

    allResults.push(singleResults);
  });

  const displayStats = ref(
    allResults.sort((a, b) => {
      if (a.points > b.points) {
        return -1;
      } else if (a.points == b.points) {
        return a.goal_difference > b.goal_difference ? -1 : 1;
      }
      return 1;
    }) || "",
  );
</script>

<template>
  <h1 class="font-medium md:py-5">Standings</h1>
  <table class="table-auto w-full mb-10">
    <thead class="text-sm text-[#6C757D] font-medium text-right">
      <tr>
        <th></th>
        <th></th>
        <th class="w-2/4"></th>
        <th>P&emsp;</th>
        <th>W&emsp;</th>
        <th>D&emsp;</th>
        <th>L&emsp;</th>
        <th>GF</th>
        <th>GA</th>
        <th>GD</th>
        <th>PTS</th>
      </tr>
    </thead>
    <tbody class="font-medium text-sm">
      <tr
        v-for="(teamStats, index) in displayStats"
        :key="index"
        class="h-12 border-b"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ teamStats.team_name }}</td>
        <td class="space"></td>
        <td class="text-right">{{ teamStats.match_played }}&emsp;</td>
        <td class="text-right">{{ teamStats.wins }}&emsp;</td>
        <td class="text-right">{{ teamStats.draws }}&emsp;</td>
        <td class="text-right">{{ teamStats.loss }}&emsp;</td>
        <td class="text-right">{{ teamStats.goal_forward }}</td>
        <td class="text-right">{{ teamStats.goal_against }}</td>
        <td class="text-right">{{ teamStats.goal_difference }}</td>
        <td class="text-right">{{ teamStats.points }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="css" scoped>
  .td {
    font-family: "Satoshi";
    font-size: 16px;
  }
</style>
