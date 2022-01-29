<script setup lang="ts">
  import { supabase } from "@/lib/supabase";
  import { IMatch, IMatchprogress, MatchStatusEnum } from "@/types/global";
  import { reactive } from "vue";
  import { useRoute } from "vue-router";

  type IProps = {
    isLoading: boolean;
    id: string;
    status: MatchStatusEnum;
  };

  const teamId = (useRoute().params.id as string) || "";
  const matchInfo = reactive<IProps>({
    isLoading: true,
    id: "",
    status: MatchStatusEnum.NO_STARTED,
  });

  supabase
    .from<IMatch>("match")
    .select("id,match_status")
    .eq("id", teamId)
    .then((res) => {
      if (res.data) {
        matchInfo.id = res.data?.[0].id;
        matchInfo.status = res.data?.[0].match_status;
        console.log(res.data?.[0]);
      }
    });
</script>

<template>
  <div class="mt-11">
    <h1 class="font-medium text-2xl pb-6 pt-4">Match Details</h1>
    <div class="w-[19rem] rounded-lg h-20 bg-white px-6 py-[14px]">
      <div class="flex justify-between items-center">
        <div class="flex flex-col gap-1">
          <h3 class="font-medium capitalize">
            {{ matchInfo.status.replace("_", " ") }}
          </h3>
          <span class="text-appgrey text-sm font-medium">{{
            matchInfo.status === MatchStatusEnum.NO_STARTED
              ? "Not Started"
              : "Started"
          }}</span>
        </div>
        <button
          v-if="matchInfo.status === MatchStatusEnum.NO_STARTED"
          style="border-radius: 28px"
          class="w-28 bg-primary px-6 py-4 h-[3rem] flex justify-center items-center rounded-3xl text-white"
        >
          Start
        </button>
        <button
          v-else
          disabled
          style="border-radius: 28px"
          class="bg-[#EEE9F1] px-6 py-4 w-auto h-14 rounded-3xl font-medium text-primary"
        >
          Started
        </button>
      </div>
    </div>
  </div>
</template>
