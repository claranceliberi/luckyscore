<script setup lang="ts">
  import InputAtom from "@/components/Atoms/InputAtom.vue";
  import { supabase } from "@/lib/supabase";
  import { toast } from "@/plugins/toaster/vue-toast";
  import router from "@/router";

  import { ref } from "vue";
  import { useRoute } from "vue-router";

  const full_name = ref("");

  const teamId = useRoute();
  const id = teamId.params.teamId || "";

  async function onSubmit() {
    if (full_name.value === "") {
      toast.error("Please enter a name");
      return;
    } else {
      const { data, error } = await supabase.from("player").insert({
        full_name: full_name.value,
        team_id: id,
      });

      if (data) {
        router.push(`/dashboard/teams/${id}/view`);
        toast.success("Player added to team");
      }
      if (error) toast.error(error?.message);
    }
  }
</script>

<template>
  <div class="flex flex-col justify-start p-6 bg-white w-[21rem]">
    <h1 class="font-medium text-lg pb-6">New Player</h1>

    <form @submit.prevent="onSubmit">
      <InputAtom v-model="full_name" title="Full Names" />
      <button
        style="border-radius: 28px"
        type="submit"
        class="bg-primary px-6 pb mt-2 w-36 h-14 flex justify-center items-center text-white"
      >
        Save player
      </button>
    </form>
  </div>
</template>
