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
      <div class="flex justify-between gap-6 py-6">
        <InputAtom v-model="data.date" title="Date" type="date" />
        <InputAtom v-model="data.time" title="Time" type="time" />
      </div>

      <div class="flex justify-between gap-6">
        <SelectAtom
          v-model="data.homeTeam"
          title="Home team"
          placeholder="Select team"
          :options="teams"
        />
        <SelectAtom
          v-model="data.homeTeam"
          title="away team"
          placeholder="Select team"
          :options="teams"
        />
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
            :options="teams"
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
            :options="teams"
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

  const data = reactive({
    date: "",
    time: "",
    homeTeam: "",
    awayTeam: "",
    formation: "",
  });

  const homeTeamLinup: string[] = reactive([]);
  const awayTeamLinup: string[] = reactive([]);

  const step = ref(1);

  async function handleNext() {
    if (step.value < 3) {
      step.value++;
    }
  }

  const teams = [{ label: "Year 3", value: "51678" }];
</script>

<style scoped></style>
