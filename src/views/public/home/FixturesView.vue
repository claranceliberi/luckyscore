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
      console.log(res.data);

      fixtures.matches = res.data || [];
      fixtures.isLoading = false;
      fixtures.name = "Matchday 1";
    });
</script>

<template>
  <div v-if="!fixtures.isLoading && fixtures.matches.length > 0" class="my-6">
    <!-- <div v-for="(fixture, key) in fixtures" :key="key" class="my-6"> -->
    <MatchDay url="/match/" :name="fixtures.name" :matches="fixtures.matches" />
    <!-- </div> -->
  </div>
  <div v-else-if="fixtures.isLoading">
    <h1>Loading fixtures...</h1>
  </div>

  <div v-else>
    <h1>Something went wrong</h1>
  </div>
</template>
