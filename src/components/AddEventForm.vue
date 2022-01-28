<script setup lang="ts">
  import SelectAtom from "./Atoms/SelectAtom.vue";
  const eventTypes = [
    "Shot",
    "Shot on target",
    "Foul",
    "Corner",
    "Yellow card",
    "Red card",
  ];
  const optionsData = [
    { value: "1", label: "Yves Mugunga" },
    { value: "2", label: "Cyusa Kenny" },
  ];
</script>

<template>
  <div class="bg-white shadow-sm p-4 mt-10 w-full pb-8 mb-4">
    <h1 class="font-black mt-4 mb-4">Event type</h1>
    <div class="flex flex-wrap gap-4">
      <div
        v-for="(type, index) in eventTypes"
        :key="type"
        :class="`border-2 px-6 py-2 rounded-md font-semibold cursor-pointer ${
          index === 1 ? 'text-primary border-primary' : ''
        }`"
      >
        {{ type }}
      </div>
    </div>

    <h1 class="font-black mt-6 mb-4">Shot by</h1>
    <div class="w-full md:w-1/2">
      <SelectAtom
        placeholder="Select Player who shot"
        :options="optionsData"
      ></SelectAtom>
    </div>
    <h1 class="font-black mt-6 mb-4">Assisted by</h1>
    <div class="w-full md:w-1/2">
      <SelectAtom
        placeholder="Select Player to assisted"
        :options="optionsData"
      ></SelectAtom>
    </div>

    <button class="bg-primary text-white mt-2 p-4 px-8 rounded-full">
      Add Event
    </button>
  </div>
</template>
