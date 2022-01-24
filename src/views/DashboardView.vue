<script setup lang="ts">
  import { ILink } from "~/types/global";
  import NavbarMolecule from "@/components/molecules/NavbarMolecule.vue";

  const links: ILink[] = [
    { name: "Dashboard", href: "/dashboard/" },
    { name: "Teams", href: "/dashboard/teams" },
    { name: "Matches", href: "/dashboard/matches" },
  ];
</script>

<template>
  <div class="dashboard px-20">
    <div class="navbar">
      <NavbarMolecule rounded :links="links" />
    </div>
    <div class="dashboard--page">
      <router-view />
    </div>
  </div>
</template>
