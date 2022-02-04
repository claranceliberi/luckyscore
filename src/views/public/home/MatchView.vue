<template>
  <div v-if="state.isLoading" class="my-10">Loading...</div>
  <div v-else-if="!state.isError && allDetails?.home.name">
    <MatchNavbarMolecule :match="allDetails"></MatchNavbarMolecule>
    <div>
      <div class="match__container mb-4">
        <h1 className="header text-2xl font-bold mb-5 mt-10">Line-Ups</h1>
        <div class="flex flex-col md:flex-row gap-8 md:gap-0 mt-4">
          <div class="w-full md:w-1/2">
            <div class="teams__header flex">
              <div
                :class="`active cursor-pointer ${
                  state.homeSelected ? 'text-primary' : 'text-appgrey'
                } w-1/2 pb-4 border-b-2 ${
                  state.homeSelected ? 'border-primary' : 'border-gray-200'
                }`"
                @click="state.homeSelected = true"
              >
                <p class="text-center">
                  {{ allDetails?.home.name }}
                </p>
              </div>
              <div
                :class="`w-1/2 cursor-pointer pb-4 ${
                  !state.homeSelected ? 'text-primary' : 'text-appgrey'
                } border-b-2 ${
                  !state.homeSelected ? 'border-primary' : 'border-gray-200'
                }`"
                @click="state.homeSelected = false"
              >
                <p>{{ allDetails?.away.name }}</p>
              </div>
            </div>
            <div
              v-if="state.homeSelected"
              class="forms flex justify-around items-center flex-wrap gap-5 mt-4"
            >
              <FormationCard
                :formation="allDetails?.home_formation"
                :team="allDetails?.home?.id"
                :match-id="allDetails?.id"
              />
            </div>
            <div
              v-else
              class="forms flex justify-around items-center flex-wrap gap-5 mt-4"
            >
              <FormationCard
                :formation="allDetails?.away_formation"
                :team="allDetails?.away?.id"
                :match-id="allDetails?.id"
              />
            </div>
          </div>
          <div
            class="w-full md:w-1/2 flex flex-col md:flex-row justify-center gap-8 md:gap-0 pt-0 md:pt-20"
          >
            <div v-if="state.isFinished" class="w-full md:w-4/5">
              <MatchStats :stats="state.stats"></MatchStats>
            </div>
            <div v-else class="w-full md:w-3/5">
              <MatchInfo
                :date="new Date(allDetails?.to_be_played_at || '')"
              ></MatchInfo>
              <MatchPrediction></MatchPrediction>
            </div>
          </div>
        </div>
      </div>
      <LiveEvents :events="allEvents || []"></LiveEvents>
    </div>
  </div>
  <div v-else class="my-10">Match not found</div>
</template>

<script setup lang="ts">
  import MatchInfo from "@/components/MatchView/MatchInfo.vue";
  import LiveEvents from "@/components/MatchView/LiveEvents.vue";
  import MatchStats from "@/components/MatchView/MatchStats.vue";
  import MatchPrediction from "@/components/MatchView/MatchPrediction.vue";
  import FormationCard from "@/components/formations/FormationCard.vue";
  import { useRoute } from "vue-router";
  import MatchNavbarMolecule from "@/components/molecules/MatchNavbarMolecule.vue";
  import {
    fetchMatchDetails,
    allDetails,
    allEvents,
  } from "@/composables/useMatchinfo";
  import { computed, onMounted, onUnmounted, reactive } from "vue";
  import { MatchStatusEnum } from "@/types/global";
  import { RealtimeSubscription } from "@supabase/supabase-js";
  import { supabase } from "@/lib/supabase";
  import { isMatchLive } from "@/composables/isLive";

  const state = reactive<{
    isLoading: boolean;
    isFinished?: boolean;
    isError?: boolean;
    stats?: any;
    allDetails?: any;
    homeSelected?: boolean;
  }>({
    isLoading: true,
    isError: false,
    homeSelected: true,
  });

  allDetails.value = null;
  const route = useRoute();
  const id = route.params.id || "";
  const isLive = computed(() => {
    if (!state.allDetails) return false;
    return isMatchLive(state.allDetails.value.status);
  });

  let mySubscription: RealtimeSubscription = supabase
    .from("events")
    .on("*", async (payload) => {
      console.log(payload);
      await fetchAllDetailsData();
    })
    .subscribe();

  onMounted(async () => {
    await fetchAllDetailsData();
  });

  onUnmounted(() => {
    mySubscription?.unsubscribe();
  });

  const fetchAllDetailsData = async () => {
    await fetchMatchDetails(id.toString())
      .catch(() => {
        state.isLoading = false;
        state.isError = true;
      })
      .then(() => {
        const tempisLive =
          (allDetails.value as any).match_status ===
            MatchStatusEnum.FIRST_HALF_ONGOING ||
          (allDetails.value as any).match_status ===
            MatchStatusEnum.SECOND_HALF_ONGOING ||
          (allDetails.value as any).match_status === MatchStatusEnum.HALF_TIME;
        const tempisFinished =
          (allDetails.value as any).match_status === MatchStatusEnum.FULL_TIME;

        //stats

        interface Stat {
          title: string;
          values: Array<number>;
        }
        const tempstats: Array<Stat> = [
          {
            title: "Total Shots",
            values: [
              (allDetails.value as any).home_shots || 0,
              (allDetails.value as any).away_shots || 0,
            ],
          },
          {
            title: "Shots on target",
            values: [
              (allDetails.value as any).home_shots_on_target || 0,
              (allDetails.value as any).away_shots_on_target | 0,
            ],
          },
          {
            title: "Fouls",
            values: [
              (allDetails.value as any).home_fouls || 0,
              (allDetails.value as any).away_fouls || 0,
            ],
          },
          {
            title: "Yellow cards",
            values: [
              (allDetails.value as any).home_yellow_cards || 0,
              (allDetails.value as any).away_yellow_cards || 0,
            ],
          },
          {
            title: "Red cards",
            values: [
              (allDetails.value as any).home_red_cards || 0,
              (allDetails.value as any).away_red_cards || 0,
            ],
          },
          {
            title: "Offsides",
            values: [
              (allDetails.value as any).home_offsides || 0,
              (allDetails.value as any).away_offsides || 0,
            ],
          },
          {
            title: "Corners",
            values: [
              (allDetails.value as any).home_corners || 0,
              (allDetails.value as any).away_corners || 0,
            ],
          },
        ];
        state.isLoading = false;
        state.isFinished = tempisFinished || tempisLive;
        state.stats = tempstats;
        state.allDetails = allDetails;
        state.isError = false;
      });
  };
</script>

<style scoped></style>
