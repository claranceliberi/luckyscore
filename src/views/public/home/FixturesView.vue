<script setup lang="ts">
  import MatchDay from "@/components/matchday/MatchesInMatchDay.vue";
  import { supabase } from "@/lib/supabase";
  import { IFixtures } from "@/types/global";
  import { onMounted, onUnmounted, reactive, ref } from "vue";
  const fixtures = reactive<IFixtures>({} as IFixtures);
  const match_in_matchdays: any = reactive({} as IFixtures);

  const isLoading = ref(true);

  const mySubscription = supabase
    .from("match")
    .on("*", (payload) => {
      getFixtureFromBD();
    })
    .subscribe();

  function getFixtureFromBD() {
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

        // make sure match_in_matchdays is empty before adding data
        for (const key in match_in_matchdays) {
          delete match_in_matchdays[key];
        }
        response_data.forEach((data) => {
          if (
            match_in_matchdays[data.match_day] == undefined ||
            match_in_matchdays[data.match_day].length < 1
          )
            match_in_matchdays[data.match_day] = [data];
          else match_in_matchdays[data.match_day].push(data);
        });
      });
  }

  onMounted(() => {
    getFixtureFromBD();
  });

  onUnmounted(() => {
    mySubscription.unsubscribe();
  });
</script>

<template>
  <div class="my-6">
    <div v-if="!isLoading && Object.keys(match_in_matchdays).length > 0">
      <div
        v-for="[key, value] of Object.entries(match_in_matchdays)"
        :key="key"
      >
        <MatchDay
          url="/match/:matchId"
          :name="'Matchday ' + key"
          :matches="value"
        />
      </div>
    </div>

    <span v-else-if="isLoading">Loading fixtures...</span>

    <span v-else-if="Object.keys(match_in_matchdays).length === 0"
      >No fixtures to show</span
    >
    <span v-else>Something went wrong</span>
  </div>
</template>
