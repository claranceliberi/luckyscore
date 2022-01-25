<script setup lang="ts">
  import AddTeam from "@/components/AddTeam.vue";
</script>

<template>
  <div class="px-44 pt-44">
    <button
      class="bg-white h-11 flex items-center justify-center w-11 rounded-full"
      @click="$router.push('/teams')"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.25 6.75L4.75 12L10.25 17.25"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.25 12H5"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div class="mt-3">
      <AddTeam />
    </div>
  </div>
</template>
