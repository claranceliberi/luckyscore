<template>
  <h2 class="text-2xl font-medium py-6">New Match</h2>
  <div class="bg-white rounded-lg p-8 w-full sm:w-3/4 md:w-2/3 xl:w-1/2">
    <!-- first step -->
    <div>
      <div class="flex justify-between gap-6 pt-6">
        <div class="w-full">
          <p class="pb-2 font-medium">Matchday</p>
          <SelectAtom
            v-model="match.match_day"
            title="Matchday"
            placeholder="Select matchdays"
            :options="
              matchDays.map((md) => ({ label: md + '', value: md + '' }))
            "
          />
        </div>
        <InputAtom
          v-model="match.to_be_played_at"
          title="Time"
          type="datetime-local"
          placeholder=""
        />
      </div>
      <div class="pb-4">
        <label class="font-medium text-base mb-2">Description</label>
        <textarea
          v-model="match.description"
          class="py-2 px-5 w-full h-20 border-primary border-2 rounded focus:outline-none"
        />
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <p class="pb-2 font-medium">Home-team</p>
          <SelectAtom
            v-model="match.home_team"
            title="Home team"
            placeholder="Select team"
            :options="teamsOptions"
          />
        </div>
        <div>
          <p class="pb-2 font-medium">Away-team</p>
          <SelectAtom
            v-model="match.away_team"
            title="away team"
            placeholder="Select team"
            :options="teamsOptions"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-6 pt-5"></div>
    </div>

    <div class="pt-6 text-right">
      <button
        style="border-radius: 28px"
        type="button"
        class="bg-primary px-8 py-4 w-auto h-14 rounded-3xl text-white"
        @click="createMatch"
      >
        Create match
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  //   import { useRoute } from "vue-router";
  import { reactive, ref } from "vue";

  import SelectAtom from "@/components/Atoms/SelectAtom.vue";
  import InputAtom from "@/components/Atoms/InputAtom.vue";
  import { supabase } from "@/lib/supabase";
  import { toast } from "@/plugins/toaster/vue-toast";
  import router from "@/router";
  import {
    ICreateMatch,
    IMatch,
    MatchFormation,
    SelectType,
    Teams,
  } from "@/types/global";

  const teamsData = ref<Teams[]>([]);
  const teamsOptions = ref<SelectType[]>([]);

  const matchDays = ref([1, 2, 3, 4, 5, 6]);

  supabase
    .from<Teams>("team")
    .select("*")
    .then((res) => {
      if (res) {
        teamsData.value = res.data || [];
        res.data?.map((t) =>
          teamsOptions.value.push({
            label: t.name,
            value: t.id,
          }),
        );
      }
    });

  const match = ref<ICreateMatch>({
    to_be_played_at: "",
    season: "b1e25c5a-9ee0-4336-9866-1cab9d4e14b8",
    description: "",
    match_day: "1",
    home_team: "",
    away_team: "",
    away_formation: "",
    home_formation: "",
    time: "",
  });

  async function createMatch() {
    const { data: newMatch, error } = await supabase
      .from<ICreateMatch>("match")
      .insert({
        ...match.value,
        time: new Date(match.value.to_be_played_at).toLocaleTimeString(),
      });

    if (!error) router.push("/dashboard/matches");
    else toast.error(error?.message);
  }
</script>
