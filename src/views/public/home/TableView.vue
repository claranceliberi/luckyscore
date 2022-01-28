<script setup lang="ts">
  import StandingTableMolecule from "@/components/molecules/StandingTableMolecule.vue";
  import { supabase } from "@/lib/supabase";
  import { ITableStatistics } from "@/types/global";
  import { reactive, ref } from "vue";

  const loading = ref(true);
  let all_team_and_their_matches: ITableStatistics[] = reactive<
    ITableStatistics[]
  >([]);

  supabase
    .from<ITableStatistics>("team")
    .select(
      `*,
      home_match: match!home_team(*),
      away_match: match!away_team(*)`,
    )
    .then((data) => {
      all_team_and_their_matches.push(...data.data!);
      loading.value = false;
    });
</script>

<template>
  <div v-if="!loading">
    <StandingTableMolecule :all-stats="all_team_and_their_matches" />
  </div>
  <p v-else>Loading statistics...</p>
</template>
