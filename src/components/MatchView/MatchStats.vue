<script setup lang="ts">
  interface Stat {
    title: string;
    values: Array<number>;
  }

  const matchStatsProps = withDefaults(
    defineProps<{ stats: Array<Stat> }>(),
    {},
  );

  const progressStyles = (value1: number, value2: number) => {
    let result = (value1 * 100) / (value1 + value2) || 0;
    result = result === Infinity ? 100 : result;
    return {
      width: `${result}%`,
    };
  };
</script>

<template>
  <div class="bg-white shadow-sm p-4">
    <h1 class="font-black mt-4 mb-8">Match Stats</h1>
    <div>
      <div v-for="stat in matchStatsProps.stats" :key="stat.title" class="my-5">
        <div class="flex justify-between items-center">
          <p class="text-black font-semibold">{{ stat.values[0] }}</p>
          <p class="text-black font-semibold">{{ stat.title }}</p>
          <p class="text-black font-semibold">{{ stat.values[1] }}</p>
        </div>
        <div class="flex justify-between gap-2 mt-1">
          <div class="h-3 w-1/2 bg-gray-200 rounded-full relative">
            <div
              class="absolute h-full w-0 bg-primary rounded-full right-0"
              :style="progressStyles(stat.values[0], stat.values[1])"
            ></div>
          </div>
          <div class="h-3 w-1/2 bg-gray-200 rounded-full relative">
            <div
              class="absolute h-full w-0 bg-primary rounded-full left-0"
              :style="progressStyles(stat.values[1], stat.values[0])"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
