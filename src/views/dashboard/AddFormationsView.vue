<script lang="ts" setup>
  import { supabase } from "@/lib/supabase";
  import { toast } from "@/plugins/toaster/vue-toast";
  import router from "@/router";
  import {
    ICreateMatch,
    IMatchTeamJoin,
    IPlayer,
    MatchStatusEnum,
  } from "@/types/global";
  import { computed, onBeforeMount, reactive, ref } from "vue";
  import { useRoute } from "vue-router";
  import SelectAtom from "@/components/Atoms/SelectAtom.vue";
  import { n } from "@/lib/helpers";

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

  const homePlayers = ref<IPlayer[]>([]);
  const awayPlayers = ref<IPlayer[]>([]);

  const awayPlayersLineup = reactive<Record<number, string>>({});
  const homePlayersLineup = reactive<Record<number, string>>({});

  const step = ref(1);
  const match = ref<IMatchTeamJoin | null>(null);
  const loading = ref(true);

  async function handleNext(e: Event) {
    e.preventDefault();

    if (step.value === 1) {
      const top11players = getLineups("HOME")
        .map((p) => parseInt(p.pitch_position))
        .filter((p) => p < 12);
      if (
        top11players.length < 1 ||
        top11players.reduce((sum, a) => sum + a) < 66
      ) {
        toast.error("Please select top 11 players for each team");
        return;
      }

      if (
        !matchFormationData.home_formation ||
        matchFormationData.home_formation.length < 1
      ) {
        toast.error("Home team formation must be selected");
        return;
      } else if (getLineups("HOME").length < 11) {
        toast.error("Home team must have 11 players");
        return;
      }
    }
    if (step.value === 2) {
      const top11players = getLineups("AWAY")
        .map((p) => parseInt(p.pitch_position))
        .filter((p) => p < 12);
      if (
        top11players.length < 1 ||
        top11players.reduce((sum, a) => sum + a) < 66
      ) {
        toast.error("Please select top 11 players for each team");
        return;
      }

      if (
        !matchFormationData.away_formation ||
        matchFormationData.away_formation.length < 1
      ) {
        toast.error("Away team formation must be selected");
        return;
      } else if (getLineups("AWAY").length < 11) {
        toast.error("Away team must have 11 players");
        return;
      }
    }

    if (step.value < 2) {
      step.value++;
    } else {
      const { data: updateData, error: updateError } = await supabase
        .from("match")
        .update({
          home_formation: matchFormationData.home_formation,
          away_formation: matchFormationData.away_formation,
          match_status: MatchStatusEnum.NO_STARTED,
        })
        .match({ id: route.params.matchId });

      if (updateError) toast.error(updateError?.message);

      const { data, error } = await supabase
        .from("player_match")
        .insert([
          ...getLineups("HOME").filter((p) => !!p.player_id),
          ...getLineups("AWAY").filter((p) => !!p.player_id),
        ]);

      if (data) {
        router.back();
        toast.success("Match was successfully created");
      }
      if (error) toast.error(error?.message);
    }
  }

  function getLineups(allie: "HOME" | "AWAY") {
    if (allie == "HOME")
      return Object.keys(homePlayersLineup).map((pos) => ({
        match: route.params.matchId,
        pitch_position: pos,
        player_id: homePlayersLineup[n(pos)],
      }));

    return Object.keys(awayPlayersLineup).map((pos) => ({
      match: route.params.matchId,
      pitch_position: pos,
      player_id: awayPlayersLineup[n(pos)],
    }));
  }

  onBeforeMount(async () => {
    if (!match.value) {
      const { data } = await supabase
        .from<IMatchTeamJoin>("match")
        .select("*,away:away_team ( * ),home:home_team ( * )")
        .eq("id", route.params.matchId as string);
      if (data) match.value = data[0];
    }

    if (homePlayers.value.length < 1) {
      const { data: homeDbPlayers } = await supabase
        .from<IPlayer>("player")
        .select("*")
        .eq("team_id", match.value?.home.id);
      if (homeDbPlayers) homePlayers.value = homeDbPlayers;
    }

    if (awayPlayers.value.length < 1) {
      const { data: awayDbPlayers } = await supabase
        .from<IPlayer>("player")
        .select("*")
        .eq("team_id", match.value?.away.id);
      if (awayDbPlayers) awayPlayers.value = awayDbPlayers;
    }
    loading.value = false;
  });
</script>

<template>
  <h2 class="text-2xl font-medium py-6">Match Formations</h2>
  <div class="bg-white rounded-lg p-8 w-full sm:w-3/4 md:w-2/3 xl:w-1/2">
    <div class="flex justify-between">
      <h4 class="text-base font-bold">
        {{
          step == 1
            ? `${match?.home.name} Lineup`
            : `${match?.home.name}  Lineup`
        }}
      </h4>
      <h4 class="text-base font-bold">{{ step }} outof 2</h4>
    </div>
    <!-- first step -->
    <form v-if="step === 1" class="pt-10" @submit="handleNext">
      <div>
        <p class="pb-2 font-medium">{{ match?.home.name }} formation:</p>
        <SelectAtom
          v-model="matchFormationData.home_formation"
          title="Home team formation"
          placeholder="Select"
          :options="formations"
          required
        />
      </div>

      <div v-for="pos in 18" :key="pos">
        <h2 v-if="pos === 12" class="py-2 font-bold text-lg">Substitutions</h2>
        <div class="grid grid-cols-5">
          <div>
            <p v-if="pos < 12">Position: {{ pos }}</p>
            <p class="w-10"></p>
          </div>

          <div class="col-span-3">
            <p class="pb-2">Player:</p>
            <SelectAtom
              v-model="homePlayersLineup[pos]"
              title="Home team"
              placeholder="Select Player"
              :required="pos < 12"
              :options="
                homePlayers?.map((p) => ({
                  label: p.full_name,
                  value: p.id,
                  selected: Object.values(homePlayersLineup).includes(p.id),
                }))
              "
            />
          </div>
        </div>
      </div>

      <div class="pt-6 text-right">
        <button
          type="submit"
          style="border-radius: 28px"
          class="bg-primary px-8 py-4 w-auto h-14 rounded-3xl text-white"
        >
          Next step
        </button>
      </div>
    </form>
    <!-- second step -->
    <form v-if="step === 2" class="pt-10" @submit="handleNext">
      <div>
        <p class="pb-2">{{ match?.away.name }} formation:</p>
        <SelectAtom
          v-model="matchFormationData.away_formation"
          title="Home team formation"
          placeholder="Select"
          required
          :options="formations"
        />
      </div>
      <div v-for="pos in 18" :key="pos">
        <h2 v-if="pos === 12" class="py-2 font-bold text-lg">Substitutions</h2>
        <div class="grid grid-cols-5">
          <div>
            <p v-if="pos < 12">Position: {{ pos }}</p>
            <p class="w-10"></p>
          </div>

          <div class="col-span-3">
            <p class="pb-2">Player:</p>
            <SelectAtom
              v-model="awayPlayersLineup[pos]"
              :required="pos < 12"
              title="Home team"
              placeholder="Select Player"
              :options="
                awayPlayers?.map((p) => ({
                  label: p.full_name,
                  value: p.id,
                  selected: Object.values(awayPlayersLineup).includes(p.id),
                }))
              "
            />
          </div>
        </div>
      </div>
      <div class="pt-6 text-right">
        <button
          style="border-radius: 28px"
          type="submit"
          class="bg-primary px-8 py-4 w-auto h-14 rounded-3xl text-white"
        >
          Create match
        </button>
      </div>
    </form>
  </div>
</template>
