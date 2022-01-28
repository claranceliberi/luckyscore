<script setup lang="ts">
  import { supabase } from "@/lib/supabase";
  import { IMatch } from "@/types/global";
  import { ref, watch, watchEffect } from "vue";

  const matchDays = [1, 2, 3, 4, 5, 6];
  const activeMatchDay = ref(1);
  const matches = ref();
  const loading = ref(false);

  watchEffect(async () => {
    const { data } = await supabase
      .from<IMatch>("match")
      .select(
        `*,
      awayTeam:away_team ( name ),
       homeTeam:home_team ( name )
      `,
      )

      .eq("match_day", activeMatchDay.value);

    matches.value = data;
  });
</script>

<template>
  <div>
    <h3 class="font-bold py-10 text-3xl">Dashboard</h3>
    <p class="text-xl py-3">Matches</p>

    <div v-if="loading">Loading</div>

    <ul
      class="flex space-x-4 border-2 cursor-pointer gap-12 text-2xl bg-white w-max py-5 px-12 rounded-md"
    >
      <li v-for="item in matchDays" :key="item" @click="activeMatchDay = item">
        {{ item }}
      </li>
    </ul>

    <div class="flex gap-4">
      <div
        v-for="match in matches"
        :key="match.id"
        class="flex justify-between w-[25rem] border-2 bg-white my-4 py-5 px-8 rounded-lg"
      >
        <div>
          <div class="flex items-center space-x-2 font-bold py-2">
            <img src="@/assets/icons/teamlogo.svg" />
            <h3>{{ match.homeTeam.name }}</h3>
          </div>
          <div class="font-bold flex items-center space-x-2 py-2">
            <img src="@/assets/icons/teamlogo.svg" />
            <h3>{{ match.awayTeam.name }}</h3>
          </div>
        </div>

        <div
          class="text-white bg-primary p-2 flex flex-col justify-between items-center rouned-md"
        >
          <p>{{ match.away_score }}</p>
          <p>{{ match.home_score }}</p>
        </div>
        <div class="py-3">
          <div class="line bg-gray-400 h-[4rem]"></div>
        </div>
        <div class="flex justify-center items-center">
          <p
            v-if="match.match_status === 'live'"
            class="bg-[#EAF9EE] px-5 py-2 rounded-full text-[#2DC653]"
          >
            <span
              class="bg-[#2DC653] w-[0.5rem] h-[0.5rem] rounded-full inline-block"
            ></span>
            {{ match.match_status }}
          </p>

          <p
            v-if="match.match_status !== 'live'"
            class="bg-appgrey px-5 py-2 text-white rounded-full"
          >
            {{ match.match_status }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
