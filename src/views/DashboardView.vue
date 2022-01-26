<script lang="ts" setup>
  import { supabase } from "@/lib/supabase";
  import { SupabaseAuthUser } from "@/types/global";
  import { User } from "@supabase/supabase-js";
  import { onBeforeMount, ref } from "vue";
  import { useRouter } from "vue-router";
  import { ILink } from "~/types/global";
  import NavbarMolecule from "@/components/molecules/NavbarMolecule.vue";

  const router = useRouter();

  const user = ref<SupabaseAuthUser>();
  const loading = ref(false);

  const links: ILink[] = [
    { name: "Dashboard", href: "/dashboard/" },
    { name: "Teams", href: "/dashboard/teams" },
    { name: "Matches", href: "/dashboard/matches" },
  ];

  async function checkAuthUser() {
    loading.value = true;

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (Object.keys(storedUser).length > 0) {
      user.value = storedUser as SupabaseAuthUser;
      loading.value = false;
      return;
    }

    const authUser = await supabase.auth.user();

    if (!authUser && !window.location.hash) {
      console.error("no user");
      router.push("/signin");
    } else {
      loading.value = false;
    }

    user.value = authUser?.user_metadata as SupabaseAuthUser;

    localStorage.setItem("user", JSON.stringify(authUser?.user_metadata));
  }

  onBeforeMount(async () => {
    await checkAuthUser();
    console.log(window.location.hash, "hash");
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
