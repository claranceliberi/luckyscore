<script setup ng="ts">
  import SingleMatch from "./SingleMatch.vue";
</script>
<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="game-box py-6">
      <SingleMatch />
    </div>
    <div class="game-box py-6">
      <SingleMatch />
    </div>
    <div class="game-box py-6">
      <SingleMatch />
    </div>
    <div class="game-box py-6">
      <SingleMatch />
    </div>
  </div>
</template>

<style scoped>
  .game-box {
    border: 1px solid #dee2e6;
    box-sizing: border-box;
    border-radius: 4px;
  }
</style>
