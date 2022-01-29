<script setup lang="ts">
  import MatchDay from "@/components/matchday/MatchesInMatchDay.vue";
  import { supabase } from "@/lib/supabase";

  import { IFixtures, IMatch } from "@/types/global";
  import { reactive } from "vue";

  const fixtures = reactive<IFixtures>({
    isLoading: true,
    name: "",
    matches: [],
  });

  supabase
    .from("match")
    .select(
      `*, 
     away_team:away_team(name),
     home_team:home_team(name)
    `,
    )
    .then((res) => {
      fixtures.matches = res.data || [];
      fixtures.isLoading = false;
    });
</script>

<template>
  <div v-if="!fixtures.isLoading && fixtures.matches.length > 0" class="my-6">
    <div class="my-6 flex justify-between">
      <h1 class="text-2xl font-bold">Matches</h1>
      <router-link to="/dashboard/matches/new">
        <button
          style="border-radius: 28px"
          class="bg-primary px-6 py-4 w-auto h-14 rounded-3xl text-white"
        >
          Add new match
        </button>
      </router-link>
    </div>
    <MatchDay
      url="/dashboard/live/:matchId/add-events"
      name=""
      :matches="fixtures.matches"
    />
  </div>
  <div v-else-if="fixtures.isLoading">
    <h1>Loading...</h1>
  </div>

  <div v-else>
    <h1>Something went wrong</h1>
  </div>
</template>
