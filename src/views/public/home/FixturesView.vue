<script setup lang="ts">
  import MatchDay from "@/components/matchday/MatchesInMatchDay.vue";
  import { supabase } from "@/lib/supabase";
  import { IFixtures } from "@/types/global";
  import { reactive, ref } from "vue";
  const fixtures = reactive<IFixtures>({} as IFixtures);
  const match_in_matchdays: any = reactive({} as IFixtures);

  const isLoading = ref(true);
  supabase
    .from("match")
    .select(
      `*, 
     away_team:away_team(name),
     home_team:home_team(name)
    `,
    )
    .then((res) => {
      const response_data = res.data || [];
      fixtures.matches = res.data || [];
      isLoading.value = false;
      fixtures.name = "Matchday 1";

      response_data.forEach((data) => {
        if (
          match_in_matchdays[data.match_day] == undefined ||
          match_in_matchdays[data.match_day].length < 1
        )
          match_in_matchdays[data.match_day] = [data];
        else match_in_matchdays[data.match_day].push(data);
      });
    });
</script>

<template>
  <div
    v-if="!isLoading && Object.keys(match_in_matchdays).length > 0"
    class="my-6"
  >
    <div
      v-for="[key, value] of Object.entries(match_in_matchdays)"
      :key="key"
      class="my-6"
    >
      <MatchDay url="/match/" :name="'Matchday ' + key" :matches="value" />
    </div>
  </div>
  <div v-else-if="isLoading">
    <h1>Loading fixtures...</h1>
  </div>

  <div v-else>
    <h1>Something went wrong</h1>
  </div>
</template>
