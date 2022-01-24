<script setup lang="ts">
  import { ILink } from "~/types/global";
  import NavbarMolecule from "@/components/molecules/NavbarMolecule.vue";

  const links: ILink[] = [
    { name: "Dashboard", href: "/" },
    { name: "Teams", href: "/teams" },
    { name: "Matches", href: "/matches" },
  ];
</script>

<template>
  <div class="dashboard px-20">
    <div class="navbar">
      <NavbarMolecule rounded :links="links" />
    </div>
    <div class="dashboard--page">
      dashboard default
      <router-view />
    </div>
  </div>
</template>
