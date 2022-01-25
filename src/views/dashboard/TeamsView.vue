<script setup lang="ts">
  import TeamCardVue from "@/components/TeamCard.vue";
  import InputAtom from "@/components/Atoms/InputAtom.vue";
</script>

<template>
  <div class="flex flex-col mt-11">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Teams</h1>

      <router-link to="/dashboard/teams/new">
        <button class="bg-primary px-6 py-4 w-auto h-14 rounded-3xl text-white">
          Add new team
        </button>
      </router-link>
    </div>
    <div>
      <TeamCardVue />
    </div>
  </div>
</template>
