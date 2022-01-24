<template>
  <div class="match__container md:mx-16 mb-4">
    <h1 className="header mx-12 md:mx-0">Line-Ups</h1>
    <div class="flex flex-col md:flex-row gap-8 md:gap-0 mt-8">
      <div class="w-full md:w-1/2">
        <div class="teams__header flex">
          <div class="active w-1/2 pb-4">
            <p>Welding L3</p>
          </div>
          <div class="w-1/2 pb-4">
            <p>Culinary L2</p>
          </div>
        </div>
        <div class="forms mt-4">
          <FourFourTwo></FourFourTwo>
        </div>
      </div>
      <div
        class="w-full md:w-1/2 flex flex-col md:flex-row justify-center gap-8 md:gap-"
      >
        <div class="w-full md:w-1/2">
          <MatchInfo></MatchInfo>
          <MatchPrediction></MatchPrediction>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="" ts>
  import MatchInfo from "@/components/MatchView/MatchInfo.vue";
  import MatchPrediction from "@/components/MatchView/MatchPrediction.vue";
  import FourFourTwo from "@/components/FourFourTwo.vue";
</script>

<style scoped>
  .header {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 40px;
  }

  .teams__header > div {
    color: #6c757d;
    border-bottom: 1px solid #dee2e6;
    cursor: pointer;
  }

  .teams__header .active {
    color: #4e2172;
    border-bottom: 2px solid #4e2172;
  }
  .teams__header p {
    text-align: center;
  }

  .forms {
    gap: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
