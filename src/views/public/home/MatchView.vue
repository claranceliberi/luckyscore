<template>
  <div>
    <div class="match__container mb-4">
      <h1 className="header text-2xl font-bold mb-5 mt-10">Line-Ups</h1>
      <div class="flex flex-col md:flex-row gap-8 md:gap-0 mt-4">
        <div class="w-full md:w-1/2">
          <div class="teams__header flex">
            <div
              class="active cursor-pointer text-primary w-1/2 pb-4 border-b-2 border-primary"
            >
              <p class="text-center">Welding L3</p>
            </div>
            <div
              class="w-1/2 cursor-pointer pb-4 text-appgrey border-b-2 border-gray-200"
            >
              <p>Culinary L2</p>
            </div>
          </div>
          <div
            class="forms flex justify-around items-center flex-wrap gap-5 mt-4"
          >
            <FormationCard />
          </div>
        </div>
        <div
          class="w-full md:w-1/2 flex flex-col md:flex-row justify-center gap-8 md:gap-0 pt-0 md:pt-20"
        >
          <div class="w-full md:w-4/5">
            <!-- <MatchInfo></MatchInfo>
          <MatchPrediction></MatchPrediction> -->
            <MatchStats></MatchStats>
          </div>
        </div>
      </div>
    </div>
    <LiveTable></LiveTable>
  </div>
</template>

<script setup lang="" ts>
  import MatchInfo from "@/components/MatchView/MatchInfo.vue";
  import LiveTable from "@/components/MatchView/LiveTable.vue";
  import MatchStats from "@/components/MatchView/MatchStats.vue";
  import MatchPrediction from "@/components/MatchView/MatchPrediction.vue";
  import FormationCard from "@/components/formations/FormationCard.vue";
</script>

<style scoped></style>
