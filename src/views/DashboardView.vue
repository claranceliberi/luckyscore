<script lang="ts" setup>
  import { supabase } from "@/lib/supabase";
  import { SupabaseAuthUser, USER_STORAGE_NAME } from "@/types/global";
  import { User } from "@supabase/supabase-js";
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
    console.log(
      "authUser",
      authUser,
      !!authUser,
      !!window.location.hash,
      !authUser && !window.location.hash,
    );
    if (!authUser && !window.location.hash) {
      console.error("no user");
      router.push("/signin");
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
      console.log("hashchange");
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
  <div v-else>Authenticating</div>
</template>
