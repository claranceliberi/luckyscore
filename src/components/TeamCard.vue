<script setup lang="ts">
  import { supabase } from "@/lib/supabase";
  import { ITime } from "@/types/global";
  import { ref } from "vue";

  interface Teams extends ITime {
    id: string;
    name: string;
    description: string;
    letter: string;
  }
  const teams = ref<Teams[]>([]);
  const isLoading = ref(true);

  supabase
    .from<Teams>("team")
    .select("*")
    .then((res) => {
      if (res) {
        teams.value = res.data || [];
        isLoading.value = false;
      }
    });
</script>

<template>
  <div v-if="isLoading">
    <h1>Loading teams...</h1>
  </div>

  <div
    v-for="team in teams"
    v-else-if="teams.length > 0 && !isLoading"
    :key="team.id"
    class="flex gap-4 w-72 h-28 bg-white px-8 items-center"
  >
    <div
      class="rounded-full h-12 w-12 border flex items-center justify-center border-[#DEE2E6]"
    >
      <img alt="Team logo" src="../assets/team.svg" />
    </div>

    <div class="flex flex-col gap-2">
      <h2 class="text-appgrey font-medium text-sm">Team</h2>
      <h1 class="font-bold text-base">{{ team.name }}</h1>
    </div>
  </div>

  <h1 v-else>Something happened</h1>
</template>
