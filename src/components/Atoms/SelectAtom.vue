<template>
  <select
    class="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    aria-label=".form-select-lg example"
    @change="input"
  >
    <option selected>{{ selectProps.placeholder }}</option>
    <option
      v-for="opt in selectProps.options"
      :key="opt.value"
      :value="opt.value"
    >
      {{ opt.label }}
    </option>
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

  const emit = defineEmits<{ (e: "update:modelValue", id: string): void }>();

  function input(e: Event) {
    emit("update:modelValue", (e.target as HTMLInputElement).value);
  }
</script>
