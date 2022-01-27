<script setup lang="ts">
  interface PlayerStat {
    player: {
      name: string;
    };
    amount: number;
    team: {
      name: string;
    };
  }

  const displayStats: Array<PlayerStat> = [
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
</script>

<template>
  <div class="my-10 ml-4">
    <div
      v-for="(stat, index) in displayStats"
      :key="stat.player?.name"
      class="flex justify-between my-2 py-2 border-b-2"
    >
      <div class="flex-1">
        <p class="font-semibold">
          <span class="mr-4">{{ index + 1 }}</span> {{ stat.player.name }}
        </p>
        <p class="ml-7 my-1 text-gray-500">{{ stat.team?.name }}</p>
      </div>
      <div>
        <p class="font-semibold">{{ stat.amount }}</p>
      </div>
    </div>
  </div>
</template>
