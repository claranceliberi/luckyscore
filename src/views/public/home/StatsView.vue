<script setup lang="ts">
  import StatsBlockView from "@/components/molecules/StatsBlockMolecule.vue";
  import { supabase } from "@/lib/supabase";
  import { Events, IPlayerStat } from "@/types/global";
  import { reactive, ref } from "vue";

  let playersStats_fromDB: Events[] = reactive<Events[]>([]);
  const goalsStats: Array<IPlayerStat> = reactive<Array<IPlayerStat>>([]);
  const assistsStats: Array<IPlayerStat> = reactive<Array<IPlayerStat>>([]);
  const yellowCardsStats: Array<IPlayerStat> = reactive<Array<IPlayerStat>>([]);
  const redCardsStats: Array<IPlayerStat> = reactive<Array<IPlayerStat>>([]);
  const loading = ref(true);

  function combineStatsByType(statsArray: Array<Events>, type: string) {
    const results: Array<Events> = reactive([]);
    statsArray.forEach(function (o) {
      if (type === "assists" && o.assist_id !== null) {
        results.push(o);
      }
      if (o.type.toLowerCase() === type) {
        results.push(o);
      }
    });
    return results;
  }

  supabase
    .from<Events>("events")
    .select(
      "*,player:player_id(*),assist_player:assist_id(*),team:team_id(id,name)",
    )
    .then((data) => {
      playersStats_fromDB = data.data || [];
      const goal_only = combineStatsByType(playersStats_fromDB, "goal");
      const redcard_only = combineStatsByType(playersStats_fromDB, "red card");
      const yellowcard_only = combineStatsByType(
        playersStats_fromDB,
        "yellow card",
      );
      console.log(goal_only);
      const assits_only = combineStatsByType(playersStats_fromDB, "assists");

      goal_only.map((singlePlayer) => {
        // pushing goals into array of goalsStats
        goalsStats.push({
          player: {
            id: singlePlayer.player.id,
            name: singlePlayer.player.full_name,
          },
          team: {
            name: singlePlayer.team?.name + "",
          },
        });
      });

      //   // pushing assists into array of assistsStats
      assits_only.map((singlePlayer) => {
        assistsStats.push({
          player: {
            id: singlePlayer.assist_player?.id,
            name: singlePlayer.assist_player.full_name,
          },
          team: {
            name: singlePlayer.team?.name + "",
          },
        });
      });
      //   // pushing yellow cards into array of yellowCardsStats
      yellowcard_only.map((singlePlayer) => {
        yellowCardsStats.push({
          player: {
            id: singlePlayer.player.id,
            name: singlePlayer.player.full_name,
          },
          team: {
            name: singlePlayer.team?.name + "",
          },
        });
      });

      //   // pushing red cards into array of redCardsStats
      redcard_only.map((singlePlayer) => {
        redCardsStats.push({
          player: {
            id: singlePlayer.player.id,
            name: singlePlayer.player.full_name,
          },
          team: {
            name: singlePlayer.team?.name + "",
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
  <p v-else class="mt-2 mb-2">Loading Stats.....</p>
</template>
