<script setup lang="ts">
  interface Stat {
    title: string;
    values: Array<number>;
  }
  const stats: Array<Stat> = [
    { title: "Total Shots", values: [9, 12] },
    { title: "Shots on target", values: [3, 6] },
    { title: "Fouls", values: [2, 2] },
    { title: "Yellow cards", values: [0, 1] },
    { title: "Red cards", values: [0, 0] },
    { title: "Offsides", values: [3, 2] },
    { title: "Corners", values: [5, 7] },
  ];
</script>

<template>
  <div class="bg-white shadow-sm p-4">
    <h1 class="font-black mt-4 mb-8">Match Stats</h1>
    <div>
      <div v-for="stat in stats" :key="stat.title" class="my-5">
        <div class="flex justify-between items-center">
          <p class="text-black font-semibold">{{ stat.values[0] }}</p>
          <p class="text-black font-semibold">{{ stat.title }}</p>
          <p class="text-black font-semibold">{{ stat.values[1] }}</p>
        </div>
        <div class="flex justify-between gap-2 mt-1">
          <div class="h-3 w-1/2 bg-gray-200 rounded-full relative">
            <div class="absolute h-full w-full bg-primary rounded-full"></div>
          </div>
          <div class="h-3 w-1/2 bg-gray-200 rounded-full relative">
            <div class="absolute h-full w-full bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
