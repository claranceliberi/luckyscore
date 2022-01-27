<script setup lang="ts">
  import StatsBlockView from "@/components/MatchView/StatsBlockView.vue";

  interface PlayerStat {
    player: {
      name: string;
    };
    amount: number;
    team: {
      name: string;
    };
  }

  const goalsStats: Array<PlayerStat> = [
    { player: { name: "Mugisha Isaac" }, amount: 4, team: { name: "Year 3" } },
    { player: { name: "Liberi Ntwari" }, amount: 4, team: { name: "Year 3" } },
    { player: { name: "Olivier" }, amount: 3, team: { name: "Welding L3" } },
    {
      player: { name: "Shumbusho Anglebert" },
      amount: 2,
      team: { name: "Year 2" },
    },
    { player: { name: "Alexandre N" }, amount: 4, team: { name: "FOP L5" } },
  ];
  const assistsStats: Array<PlayerStat> = [
    { player: { name: "I. Divin" }, amount: 2, team: { name: "Year 3" } },
    { player: { name: "Kenny Cyusa" }, amount: 2, team: { name: "Year 3" } },
    { player: { name: "Emmy" }, amount: 1, team: { name: "FOP L5" } },
    {
      player: { name: "Shumbusho Anglebert" },
      amount: 1,
      team: { name: "Year 2" },
    },
    { player: { name: "Alexandre N" }, amount: 1, team: { name: "FOP L5" } },
  ];
  const yellowCardsStats: Array<PlayerStat> = [
    { player: { name: "I. Divin" }, amount: 2, team: { name: "Year 3" } },
    { player: { name: "Kenny Cyusa" }, amount: 2, team: { name: "Year 3" } },
    { player: { name: "Emmy" }, amount: 1, team: { name: "FOP L5" } },
  ];
</script>
<template>
  <h1 class="mt-10 mb-2 font-bold">Goals</h1>
  <StatsBlockView :display-stats="goalsStats"></StatsBlockView>
  <h1 class="mt-4 mb-2 font-bold">Assists</h1>
  <StatsBlockView :display-stats="assistsStats"></StatsBlockView>
  <h1 class="mt-4 mb-2 font-bold">Yellow Cards</h1>
  <StatsBlockView :display-stats="yellowCardsStats"></StatsBlockView>
  <h1 class="mt-4 mb-2 font-bold">Red Cards</h1>
  <StatsBlockView :display-stats="[]"></StatsBlockView>
</template>
