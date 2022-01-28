<template>
  <div class="mt-12">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Matches</h1>

      <router-link to="/dashboard/matches/new">
        <button
          style="border-radius: 28px"
          class="bg-primary px-6 py-4 w-auto h-14 rounded-3xl text-white"
        >
          Add new match
        </button>
      </router-link>
    </div>
    <h2 class="text-2xl font-medium py-6">New Match</h2>
    <div class="bg-white rounded-lg p-8 w-full sm:w-3/4 md:w-2/3 xl:w-1/2">
      <div class="flex justify-between">
        <h4 class="text-base">Match info</h4>
        <h4 class="text-base font-bold">{{ step }} outof 3</h4>
      </div>
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
  });

  let step = 1;

  async function handleNext() {
    console.log(data);
    if (step > 3) {
      step++;
    }
  }

  const teams = [{ label: "Year 3", value: "51678" }];
</script>
