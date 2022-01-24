<script setup lang="ts">
  import TeamCardVue from "../components/TeamCard.vue";
</script>

<template>
  <div class="flex justify-around items-center h-screen w-screen">
    <TeamCardVue />
    <button class="bg-[#502274] px-6 py-4 rounded-3xl text-white">
      Add new team
    </button>
  </div>
</template>
