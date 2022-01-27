<script setup lang="ts">
  import { ref } from "vue";

  interface PlayerStat {
    player: {
      name: string;
    };
    amount: number;
    team: {
      name: string;
    };
  }

  type StatsBlockProps = {
    displayStats: Array<PlayerStat>;
  };

  const statsBlockProps = defineProps<StatsBlockProps>();
  const displayStats = ref(statsBlockProps.displayStats || "");
</script>

<template>
  <div class="my-10 ml-4">
    <div v-if="displayStats.length === 0" class="font-medium">
      No data available
    </div>
    <div
      v-for="(stat, index) in displayStats"
      :key="stat.player?.name"
      class="flex justify-between my-2 py-2 border-b-2 text-sm"
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
