<script setup lang="ts">
  import TeamPlayers from "@/components/molecules/TeamPlayers.vue";
  import { useRoute } from "vue-router";

  const router = useRoute();
  const teamName = router.query.team || "";
</script>

<template>
  <div class="mt-11">
    <button
      class="bg-white h-11 flex items-center justify-center w-11 rounded-full"
      @click="$router.push('/dashboard/teams')"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.25 6.75L4.75 12L10.25 17.25"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.25 12H5"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <h1 class="font-medium text-2xl pb-6 pt-4">{{ teamName }}</h1>
    <h3 class="pt-6 pb-4 text-lg">Players</h3>

    <TeamPlayers />
  </div>
</template>
