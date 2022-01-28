<script setup lang="ts">
  import { reactive, ref } from "vue";

  interface PlayerStat {
    player: {
      id: string;
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

  const hash = Object.create(null);
  const results: Array<any> = reactive([]);

  function combineStats() {
    statsBlockProps.displayStats.forEach(function (o) {
      if (!hash[o.player.id]) {
        hash[o.player.id] = { ...o, amount: 0 };
        results.push(hash[o.player.id]);
      }
      hash[o.player.id].amount += o.amount;
    });
  }

  combineStats();
  const displayStats = ref(
    results
      .sort((a, b) => (a.amount < b.amount ? 1 : -1))
      .filter((stat) => stat.amount > 0)
      .splice(0, 7) || "",
  );
</script>

<template>
  <div class="my-10 ml-4">
    <div v-if="displayStats.length === 0" class="font-medium">
      No data available
    </div>
    <div
      v-for="(stat, index) in displayStats"
      :key="stat.player?.id"
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
