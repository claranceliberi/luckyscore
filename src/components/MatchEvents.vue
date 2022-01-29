<script setup lang="ts">
  import { reactive } from "vue";
  import { Events } from "@/types/global";
  import { supabase } from "@/lib/supabase";
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

  supabase
    .from<Events>("events")
    .select(
      "*,player!events_player_id_fkey(id,full_name),team!events_team_id_fkey(id,name)",
    )
    .eq("match_id", props.match + "")
    .then((res) => {
      if (res) {
        data.events = res.data || [];
        data.isLoading = false;
      }
    });
</script>

<template>
  <div
    v-if="!data.isLoading"
    class="bg-white shadow-sm p-4 mt-28 w-3/5 lg:w-3/4"
  >
    <h1 class="font-black mt-4 mb-4">Match Events</h1>

    <div>
      <div v-for="event in data.events" :key="event.id">
        <h1 class="mb-1 mt-4">
          <span class="font-bold">{{ event.type + "  " }}</span>
          <span class="font-medium">by {{ " " + event.player.full_name }}</span>
        </h1>
        <p>{{ event.team.name }}</p>
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
