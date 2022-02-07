<script setup lang="ts">
  import { onMounted, onUnmounted, reactive } from "vue";
  import { Events, IEventType, IMatchTeamJoin } from "@/types/global";
  import { supabase } from "@/lib/supabase";
  import { RealtimeSubscription } from "@supabase/supabase-js";
  interface Props {
    match: string | string[];
    details: IMatchTeamJoin | null;
  }
  // interface MatchEvent {
  //   id: number;
  //   name: string;
  //   type: string;
  // }
  const data = reactive<{
    events: Events[];
    home_score: number;
    away_score: number;
    isLoading: boolean;
  }>({
    events: [],
    away_score: 0,
    home_score: 0,
    isLoading: true,
  });
  const props = defineProps<Props>();
  let mySubscription: RealtimeSubscription = supabase
    .from("*")
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
      .select(
        "*,player!events_player_id_fkey(id,full_name),team!events_team_id_fkey(id,name)",
      )
      .eq("match_id", props.match + "")
      .order("created_at", { ascending: false })
      .then(async (res) => {
        if (res) {
          data.events = res.data || [];
          data.isLoading = false;
          const homeScore =
            res.data?.filter(
              (event) =>
                (event.type.toLowerCase() === "goal" &&
                  event.team_id === props.details?.home.id) ||
                (event.type.toLowerCase() === "own goal" &&
                  event.team_id === props.details?.away.id),
            ).length || 0;
          const awayScore =
            res.data?.filter(
              (event) =>
                (event.type.toLowerCase() === "goal" &&
                  event.team_id === props.details?.away.id) ||
                (event.type.toLowerCase() === "own goal" &&
                  event.team_id === props.details?.home.id),
            ).length || 0;
          if (data.home_score !== homeScore || data.away_score !== awayScore) {
            data.home_score = homeScore;
            data.away_score = awayScore;
            const { data: updateData, error } = await supabase
              .from("match")
              .update({
                home_score: homeScore,
                away_score: awayScore,
              })
              .match({ id: props.match });
            if (error) {
              console.error(error);
            }
          }
        }
      });
  }
  // supabase
  //   .from<Events>("events")
  //   .select(
  //     "*,player!events_player_id_fkey(id,full_name),team!events_team_id_fkey(id,name)",
  //   )
  //   .eq("match_id", props.match + "")
  //   .then((res) => {
  //     if (res) {
  //       data.events = res.data || [];
  //       data.isLoading = false;
  //     }
  //   });
</script>

<template>
  <div
    v-if="!data.isLoading"
    class="bg-white shadow-sm p-4 mt-28 w-3/5 lg:w-3/4"
  >
    <h1 class="font-black mt-4 mb-4">Match Events</h1>

    <div>
      <div v-for="event in data.events" :key="event.id">
        <div class="">
          <div class="flex items-center mb-1 mt-4">
            <img
              v-if="event.type === IEventType.GOAL"
              class="max-w-6 max-h-6"
              src="@/assets/icons/images/goal.png"
              :alt="event.type"
            />
            <img
              v-else-if="event.type === IEventType.SHOT"
              class="max-w-6 max-h-6"
              src="@/assets/icons/images/free-kick.png"
              :alt="event.type"
            />
            <img
              v-else-if="event.type === IEventType.FOUL"
              class="max-w-6 max-h-6"
              src="@/assets/icons/images/foul.png"
              :alt="event.type"
            />
            <img
              v-else-if="event.type === IEventType.CORNER"
              class="max-w-6 max-h-6"
              src="@/assets/icons/images/corner-kick.png"
              :alt="event.type"
            />
            <img
              v-else-if="event.type === IEventType.RED_CARD"
              class="max-w-6 max-h-6"
              src="@/assets/icons/images/red.png"
              :alt="event.type"
            />
            <img
              v-else-if="event.type === IEventType.YELLOW_CARD"
              class="max-w-6 max-h-6"
              src="@/assets/icons/images/yellow.png"
              :alt="event.type"
            />
            <h1 class="ml-3">
              <span class="font-bold">{{ event.type + "  " }}</span>
              <span class="font-medium"
                >by {{ " " + event.player.full_name }}</span
              >
            </h1>
          </div>
          <div v-if="event.event_image_url" class="flex justify-center py-4">
            <img
              class="rounded max-h-40"
              :src="event.event_image_url"
              :alt="event.commentary"
            />
          </div>
          <p class="text-gray-600 font-medium">{{ event.commentary }}</p>
          <p>{{ event.team.name }}</p>
        </div>
      </div>
      <div v-if="data.events.length == 0">No events in this match yet</div>
    </div>
  </div>
  <div v-if="data.isLoading">
    <div class="w-full h-full flex justify-center items-center">
      <div class="lds-dual-ring">Getting you all the events</div>
    </div>
  </div>
</template>
