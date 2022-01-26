<template>
  <p class="header">All formations</p>

  <div class="forms">
    <ThreeFiveTwo />
    <ThreeFiveThree />
    <FourTwoTwoTwo />
    <FourFourTwo />
    <FourTwoThreeOne />
    <FourThreeThree />
  </div>
</template>

<script setup lang="ts">
  import FourTwoTwoTwo from "@/components/formations/FourTwoTwoTwo.vue";
  import FourFourTwo from "@/components/formations/FourFourTwo.vue";
  import FourTwoThreeOne from "@/components/formations/FourTwoThreeOne.vue";
  import FourThreeThree from "@/components/formations/FourThreeThree.vue";
  import ThreeFiveThree from "@/components/formations/ThreeFourThree.vue";
  import ThreeFiveTwo from "@/components/formations/ThreeFiveTwo.vue";
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
