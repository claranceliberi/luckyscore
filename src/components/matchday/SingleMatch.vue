<script lang="ts">
  import Vue from "vue";
  export default {
    props: [
      "home_team",
      "away_team",
      "home_score",
      "away_score",
      "match_time",
      "match_date",
      "match_status",
    ],

    methods: {
      date_format(date: any) {
        var mydate = new Date(date);
        return (
          mydate.toDateString().split(" ")[2] +
          " " +
          mydate.toDateString().split(" ")[1]
        );
      },
    },
  };
</script>
<template>
  <div class="pl-10">
    <div
      v-if="match_status === 'Live'"
      class="flex items-center justify-between mr-18"
    >
      <p class="text-red-500">
        {{ match_status }}
      </p>
      <small class="text-red-500 mr-5">05'</small>
    </div>

    <div class="flex justify-between">
      <div class="flex-none w-48">
        <div class="flex">
          <img src="@/assets/icons/teamlogo.svg" />
          <h1 class="ml-2">{{ home_team }}</h1>
        </div>

        <div class="flex">
          <img src="@/assets/icons/teamlogo.svg" />
          <h1 class="ml-2">{{ away_team }}</h1>
        </div>
      </div>

      <div
        v-if="match_status === 'Finished'"
        class="flex-initial w-12 game-score text-center"
      >
        <div>{{ home_score }}</div>
        <div>{{ away_score }}</div>
      </div>

      <div class="line bg-gray-400"></div>
      <div class="flex-initial w-40 pl-4">
        <div>{{ date_format(match_date) }}</div>
        <div>{{ match_time }}</div>
      </div>
    </div>
  </div>
</template>

<style>
  .game-score {
    background-color: #502274;
    border-radius: 4px;
    color: #fff;
  }
  .line {
    border: 1px solid #dee2e6;
    margin: 0 3px;
  }
</style>
