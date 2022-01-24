<script setup lang="ts">
  import TeamCardVue from "../components/TeamCard.vue";
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Teams</h1>

      <button
        class="bg-[#502274] px-6 py-4 rounded-3xl text-white"
        @click="$router.push('/bets')"
      >
        Add new team
      </button>
    </div>
    <div>
      <TeamCardVue />
    </div>
  </div>
</template>
