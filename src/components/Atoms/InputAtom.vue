<template>
  <div class="flex flex-col gap-2 pb-4">
    <label class="font-medium">{{ props.title }}</label>
    <input
      :value="modelValue"
      :placeholder="props.placeholder"
      class="py-2 px-5 w-72 border-primary border-2 rounded focus:outline-none"
      :class="{
        '': !props.readonly,
        'secondary-bg': props.bg === 'secondary',
        'main-bg': props.bg === 'main',
      }"
      :type="props.type"
      :readonly="props.readonly"
      v-bind="$attrs"
      @input="input"
    />
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    type?: string;
    placeholder?: string;
    modelValue?: string;
    readonly?: boolean;
    bg?: "secondary" | "main";
    error?: string;
    title: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    type: "text",
    placeholder: "",
    readonly: false,
    modelValue: "",
    error: "",
    full: false,
    bg: "main",
  });

  const emit = defineEmits<{ (e: "update:modelValue", id: string): void }>();

  function input(e: Event) {
    emit("update:modelValue", (e.target as HTMLInputElement).value);
  }
</script>

<style lang="scss" scoped></style>
