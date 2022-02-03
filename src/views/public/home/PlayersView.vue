<script setup lang="ts">
  import PlayerCard from "@/components/molecules/PlayerCard.vue";
  import { supabase } from "@/lib/supabase";
  import { IPlayer } from "@/types/global";
  import { reactive, ref } from "vue";

  interface DisplayPlayer {
    imageUrl?: string;
    name: string;
    team: string;
    position?: string;
  }

  const players = reactive<DisplayPlayer[]>([]);
  const isLoading = ref(true);
  supabase
    .from<IPlayer>("player")
    .select(`*, team: team_id(*)`)
    .then((data) => {
      data.data?.forEach((player) => {
        players.push({
          name: player.full_name || "",
          team: player.team?.name || "",
        });
      });
      isLoading.value = false;
    });
</script>

<template>
  <div v-if="!isLoading">
    <div
      class="bg-white grid gap-2 p-3 2xl:grid-cols-10 md:grid-cols-8 sm:grid-cols-4 xs:grid-cols-3"
    >
      <div
        v-for="(player, index) in players
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)"
        :key="index"
      >
        <PlayerCard :name="player.name" :team="player.team" />
      </div>
    </div>
  </div>
  <div v-else class="mt-2">Loading players...</div>
</template>

<style></style>
