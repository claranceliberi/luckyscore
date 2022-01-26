<script setup lang="ts">
  import InputAtom from "@/components/Atoms/InputAtom.vue";
  import { supabase } from "@/lib/supabase";
  import { toast } from "@/plugins/toaster/vue-toast";
  import router from "@/router";

  import { ref } from "vue";
  import { useRoute } from "vue-router";

  type EditPlayerProps = {
    playerId: string;
    names: string;
  };

  const teamId = useRoute();
  const id = teamId.params.teamId || "";
  const editProps = defineProps<EditPlayerProps>();
  const full_name = ref(editProps.names || "");

  async function onSubmit() {
    const { data, error } = await supabase
      .from("player")
      .update({ full_name: full_name.value })
      .match({ id: editProps.playerId });

    if (data) {
      router.push(`/dashboard/teams/${id}/view`);
      toast.success("Player updated");
    }
    if (error) toast.error(error?.message);
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
        Edit player
      </button>
    </form>
  </div>
</template>
