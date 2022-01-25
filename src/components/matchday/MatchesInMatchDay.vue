<template>
  <h1 class="font-bold">{{ name }}</h1>
  <div class="grid md:grid-cols-3 sm:grid-cols-1 gap-6 mt-3">
    <div v-for="(match, index) in matches" :key="index">
      <div class="border-[#DEE2E6] border rounded py-8">
        <SingleMatch
          :home-team="match.match_hometeam_name"
          :away-team="match.match_awayteam_name"
          :home-score="match.match_hometeam_score"
          :away-score="match.match_awayteam_score"
          :match-time="match.match_time"
          :match-date="match.match_date"
          :match-status="match.match_status"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SingleMatch from "./SingleMatch.vue";
  import Vue from "vue";
  import { IMatch } from "@/types/global";

  interface Props {
    name?: string;
    matches: IMatch[];
  }
  const props = defineProps<Props>();
</script>

<style scoped>
  /* .game-box {
    border: 1px solid #dee2e6;
    box-sizing: border-box;
    border-radius: 4px;
  } */
</style>
