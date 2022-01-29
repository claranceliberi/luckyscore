<script lang="ts" setup>
  import { supabase } from "@/lib/supabase";
  import { toast } from "@/plugins/toaster/vue-toast";
  import router from "@/router";
  import { ICreateMatch, IMatchTeamJoin } from "@/types/global";
  import { onBeforeMount, reactive, ref } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();

  interface FormationUpdate {
    away_formation: string;
    home_formation: string;
  }

  const formations = [
    { value: "4-3-3", label: "4-3-3" },
    { value: "4-4-2", label: "4-4-2" },
    { value: "4-2-3-1", label: "4-2-3-1" },
    { value: "3-4-3", label: "3-4-3" },
    { value: "4-2-2-2", label: "4-2-2-2" },
    { value: "3-5-2", label: "3-5-2" },
  ];

  const matchFormationData = reactive<FormationUpdate>({
    away_formation: "",
    home_formation: "",
  });

  const homeTeamLinup: string[] = reactive([]);
  const awayTeamLinup: string[] = reactive([]);

  const step = ref(1);
  const match = ref<IMatchTeamJoin | null>(null);
  const loading = ref(true);

  async function handleNext() {
    if (step.value < 2) {
      step.value++;
    } else {
      const { data: updateData, error: updateError } = await supabase
        .from("match")
        .update({
          home_formation: matchFormationData.home_formation,
          away_formation: matchFormationData.away_formation,
        })
        .match({ id: route.params.matchId });

      console.log("match formations updated", updateData);

      if (updateError) toast.error(updateError?.message);

      const homeTeamData = homeTeamLinup.map((p) => {
        ({
          match: route.params.matchId,
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
          match: route.params.matchId,
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

  onBeforeMount(async () => {
    const { data } = await supabase
      .from<IMatchTeamJoin>("match")
      .select("*,away:away_team ( * ),home:home_team ( * )")
      .eq("id", route.params.matchId as string);
    if (data) match.value = data[0];
    loading.value = false;
  });
</script>

<template>
  <h2 class="text-2xl font-medium py-6">Match Formations</h2>
  <div class="bg-white rounded-lg p-8 w-full sm:w-3/4 md:w-2/3 xl:w-1/2">
    <div class="flex justify-between">
      <h4 class="text-base font-bold">
        {{ step == 1 ? "Home team Lineup" : "Away team Lineup" }}
      </h4>
      <h4 class="text-base font-bold">{{ step }} outof 3</h4>
    </div>
    <!-- first step -->
    <div v-if="step === 1" class="pt-10">
      <div>
        <p class="pb-2 font-medium">Home-team formation:</p>
        <SelectAtom
          v-model="matchFormationData.home_formation"
          title="Home team formation"
          placeholder="Select"
          :options="formations"
        />
      </div>

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
          <!-- <SelectAtom
          v-model="homeTeamLinup[pos]"
          title="Home team"
          placeholder="Select team"
          :options="teamsOptions"
        /> -->
        </div>
      </div>
    </div>
    <!-- second step -->
    <div v-if="step === 2" class="pt-10">
      <div>
        <p class="pb-2">Away-team formation:</p>
        <SelectAtom
          v-model="matchFormationData.away_formation"
          title="Away team formation"
          placeholder="Select"
          :options="formations"
        />
      </div>
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
          <!-- <SelectAtom
          v-model="homeTeamLinup[pos]"
          title="Home team"
          placeholder="Select team"
          :options="teamsOptions"
        /> -->
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
