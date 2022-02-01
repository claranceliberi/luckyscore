<script setup lang="ts">
  import { MatchStatusEnum } from "@/types/global";
  import Vue from "vue";

  interface Props {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    time: string;
    matchStatus: MatchStatusEnum;
  }

  const props = defineProps<Props>();
</script>
<template>
  <div class="px-10">
    <!-- <div
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
    </div> -->

    <div
      class="flex justify-between flex-wrap items-center font-medium text-sm"
    >
      <div class="flex-none">
        <div
          :class="`${homeScore < awayScore ? 'opacity-80' : ''}`"
          class="flex"
        >
          <img src="@/assets/icons/teamlogo.svg" />
          <h1 class="ml-2">
            {{ homeTeam }}
          </h1>
        </div>

        <div
          class="flex mt-3"
          :class="`${awayScore < homeScore ? 'opacity-80' : ''}`"
        >
          <img src="@/assets/icons/teamlogo.svg" />
          <h1 class="ml-2">
            {{ awayTeam }}
          </h1>
        </div>
      </div>

      <div
        v-if="matchStatus === MatchStatusEnum.FULL_TIME"
        class="flex-row w-10 text-white rounded text-center"
      >
        <div
          class="px-2 py-2 bg-primary rounded-t-lg"
          :class="`${homeScore < awayScore ? 'opacity-80' : ''}`"
        >
          {{ homeScore }}
        </div>
        <div
          class="px-2 py-2 bg-primary rounded-b-lg"
          :class="`${awayScore < homeScore ? 'opacity-80' : ''}`"
        >
          {{ awayScore }}
        </div>
      </div>

      <div class="line bg-gray-400 h-20"></div>
      <div class="flex-initial items-center">
        <div v-if="time">
          {{
            new Date(time)?.toString().split(" ")[2] +
            " " +
            new Date(time)?.toString().split(" ")[1]
          }}
        </div>
        <div v-if="time">
          {{
            new Date(time)?.toString().split(" ")[4].split(":")[0] +
            ":" +
            new Date(time)?.toString().split(" ")[4].split(":")[1]
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .line {
    border: 1px solid #dee2e6;
  }
</style>
