<script lang="ts" setup>
  import { IMatchTeamJoin, MatchStatusEnum, Teams } from "@/types/global";
  import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
  import { Events } from "@/types/global";
  import { supabase } from "@/lib/supabase";
  import { RealtimeSubscription } from "@supabase/supabase-js";

  import { useMatchProgress } from "@/composables/useMatchProgres";
  import LiveIndicator from "../Atoms/LiveIndicator.vue";

  const data = reactive<{
    homeScore: number;
    awayScore: number;
    isLoading: boolean;
  }>({
    homeScore: 0,
    awayScore: 0,
    isLoading: true,
  });

  interface Props {
    dashboard?: boolean;
    match: IMatchTeamJoin | null;
  }
  const props = withDefaults(defineProps<Props>(), {
    dashboard: false,
  });

  const played = computed(
    () =>
      props.match?.match_status !== MatchStatusEnum.NO_LINEUP &&
      props.match?.match_status !== MatchStatusEnum.NO_STARTED,
  );

  let currentMinute = computed(() => null);

  if (props.match) {
    const { currentMatchMinute } = useMatchProgress(
      props.match.match_status,
      props.match.id + "",
      props.match.first_half_started_at,
      props.match.second_half_started_at,
    );

    currentMinute = computed(() => currentMatchMinute.value);
  }

  const scoreBoard = computed(() => {
    if (props.match) {
      return {
        homeTeam: props.match.home.name,
        awayTeam: props.match.away.name,
        shouldShowScores:
          props.match.match_status == MatchStatusEnum.FULL_TIME ||
          props.match.match_status == MatchStatusEnum.FIRST_HALF_ONGOING ||
          props.match.match_status == MatchStatusEnum.SECOND_HALF_ONGOING ||
          props.match.match_status == MatchStatusEnum.HALF_TIME,
        isLive:
          props.match.match_status == MatchStatusEnum.FIRST_HALF_ONGOING ||
          props.match.match_status == MatchStatusEnum.SECOND_HALF_ONGOING,
        isHalfTime: props.match.match_status == MatchStatusEnum.HALF_TIME,
        isFullTime: props.match.match_status == MatchStatusEnum.FULL_TIME,
        date: new Date(props.match.to_be_played_at).toLocaleDateString(),
      };
    }

    return null;
  });

  let mySubscription: RealtimeSubscription = supabase
    .from("events")
    .on("*", async (payload) => {
      await getMatchEvents();
    })
    .subscribe();
  onMounted(async () => {
    await getMatchEvents();
  });
  onUnmounted(() => {
    mySubscription?.unsubscribe();
  });
  async function getMatchEvents() {
    await supabase
      .from<Events>("events")
      .select("*")
      .eq("match_id", props.match?.id)
      .order("created_at", { ascending: false })
      .then(async (res) => {
        if (res) {
          data.isLoading = false;

          const homeScore =
            res.data?.filter(
              (event) =>
                event.type.toLowerCase() === "goal" &&
                event.team_id === props.match?.home.id,
            ).length || 0;
          const awayScore =
            res.data?.filter(
              (event) =>
                event.type.toLowerCase() === "goal" &&
                event.team_id === props.match?.away.id,
            ).length || 0;
          data.homeScore = homeScore;
          data.awayScore = awayScore;
        }
      });
  }
</script>

<template>
  <div
    :class="`w-full ${props.dashboard ? 'mt-8' : 'mt-16'} flex justify-center`"
  >
    <div
      :class="`w-full ${
        props.dashboard ? '' : 'md:w-3/5'
      } bg-primary flex gap-6 md:gap-24 justify-center py-10 rounded`"
    >
      <div class="flex flex-col items-center gap-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 5.75C3 5.55109 3.07902 5.36032 3.21967 5.21967C3.36032 5.07902 3.55109 5 3.75 5C6.413 5 9.008 4.057 11.55 2.15C11.6798 2.05263 11.8377 2 12 2C12.1623 2 12.3202 2.05263 12.45 2.15C14.992 4.057 17.587 5 20.25 5C20.4489 5 20.6397 5.07902 20.7803 5.21967C20.921 5.36032 21 5.55109 21 5.75V11C21 16.001 18.042 19.676 12.275 21.948C12.0983 22.0176 11.9017 22.0176 11.725 21.948C5.958 19.676 3 16 3 11V5.75Z"
            fill="white"
          />
        </svg>
        <p class="text-white text-lg">{{ scoreBoard?.homeTeam }}</p>
      </div>
      <div
        class="flex flex-col justify-center items-center gap-1 text-lg text-white"
      >
        <h1 v-if="played">{{ `${data.homeScore} - ${data.awayScore}` }}</h1>
        <p
          :class="
            scoreBoard?.isLive ||
            props.match?.match_status === MatchStatusEnum.HALF_TIME
              ? 'text-green-400'
              : 'text-gray-400'
          "
        >
          {{
            scoreBoard?.isLive
              ? `${currentMinute || 0}'` || "Loading..."
              : scoreBoard?.isHalfTime
              ? "HT"
              : scoreBoard?.isFullTime
              ? "FT"
              : "Vs"
          }}
        </p>
        <span
          v-if="
            scoreBoard?.isLive ||
            props.match?.match_status === MatchStatusEnum.HALF_TIME
          "
          class="-translate-x-5"
          ><LiveIndicator
        /></span>
      </div>
      <div class="flex flex-col items-center gap-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 5.75C3 5.55109 3.07902 5.36032 3.21967 5.21967C3.36032 5.07902 3.55109 5 3.75 5C6.413 5 9.008 4.057 11.55 2.15C11.6798 2.05263 11.8377 2 12 2C12.1623 2 12.3202 2.05263 12.45 2.15C14.992 4.057 17.587 5 20.25 5C20.4489 5 20.6397 5.07902 20.7803 5.21967C20.921 5.36032 21 5.55109 21 5.75V11C21 16.001 18.042 19.676 12.275 21.948C12.0983 22.0176 11.9017 22.0176 11.725 21.948C5.958 19.676 3 16 3 11V5.75Z"
            fill="white"
          />
        </svg>
        <p class="text-white text-lg">{{ scoreBoard?.awayTeam }}</p>
      </div>
    </div>
  </div>
</template>
