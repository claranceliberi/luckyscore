<template>
  <div class="border bg-white rounded cursor-pointer h-full">
    <img
      :src="
        imageUrl
          ? imageUrl
          : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
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
