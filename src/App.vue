<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import HelloWorld from "./components/HelloWorld.vue";
  import NavbarMolecule from "./components/molecules/NavbarMolecule.vue";
</script>

<template>
  <div class="navbar">
    <NavbarMolecule />
  </div>
  <router-view />
</template>
