<template>
  <h2 class="text-2xl font-medium py-6">New Match</h2>
  <div class="bg-white rounded-lg p-8 w-full sm:w-3/4 md:w-2/3 xl:w-1/2">
    <div class="flex justify-between">
      <h4 class="text-base font-bold">
        {{
          step == 1
            ? "Match info"
            : step === 2
            ? "Home team Lineup"
            : "Away team Lineup"
        }}
      </h4>
      <h4 class="text-base font-bold">{{ step }} outof 3</h4>
    </div>
    <!-- first step -->
    <div v-if="step === 1">
      <div class="flex justify-between gap-6 pt-6">
        <InputAtom v-model="match.match_day" title="Match day" type="number" />
        <InputAtom v-model="match.time" title="Time" type="datetime-local" />
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
            v-model="match.home_team"
            title="away team"
            placeholder="Select team"
            :options="teamsOptions"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-6 pt-5">
        <div>
          <p class="pb-2 font-medium">Home-team formation:</p>
          <SelectAtom
            v-model="match.home_formation"
            title="Home team formation"
            placeholder="Select"
            :options="formations"
          />
        </div>
        <div>
          <p class="pb-2">Away-team formation:</p>
          <SelectAtom
            v-model="match.away_formation"
            title="Away team formation"
            placeholder="Select"
            :options="formations"
          />
        </div>
      </div>
    </div>
    <!-- second step -->
    <div v-if="step === 2" class="pt-10">
      <div
        v-for="pos in [1, 2, 3, 4, 5, 6, 7, 8, 10, 11]"
        :key="pos"
        class="grid grid-cols-5"
      >
        <div>
          <p>Position: {{ pos }}</p>
        </div>

        <div class="col-span-3">
          <p class="pb-2">Player:</p>
          <SelectAtom
            v-model="homeTeamLinup[pos]"
            title="Home team"
            placeholder="Select team"
            :options="teamsOptions"
          />
        </div>
      </div>
    </div>
    <!-- third step -->
    <div v-if="step === 3" class="pt-10">
      <div
        v-for="pos in [1, 2, 3, 4, 5, 6, 7, 8, 10, 11]"
        :key="pos"
        class="grid grid-cols-5"
      >
        <div>
          <p>Position: {{ pos }}</p>
        </div>

        <div class="col-span-3">
          <p class="pb-2">Player:</p>
          <SelectAtom
            v-model="homeTeamLinup[pos]"
            title="Home team"
            placeholder="Select team"
            :options="teamsOptions"
          />
        </div>
      </div>
    </div>

    <div class="pt-6 text-right">
      <button
        style="border-radius: 28px"
        type="button"
        class="bg-primary px-8 py-4 w-auto h-14 rounded-3xl text-white"
        @click="handleNext"
      >
        {{ step < 3 ? "Next step" : "Create match" }}
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
  import { ICreateMatch, IMatch, MatchFormation, Teams } from "@/types/global";

  const formations = [
    { value: "4-3-3", label: "4-3-3" },
    { value: "4-4-2", label: "4-4-2" },
    { value: "4-2-3-1", label: "4-2-3-1" },
    { value: "3-4-3", label: "3-4-3" },
    { value: "4-2-2-2", label: "4-2-2-2" },
    { value: "3-5-2", label: "3-5-2" },
  ];

  const teamsData = ref<Teams[]>([]);

  supabase
    .from<Teams>("team")
    .select("*")
    .then((res) => {
      if (res) {
        teamsData.value = res.data || [];
      }
    });

  let teamsOptions = teamsData.value.map((t) => ({
    label: t.name,
    value: t.id,
  }));

  console.log(teamsOptions);

  const match = reactive<ICreateMatch>({
    time: "",
    season: "",
    description: "",
    match_day: "1",
    home_team: "",
    away_team: "",
    away_formation: "",
    home_formation: "",
    id: "",
  });

  const homeTeamLinup: string[] = reactive([]);
  const awayTeamLinup: string[] = reactive([]);

  const step = ref(1);

  async function handleNext() {
    if (step.value < 3) {
      step.value++;
    } else {
      const { data: newMatch } = await supabase
        .from<ICreateMatch>("match")
        .insert(match);
      console.log("====================================");
      console.log(newMatch);
      console.log("====================================");

      const homeTeamData = homeTeamLinup.map((p) => {
        ({
          match: newMatch && newMatch[0].id,
          player_id: p,
          red_card: 0,
          yellow_card: 0,
          off_side: 0,
          pitch_position: 0,
          subbed: null,
          goals: 0,
          assists: 0,
          big_chances: 0,
          successful_dribbles: 0,
        });
      });

      const awayTeamData = awayTeamLinup.map((p) => {
        ({
          match: newMatch && newMatch[0].id,
          player_id: p,
          red_card: 0,
          yellow_card: 0,
          off_side: 0,
          pitch_position: 0,
          subbed: null,
          goals: 0,
          assists: 0,
          big_chances: 0,
          successful_dribbles: 0,
        });
      });

      const { data, error } = await supabase
        .from("player_match")
        .insert([...homeTeamData, ...awayTeamData]);

      if (data) {
        router.back();
        toast.success("Match was successfully created");
      }
      if (error) toast.error(error?.message);
    }
  }
</script>

<style scoped></style>
