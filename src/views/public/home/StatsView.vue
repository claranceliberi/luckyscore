<script setup lang="ts">
  import StatsBlockView from "@/components/molecules/StatsBlockMolecule.vue";
  import { supabase } from "@/lib/supabase";
  import { IPlayerMatch } from "@/types/global";
  import { reactive, ref } from "vue";

  interface IPlayerStat {
    player: {
      id: string;
      name: string;
    };
    amount: number;
    team: {
      name: string;
    };
  }

  let playersStats_fromDB: IPlayerMatch[] = reactive<IPlayerMatch[]>([]);
  const goalsStats: Array<IPlayerStat> = reactive<Array<IPlayerStat>>([]);
  const assistsStats: Array<IPlayerStat> = reactive<Array<IPlayerStat>>([]);
  const yellowCardsStats: Array<IPlayerStat> = reactive<Array<IPlayerStat>>([]);
  const redCardsStats: Array<IPlayerStat> = reactive<Array<IPlayerStat>>([]);
  const loading = ref(true);

  supabase
    .from<IPlayerMatch>("player_match")
    .select(
      `
      *,
      player:  player_id(
        *,
        team: team_id(*))

      `,
    )
    .then((data) => {
      playersStats_fromDB = data.data || [];

      playersStats_fromDB.map((singlePlayer) => {
        // pushing goals into array of goalsStats
        goalsStats.push({
          player: {
            id: singlePlayer.player.id,
            name: singlePlayer.player.full_name,
          },
          amount: singlePlayer.goals,
          team: {
            name: singlePlayer.player.team.name,
          },
        });

        // pushing assists into array of assistsStats
        assistsStats.push({
          player: {
            id: singlePlayer.player.id,
            name: singlePlayer.player.full_name,
          },
          amount: singlePlayer.assists,
          team: {
            name: singlePlayer.player.team.name,
          },
        });

        // pushing yellow cards into array of yellowCardsStats
        yellowCardsStats.push({
          player: {
            id: singlePlayer.player.id,
            name: singlePlayer.player.full_name,
          },
          amount: singlePlayer.yellow_card,
          team: {
            name: singlePlayer.player.team.name,
          },
        });

        // pushing red cards into array of redCardsStats
        redCardsStats.push({
          player: {
            id: singlePlayer.player.id,
            name: singlePlayer.player.full_name,
          },
          amount: singlePlayer.red_card,
          team: {
            name: singlePlayer.player.team.name,
          },
        });
      });

      loading.value = false;
    });
</script>
<template>
  <template v-if="!loading">
    <h1 class="mt-10 mb-2 font-bold">Goals</h1>
    <StatsBlockView :display-stats="goalsStats"></StatsBlockView>
    <h1 class="mt-4 mb-2 font-bold">Assists</h1>
    <StatsBlockView :display-stats="assistsStats"></StatsBlockView>
    <h1 class="mt-4 mb-2 font-bold">Yellow Cards</h1>
    <StatsBlockView :display-stats="yellowCardsStats"></StatsBlockView>
    <h1 class="mt-4 mb-2 font-bold">Red Cards</h1>
    <StatsBlockView :display-stats="redCardsStats"></StatsBlockView>
  </template>
  <p v-else class="mt-10 mb-2">Loading Stats.....</p>
</template>
