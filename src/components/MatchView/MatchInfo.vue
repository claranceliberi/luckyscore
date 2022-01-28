<script setup lang="ts">
  const matchInfoProps = withDefaults(defineProps<{ date: Date }>(), {});
  console.log(matchInfoProps);
</script>

<template>
  <div class="bg-white shadow-sm p-4">
    <h1 class="font-black mt-4 mb-2">Match Info</h1>
    <h2 class="font-semibold mt-4 mb-1">Competition</h2>
    <p>Interclass Football League</p>

    <h1 class="font-black mt-4 mb-2">Kick Off</h1>
    <p>{{ new Date(matchInfoProps.date).toLocaleDateString() }}</p>

    <h1 class="font-black mt-4 mb-2">Stadium</h1>
    <p class="text-appgrey">Ntvet-Rca Pitch</p>
  </div>
</template>
