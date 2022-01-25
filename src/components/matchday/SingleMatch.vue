<script setup lang="ts">
  import Vue from "vue";

  interface Props {
    homeTeam: string;
    awayTeam: string;
    homeScore: string;
    awayScore: string;
    matchTime: string;
    matchDate: string;
    matchStatus: string;
  }

  const props = defineProps<Props>();
</script>
<template>
  <div class="pl-10">
    <div
      v-if="matchStatus === 'Live'"
      class="flex items-center justify-between mr-18"
    >
      <p class="text-red-500">
        {{ matchStatus }}
      </p>
      <small class="text-red-500 mr-5">05'</small>
    </div>
    <div
      v-else-if="matchStatus === 'Finished'"
      class="flex items-center justify-between mr-18"
    >
      <small class="text-red-500"></small>
      <p class="text-red-500 mr-5">FT</p>
    </div>

    <div class="flex justify-between">
      <div class="flex-none w-48">
        <div class="flex">
          <img src="@/assets/icons/teamlogo.svg" />
          <h1 class="ml-2">{{ homeTeam }}</h1>
        </div>

        <div class="flex">
          <img src="@/assets/icons/teamlogo.svg" />
          <h1 class="ml-2">{{ awayTeam }}</h1>
        </div>
      </div>

      <div
        v-if="matchStatus === 'Finished'"
        class="flex-initial w-12 game-score text-center"
      >
        <div>{{ homeScore }}</div>
        <div>{{ awayScore }}</div>
      </div>

      <div class="line bg-gray-400"></div>
      <div class="flex-initial w-40 pl-4">
        <div>
          {{
            new Date(matchDate).toString().split(" ")[2] +
            " " +
            new Date(matchDate).toString().split(" ")[1]
          }}
        </div>
        <div>{{ matchTime }}</div>
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
