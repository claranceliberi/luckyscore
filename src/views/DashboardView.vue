<script lang="ts" setup>
  import { supabase } from "@/lib/supabase";
  import { SupabaseAuthUser } from "@/types/global";
  import { onBeforeMount, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { ILink } from "~/types/global";
  import NavbarMolecule from "@/components/molecules/NavbarMolecule.vue";

  const router = useRouter();
  const route = useRoute();

  const user = ref<SupabaseAuthUser>();
  const loading = ref(false);

  const links: ILink[] = [
    { name: "Dashboard", href: "/dashboard/" },
    { name: "Teams", href: "/dashboard/teams" },
    { name: "Matches", href: "/dashboard/matches" },
  ];

  async function checkAuthUser() {
    loading.value = true;

    const authUser = await supabase.auth.user();

    if (!authUser && !window.location.hash) {
      console.error("no user");
      // router.push("/signin");
      loading.value = false;
    } else {
      loading.value = false;
    }

    user.value = authUser?.user_metadata as SupabaseAuthUser;
  }

  onBeforeMount(async () => {
    if (route.query.error) {
      console.error(route.query);
      router.push({ path: "/signin", query: route.query });
    }

    await checkAuthUser();

    window.addEventListener("hashchange", async () => {
      await checkAuthUser();
    });
  });
</script>

<template>
  <div v-if="!loading" class="dashboard px-20">
    <div class="navbar">
      <NavbarMolecule rounded :user="user" :links="links" />
    </div>
    <div class="dashboard--page">
      <router-view />
    </div>
  </div>
  <div v-else class="w-full h-full flex items-center justify-center">
    <div>Authenticating...</div>
  </div>
</template>
