<template>
  <p class="header">All formations</p>

  <div class="forms">
    <FourTwoTwoTwo></FourTwoTwoTwo>
    <FourFourTwo></FourFourTwo>
    <FourTwoThreeOne></FourTwoThreeOne>
    <FourThreeThree></FourThreeThree>
  </div>
</template>

<script setup lang="ts">
  import FourTwoTwoTwo from "@/components/FourTwoTwoTwo.vue";
  import FourFourTwo from "@/components/FourFourTwo.vue";
  import FourTwoThreeOne from "@/components/FourTwoThreeOne.vue";
  import FourThreeThree from "@/components/FourThreeThree.vue";
</script>

<style scoped>
  .forms {
    gap: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  .header {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 40px;
    text-align: center;
  }
</style>
