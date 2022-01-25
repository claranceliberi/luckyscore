<script setup lang="ts"></script>

<template>
  <div class="bg-white shadow-sm p-4 my-8">
    <h1 class="font-black mt-4 mb-2">Who will win?</h1>
    <div class="flex my-4 items-end">
      <div
        class="prediction__percentage text-primary border-4 border-primary border-r-0 p-1 text-xs w-10 h-10 flex items-center justify-center bg-secondary"
      >
        85%
      </div>
      <div class="bg-white h-6 flex-1 -ml-1 px-1">
        <div class="flex items-center h-12 -mt-6">
          <hr class="flex-1" />
          <div
            class="rounded-full font-bold text-sm rounded-circle flex justify-center items-center bg-secondary p-2 w-8 h-8"
          >
            x
          </div>
          <hr class="flex-1" />
          <div
            class="rounded-full font-bold text-sm rounded-circle flex justify-center items-center bg-secondary p-2 w-8 h-8"
          >
            2
          </div>
        </div>
      </div>
    </div>
    <p class="text-appgrey">Make your prediction for the match</p>
  </div>
</template>

<style scoped>
  .prediction__percentage {
    border-radius: 50%;
  }
</style>
