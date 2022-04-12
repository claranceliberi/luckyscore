<template>
  <div class="border bg-white rounded cursor-pointer h-full">
    <img
      :src="
        imageUrl
          ? imageUrl
          : 'https://i.pravatar.cc/200'
      "
      class=""
      alt=""
    />
    <div class="px-2">
      <p class="">{{ name }}</p>
      <small class="text-gray-500">{{ team }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    imageUrl?: string;
    name: string;
    team: string;
    position?: string;
  }
  const playerData = defineProps<Props>();
</script>
<style></style>
