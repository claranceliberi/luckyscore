<template>
  <h1 class="font-bold">{{ name }}</h1>
  <div class="grid md:grid-cols-3 sm:grid-cols-1 gap-6 mt-3">
    <div v-for="(match, index) in matches" :key="index">
      <div
        class="border-[#DEE2E6] border rounded py-8 cursor-pointer hover:bg-[#FFFFFF]"
      >
        <router-link :to="'/match/' + match.id" @click="navigate">
          <SingleMatch
            :home-team="teamInfo.home_team"
            :away-team="match.away_team"
            :home-score="match.home_score"
            :away-score="match.away_score"
            :time="match.time"
            :match-status="match.match_status"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SingleMatch from "./SingleMatch.vue";
  import Vue, { reactive } from "vue";
  import { IMatch } from "@/types/global";
  import { supabase } from "@/lib/supabase";

  interface Props {
    name?: string;
    matches: IMatch[];
  }

  const teamInfo = reactive<{ name: string; logo_link: string }>({
    name: "",
    logo_link: "",
  });

  const props = defineProps<Props>();
</script>

<style scoped>
  /* .game-box {
    border: 1px solid #dee2e6;
    box-sizing: border-box;
    border-radius: 4px;
  } */
</style>
