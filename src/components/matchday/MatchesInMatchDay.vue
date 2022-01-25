<template>
  <h1 class="font-bold">{{ name }}</h1>
  <div class="grid grid-cols-3 gap-6 mt-3">
    <div v-for="(match, index) in matches" :key="index">
      <div class="game-box py-8">
        <SingleMatch
          :home_team="match.match_hometeam_name"
          :away_team="match.match_awayteam_name"
          :home_score="match.match_hometeam_score"
          :away_score="match.match_awayteam_score"
          :match_time="match.match_time"
          :match_date="match.match_date"
          :match_status="match.match_status"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import SingleMatch from "./SingleMatch.vue";
  import Vue from "vue";

  export default {
    components: { SingleMatch },
    props: ["name", "matches"],
  };
</script>

<style scoped>
  .game-box {
    border: 1px solid #dee2e6;
    box-sizing: border-box;
    border-radius: 4px;
  }
</style>
