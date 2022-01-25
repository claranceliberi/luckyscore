<script setup lang="ts"></script>

<template>
  <div class="bg-white shadow-sm p-4 my-8">
    <h1 class="font-black mt-4 mb-2">Who will win?</h1>
    <div class="flex my-4 items-end">
      <div
        class="prediction__percentage p-1 text-xs w-10 h-10 flex items-center justify-center"
      >
        85%
      </div>
      <div class="bg-white h-6 flex-1 -ml-1 px-1">
        <div class="flex items-center h-12 -mt-6">
          <hr class="flex-1" />
          <div
            class="rounded-full font-bold text-sm rounded-circle p-2 w-8 h-8"
          >
            x
          </div>
          <hr class="flex-1" />
          <div
            class="rounded-full font-bold text-sm rounded-circle p-2 w-8 h-8"
          >
            2
          </div>
        </div>
      </div>
    </div>
    <p>Make your prediction for the match</p>
  </div>
</template>

<style scoped>
  p {
    color: #6c757d;
  }
  .prediction__percentage {
    border-radius: 50%;
    border: 4px solid #502274;
    color: #502274;
    background: #f8f9fa;
    border-right: none;
  }
  .rounded-circle {
    background: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
