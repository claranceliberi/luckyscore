<script setup lang="ts">
  import InputAtom from "@/components/Atoms/InputAtom.vue";
  import { supabase } from "@/lib/supabase";
  import { ref } from "vue";
  const name = ref("");
  const description = ref("");

  async function onSubmit() {
    const { data, error } = await supabase.from("team").insert({
      name: name.value,
      description: description.value,
    });

    // console.log(error);
  }
</script>

<template>
  <h1 class="font-medium text-2xl pb-10">New Team</h1>
  <form @submit.prevent="onSubmit">
    <InputAtom v-model="name" title="Team name" />
    <InputAtom v-model="description" title="Team Desscription" />
    <button
      type="submit"
      class="bg-primary px-6 my-6 w-36 h-14 flex justify-center items-center rounded-3xl text-white"
    >
      Save team
    </button>
  </form>
</template>
