<script setup lang="ts">
  import SubnavbarMoleculeVue from "@/components/molecules/SubnavbarMolecule.vue";
  import NavbarMolecule from "@/components/molecules/NavbarMolecule.vue";
  import { ILink } from "~/types/global";
  import { onBeforeRouteUpdate, useRoute } from "vue-router";
  import { ref } from "vue";
  import router from "@/router";

  const route = useRoute();

  const links: ILink[] = [
    { name: "Fixtures", href: "/" },
    { name: "Table", href: "/table" },
    { name: "Stats", href: "/stats" },
    { name: "Players", href: "/players" },
  ];

  const homeLinks: ILink[] = [
    { name: "Home", href: "/" },
    { name: "Bet", href: "/bet" },
  ];
  const routesWithoutMenu = ["MatchDetails"];
  const showMenu = ref(true);

  onBeforeRouteUpdate((to) => {
    if (to.name)
      showMenu.value = !routesWithoutMenu.includes(to.name.toString());
  });
</script>

<template>
  <div class="home">
    <div class="navbar">
      <NavbarMolecule :links="homeLinks" />
    </div>
    <div class="home--page__wrapper px-1 md:px-20">
      <SubnavbarMoleculeVue v-if="showMenu" :links="links">
        <div class="pb-14 pt-8">
          <h4 class="">Football Competition</h4>
          <h1 class="text-2xl font-bold pt-2">Interclass league</h1>
        </div>
      </SubnavbarMoleculeVue>
      <div class="home--page">
        <router-view />
      </div>
    </div>
  </div>
</template>
