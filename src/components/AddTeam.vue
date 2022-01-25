<script setup lang="ts">
  import InputAtom from "@/components/Atoms/InputAtom.vue";
  import { ref } from "vue";
  const name = ref("");
  const description = ref("");

  function onSubmit() {
    console.log(name.value, description.value);
  }
</script>

<template>
  <h1 class="font-medium text-2xl pb-10">New Team</h1>
  <form @submit.prevent="onSubmit">
    <InputAtom :v-model="name" title="Team name" />
    <InputAtom :v-model="description" title="Team Desscription" />
    <button
      type="submit"
      class="bg-[#502274] px-6 my-6 w-36 h-14 flex justify-center items-center rounded-3xl text-white"
    >
      Save team
    </button>
  </form>
</template>
