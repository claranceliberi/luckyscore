<script setup lang="ts">
  import { useRoute } from "vue-router";
  import MatchNavbarMolecule from "../../components/molecules/MatchNavbarMolecule.vue";
  import MatchEvents from "@/components/MatchEvents.vue";
  import AddEventForm from "@/components/AddEventForm.vue";
  import { IMatch, IMatchTeamJoin, MatchStatusEnum } from "@/types/global";
  import { supabase } from "@/lib/supabase";
  import { ref, computed } from "vue";
  import { PostgrestResponse } from "@supabase/supabase-js";

  const router = useRoute();

  const match = ref<PostgrestResponse<IMatchTeamJoin>>();

  const reqMatch = await supabase
    .from<IMatchTeamJoin>("match")
    .select("*,away:away_team ( * ),home:home_team ( * )")
    .eq("id", router.params.matchId as string);

  match.value = reqMatch;

  function changeMatchStatus(status: MatchStatusEnum) {
    const messages: Record<string, string> = {
      NO_LINEUP: "Are you sure you want to set up match ?",
      FIRST_HALF_ONGOING: "Are you sure you want to start the match ?",
      HALF_TIME: "Are you sure you want to end first half  ?",
      SECOND_HALF_ONGOING: "Are you sure you want to start second half ?",
      FULL_TIME: "Are you sure you want to end the match",
    };

    const c = (status: MatchStatusEnum) => confirm(messages[status.toString()]);

    switch (status) {
      case MatchStatusEnum.NO_LINEUP:
        if (c(MatchStatusEnum.NO_LINEUP)) console.log("we want to make lineup");
        break;
      case MatchStatusEnum.FIRST_HALF_ONGOING:
        if (c(MatchStatusEnum.FIRST_HALF_ONGOING))
          console.log("we want to start match");
        break;
      case MatchStatusEnum.HALF_TIME:
        if (c(MatchStatusEnum.HALF_TIME))
          console.log("we want to end first half ");
        break;
      case MatchStatusEnum.SECOND_HALF_ONGOING:
        if (c(MatchStatusEnum.SECOND_HALF_ONGOING))
          console.log("we want to start second half ");
        break;
      case MatchStatusEnum.FULL_TIME:
        if (c(MatchStatusEnum.FULL_TIME)) console.log("we want to end match ");
        break;
      default:
        alert("Incorect Choice made");
        break;
    }
  }

  const eventsData = [
    { id: 1, type: "Corner", name: "Welding L2" },
    { id: 2, type: "Shot on target", name: "Welding L4" },
    { id: 3, type: "Yellow Card", name: "Yves Mugunga" },
  ];
</script>

<template>
  hello
  {{ match }}
  <!-- <div class="flex flex-col md:flex-row mt-10">
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

      <div class="flex items-center justify-between">
        <h1 class="font-bold text-lg">Live Match</h1>
        <button
          class="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-full"
          @click="() => changeMatchStatus(MatchStatusEnum.NO_LINEUP)"
        >
          SELECT LINEUP
        </button>
        <button
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full"
          @click="() => changeMatchStatus(MatchStatusEnum.FIRST_HALF_ONGOING)"
        >
          START
        </button>
        <button
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full"
          @click="() => changeMatchStatus(MatchStatusEnum.HALF_TIME)"
        >
          END FIRST HALF
        </button>
        <button
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full"
          @click="() => changeMatchStatus(MatchStatusEnum.SECOND_HALF_ONGOING)"
        >
          START SECOND HALF
        </button>
        <button
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full"
          @click="() => changeMatchStatus(MatchStatusEnum.FULL_TIME)"
        >
          END GAME
        </button>
      </div>

      <MatchNavbarMolecule
        v-if="match?.data && match?.data.length > 0"
        :match="match?.data[0]"
        :dashboard="true"
      ></MatchNavbarMolecule>

      <h1 class="font-bold text-lg mt-12">Match events</h1>

      <div class="teams__header flex mt-4">
        <div
          class="active cursor-pointer text-primary w-1/2 pb-4 border-b-2 border-primary"
        >
          <p class="text-center">
            {{
              match?.data && match?.data.length > 0 && match?.data[0].home.name
            }}
          </p>
        </div>
        <div
          class="w-1/2 cursor-pointer pb-4 text-appgrey border-b-2 border-gray-200"
        >
          <p>
            {{
              match?.data && match?.data.length > 0 && match?.data[0].away.name
            }}
          </p>
        </div>
      </div>

      <AddEventForm></AddEventForm>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center">
      <MatchEvents :events-data="eventsData"></MatchEvents>
      <div class="flex-1"></div>
    </div>
  </div> -->
</template>
