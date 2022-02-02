<script setup lang="ts">
  import { isMatchLive } from "@/composables/isLive";
  import { useMatchProgress } from "@/composables/useMatchProgres";
  import { MatchStatusEnum } from "@/types/global";
  import Vue, { ref } from "vue";

  interface Props {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    firstHalfStartedAt: string;
    secondHalfStartedAt: string;
    time: string;
    matchStatus: MatchStatusEnum;
  }

  const props = defineProps<Props>();
  const matchTime = ref();
  const isLive = isMatchLive(props.matchStatus);

  matchTime.value = useMatchProgress(
    props.matchStatus,
    props.firstHalfStartedAt,
    props.secondHalfStartedAt,
  );
</script>
<template>
  <div class="px-10">
    <!-- match on going -->
    <div
      v-if="
        matchStatus === MatchStatusEnum.FIRST_HALF_ONGOING ||
        matchStatus === MatchStatusEnum.SECOND_HALF_ONGOING
      "
      class="flex items-center justify-between mr-18"
    >
      <small class="text-red-500"></small>
      <small class="text-red-500 mr-5">{{ isLive ? matchTime : "" }}</small>
    </div>

    <!-- match not started  -->
    <div
      v-else-if="
        matchStatus === MatchStatusEnum.NO_STARTED ||
        matchStatus === MatchStatusEnum.NO_LINEUP
      "
      class="flex items-center justify-between mr-18"
    >
      <small class="text-red-500"></small>
      <small class="text-red-500 mr-5">&emsp;</small>
    </div>
    <!-- full time match  -->

    <div
      v-else-if="matchStatus === MatchStatusEnum.HALF_TIME"
      class="flex items-center justify-between mr-18"
    >
      <small class="text-red-500"></small>
      <small class="text-red-500 mr-3">Half Time</small>
    </div>

    <div
      v-else-if="matchStatus === MatchStatusEnum.FULL_TIME"
      class="flex items-center justify-between mr-18"
    >
      <small class="text-red-500"></small>
      <small class="text-red-500 mr-5">FT</small>
    </div>

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
        v-if="matchStatus === MatchStatusEnum.FULL_TIME || isLive"
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
