<script setup lang="ts">
  import { supabase } from "@/lib/supabase";
  import { reactive, ref } from "vue";
  import { useRoute } from "vue-router";

  const router = useRoute();
  const totalPlayers = reactive({
    total: 0,
    isLoading: true,
  });

  supabase
    .from("player")
    .select("id", { count: "exact", head: true })
    .eq("team_id", router.params.id)
    .then((res) => {
      if (res) {
        totalPlayers.total = res.count || 0;
        totalPlayers.isLoading = false;
      }
    });
</script>

<template>
  <router-link
    :to="{
      path: `/dashboard/teams/${router.params.id}/add-player/`,
    }"
  >
    <div class="w-72 rounded-lg h-20 bg-white px-6 py-[14px]">
      <div class="flex justify-between items-center">
        <div class="flex flex-col gap-1">
          <h3 class="font-medium">Registered Players</h3>
          <span
            v-if="!totalPlayers.isLoading"
            class="text-appgrey text-sm font-medium"
            >{{ totalPlayers.total }} players</span
          >
          <span v-else>Calculating..</span>
        </div>
        <div>
          <img alt="right arrow" src="../../assets/icons/right-arrow.svg" />
        </div>
      </div>
    </div>
  </router-link>
</template>
