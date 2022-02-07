<script lang="ts" setup>
  import { IMatchTeamJoin, MatchStatusEnum, Teams } from "@/types/global";
  import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
  import { Events, IPlayer, IEventType } from "@/types/global";
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

  type IGoals = Partial<Events>;
  const goals = ref<Partial<IGoals>[]>([]);

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
      await getScoredPlayers();
    })
    .subscribe();
  onMounted(async () => {
    await getMatchEvents();
    await getScoredPlayers();
  });
  onUnmounted(() => {
    mySubscription?.unsubscribe();
  });

  async function getScoredPlayers() {
    const { data, error } = await supabase
      .from<Events>("events")
      .select(
        `id,time,type,team_id,
        player!events_player_id_fkey!inner(*),
        assist_player:assist_id(*)
      `,
      )
      .eq("match_id", props.match?.id)
      // .eq("type", "Goal")
      .or("type.eq.Goal,type.eq.Red card")
      .order("created_at", { ascending: true });

    if (data) goals.value = data;
    else if (error) console.log(error);
  }

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
                (event.type.toLowerCase() === "goal" &&
                  event.team_id === props.match?.home.id) ||
                (event.type.toLowerCase() === "own goal" &&
                  event.team_id === props.match?.away.id),
            ).length || 0;
          const awayScore =
            res.data?.filter(
              (event) =>
                (event.type.toLowerCase() === "goal" &&
                  event.team_id === props.match?.away.id) ||
                (event.type.toLowerCase() === "own goal" &&
                  event.team_id === props.match?.home.id),
            ).length || 0;
          data.homeScore = homeScore;
          data.awayScore = awayScore;
        }
      });
  }
</script>

<template>
  <div :class="`w-ful    ${props.dashboard ? 'mt-8' : 'mt-16'} `">
    <div :class="` bg-primary  py-10 rounded`">
      <div class="grid grid-cols-11 gap-4">
        <div class="col-start-1 col-end-6 flex justify-end gap-4">
          <div class="flex flex-col items-center">
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
        </div>
        <div
          class="col-start-6 col-end-8 flex flex-col justify-center items-center gap-1 text-lg text-white"
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
                ? `${currentMinute}'` || "Loading..."
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
        <div class="col-start-8 col-end-12 flex justify-start gap-4">
          <div class="flex flex-col items-center">
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
    </div>
    <div class="w-full text-gray-700 text-sm">
      <div class="mt-3">
        <div class="grid grid-cols-11 gap-4">
          <template v-for="goal in goals" :key="goal.id">
            <!-- home team -->
            <template v-if="goal.team_id === props.match?.home.id">
              <div class="flex gap-3 col-start-1 col-end-6 flex-row-reverse">
                <img
                  v-if="goal.type === IEventType.GOAL"
                  class="max-w-4 max-h-4"
                  src="@/assets/icons/images/goal.png"
                  :alt="goal.type"
                />
                <img
                  v-else-if="goal.type === IEventType.RED_CARD"
                  class="max-w-4 max-h-4"
                  src="@/assets/icons/images/red.png"
                  :alt="goal.type"
                />
                <span class="text-sm">{{ goal.player?.full_name }}</span>
                <span v-if="goal.assist_player" class="text-sm">
                  ({{ goal.assist_player?.full_name }})</span
                >
              </div>
              <div class="col-start-6 col-end-8 text-center">
                {{ goal.time }}'
              </div>
              <div class="col-start-8 col-end-12"></div>
            </template>
            <!-- away team -->
            <template v-else>
              <div class="gap-3 col-start-1 col-end-6"></div>
              <div class="col-start-6 col-end-8 text-center">
                {{ goal.time }}'
              </div>
              <div class="flex gap-3 col-start-8 col-end-12">
                <img
                  v-if="goal.type === IEventType.GOAL"
                  class="max-w-4 max-h-4"
                  src="@/assets/icons/images/goal.png"
                  :alt="goal.type"
                />
                <img
                  v-else-if="goal.type === IEventType.RED_CARD"
                  class="max-w-4 max-h-4"
                  src="@/assets/icons/images/red.png"
                  :alt="goal.type"
                />
                <span class="text-sm">{{ goal.player?.full_name }}</span>
                <span v-if="goal.assist_player" class="text-sm">
                  ({{ goal.assist_player?.full_name }})</span
                >
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
