<template>
  <select
    class="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    aria-label=".form-select-lg example"
  >
    <option selected>{{ placeholder }}</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
</template>

<script setup lang="ts">
  interface Props {
    placeholder: string;
    options: Array<{ value: string; label: string }>;
  }
  const selectProps = withDefaults(defineProps<Props>(), {
    placeholder: "Open this select menu",
  });
  console.log(selectProps);
</script>
