<template>
  <select
    class="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    aria-label=".form-select-lg example"
    @change="input"
  >
    <option :selected="!modelValue || modelValue.length < 1">
      {{ selectProps.placeholder }}
    </option>
    <option
      v-for="opt in selectProps.options"
      :key="opt.value"
      :class="`${opt.selected ? 'bg-gray-200' : ''}`"
      :disabled="opt.selected"
      :selected="opt.value === modelValue"
      :value="opt.value"
    >
      {{ opt.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
  interface Props {
    placeholder: string;
    modelValue: string;
    options: Array<{ value: string; label: string; selected?: boolean }>;
  }
  const selectProps = withDefaults(defineProps<Props>(), {
    placeholder: "Open this select menu",
    modelValue: "",
  });

  const emit =
    defineEmits<{ (e: "update:modelValue", id: string | null): void }>();

  function input(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    console.log(selectProps.modelValue);
    if (val === selectProps.placeholder) emit("update:modelValue", null);
    else emit("update:modelValue", val);
  }
</script>
