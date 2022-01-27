<script setup lang="ts">
  import { useRoute } from "vue-router";
  import MatchNavbarMolecule from "../../components/molecules/MatchNavbarMolecule.vue";
  import MatchEvents from "@/components/MatchEvents.vue";
  import AddEventForm from "@/components/AddEventForm.vue";

  const router = useRoute();

  const navbarprops = {
    team1: "Welding L3",
    team2: "Culinary L2",
    isFinished: false,
    score: "0-0",
    date: new Date(2022, 1, 24, 16, 0, 0, 0),
    live: true,
    dashboard: true,
  };

  const eventsData = [
    { id: 1, type: "Corner", name: "Welding L2" },
    { id: 2, type: "Shot on target", name: "Welding L4" },
    { id: 3, type: "Yellow Card", name: "Yves Mugunga" },
  ];
</script>

<template>
  <div class="flex flex-col md:flex-row mt-10">
    <div class="w-full md:w-1/2 lg:w-2/3">
      <div
        class="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer mb-4"
        @click="$router.back()"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.25 6.75L4.75 12L10.25 17.25"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.25 12H5"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <h1 class="font-bold text-lg">Live Match</h1>

      <MatchNavbarMolecule v-bind="navbarprops"></MatchNavbarMolecule>

      <h1 class="font-bold text-lg mt-12">Match events</h1>

      <div class="teams__header flex mt-4">
        <div
          class="active cursor-pointer text-primary w-1/2 pb-4 border-b-2 border-primary"
        >
          <p class="text-center">{{ navbarprops.team1 }}</p>
        </div>
        <div
          class="w-1/2 cursor-pointer pb-4 text-appgrey border-b-2 border-gray-200"
        >
          <p>{{ navbarprops.team2 }}</p>
        </div>
      </div>

      <AddEventForm></AddEventForm>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center">
      <MatchEvents :events-data="eventsData"></MatchEvents>
      <div class="flex-1"></div>
    </div>
  </div>
</template>
