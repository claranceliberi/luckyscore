<script setup lang="ts">
  import InputAtom from "@/components/Atoms/InputAtom.vue";
  import { supabase } from "@/lib/supabase";
  import { toast } from "@/plugins/toaster/vue-toast";
  import router from "@/router";

  import { ref } from "vue";

  const name = ref("");
  const description = ref("");
  const letter = ref("");

  async function onSubmit() {
    const { data, error } = await supabase.from("team").insert({
      name: name.value,
      description: description.value,
      letter: letter.value,
    });

    if (data) {
      router.push("/dashboard/teams");
      toast.success("Team created");
    }
    if (error) toast.error(error?.message);
  }
</script>

<template>
  <h1 class="font-medium text-2xl pb-10">New Team</h1>
  <form @submit.prevent="onSubmit">
    <InputAtom v-model="name" title="Team name" />
    <InputAtom v-model="description" title="Team Desscription" />
    <InputAtom v-model="letter" title="Team Letter" />
    <button
      style="border-radius: 28px"
      type="submit"
      class="bg-primary px-6 my-6 w-36 h-14 flex justify-center items-center text-white"
    >
      Save team
    </button>
  </form>
</template>
