<script setup lang="ts"></script>
<template>
  <div class="flex justify-between">
    <div class="flex-none w-48 pl-10">
      <div class="flex">
        <img src="@/assets/icons/teamlogo.svg" />
        <h1 class="ml-2">Team A</h1>
      </div>

      <div class="flex">
        <img src="@/assets/icons/teamlogo.svg" />
        <h1 class="ml-2">Team B</h1>
      </div>
    </div>
    <div class="flex-initial w-12 game-score text-center">
      <div>1</div>
      <div>0</div>
    </div>
    <div class="line bg-gray-400"></div>
    <div class="flex-initial w-40">
      <div>23 Jan</div>
      <div>16:00</div>
    </div>
  </div>
</template>

<style>
  .game-score {
    background-color: #502274;
    border-radius: 4px;
    color: #fff;
  }
  .line {
    border: 1px solid #dee2e6;
    margin: 0 3px;
  }
</style>
