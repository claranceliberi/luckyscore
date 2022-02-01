<script setup lang="ts">
  import MatchDay from "@/components/matchday/MatchesInMatchDay.vue";
  import { supabase } from "@/lib/supabase";

  import { IFixtures, IMatch } from "@/types/global";
  import { reactive, ref } from "vue";
  const isLoading = ref(true);

  const fixtures = reactive<IFixtures>({
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
      isLoading.value = false;
    });
</script>

<template>
  <div class="my-6">
    <div class="float-right">
      <router-link to="/dashboard/matches/new">
        <button
          style="border-radius: 28px"
          class="bg-primary px-6 py-4 w-auto h-14 rounded-3xl text-white"
        >
          Add new match
        </button>
      </router-link>
    </div>
    <div v-if="!isLoading && fixtures.matches.length > 0" class="my-6">
      <div class="my-6 flex justify-between">
        <h1 class="text-2xl font-bold">Matches</h1>
      </div>

      <MatchDay
        url="/dashboard/live/:matchId/add-events"
        name=""
        :matches="fixtures.matches"
      />
    </div>
    <span v-else-if="isLoading">Loading...</span>
    <span v-else-if="fixtures.matches.length === 0">No matches to show</span>

    <span v-else>Something went wrong</span>
  </div>
</template>
