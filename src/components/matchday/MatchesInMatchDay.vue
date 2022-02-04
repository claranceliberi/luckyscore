<template>
  <h1 class="font-bold">{{ name }}</h1>
  <div class="flex flex-wrap gap-4 pt-5">
    <div v-for="match in props.matches" :key="match.id">
      <div
        class="border-[#DEE2E6] border-2 w-[26rem] rounded py-8 cursor-pointer hover:bg-[#FFFFFF]"
      >
        <router-link :to="props.url.replace(/:[\w]+/gi, match.id)">
          <SingleMatch
            :match="match.id"
            :home-team="match.home_team.name"
            :away-team="match.away_team.name"
            :home-score="match.home_score"
            :away-score="match.away_score"
            :time="match.to_be_played_at"
            :match-status="match.match_status"
            :first-half-started-at="match.first_half_started_at"
            :second-half-started-at="match.second_half_started_at"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SingleMatch from "./SingleMatch.vue";
  import Vue, { reactive } from "vue";
  import { IMatch } from "@/types/global";
  import { supabase } from "@/lib/supabase";

  interface Props {
    name?: string;
    matches: IMatch[] | any;
    url: string;
  }
  const props = defineProps<Props>();
</script>
