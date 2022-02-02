<script setup lang="ts">
  import { onMounted, onUnmounted, reactive } from "vue";
  import { Events, IEventType } from "@/types/global";
  import { supabase } from "@/lib/supabase";
  import { RealtimeSubscription } from "@supabase/supabase-js";
  interface Props {
    match: string | string[];
  }
  // interface MatchEvent {
  //   id: number;
  //   name: string;
  //   type: string;
  // }
  const data = reactive<{
    events: Events[];
    isLoading: boolean;
  }>({
    events: [],
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
      .then((res) => {
        if (res) {
          data.events = res.data || [];
          data.isLoading = false;
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
