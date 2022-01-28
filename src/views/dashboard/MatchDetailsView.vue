<script setup lang="ts">
  import { supabase } from "@/lib/supabase";
  import { IMatch } from "@/types/global";
  import { useRoute } from "vue-router";

  const teamId = (useRoute().params.id as string) || "";

  supabase
    .from<IMatch>("match")
    .select("id,match_status")
    .eq("id", teamId)
    .then((res) => {
      if (res) {
        console.log(res.data);
      }
    });
</script>

<template>
  <div class="mt-11">
    <h1 class="font-medium text-2xl pb-6 pt-4">Match Details</h1>
    <div class="w-72 rounded-lg h-20 bg-white px-6 py-[14px]">
      <div class="flex justify-between items-center">
        <div class="flex flex-col gap-1">
          <h3 class="font-medium">First Half</h3>
          <span class="text-appgrey text-sm font-medium">Not Started</span>
        </div>
        <div>
          <img alt="right arrow" src="../../assets/icons/right-arrow.svg" />
        </div>
      </div>
    </div>
  </div>
</template>
