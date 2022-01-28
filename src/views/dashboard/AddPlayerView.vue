<script setup lang="ts">
  import AddPlayer from "@/components/AddPlayer.vue";
  import { supabase } from "@/lib/supabase";
  import { toast } from "@/plugins/toaster/vue-toast";
  import { ITable } from "@/types/global";
  import { reactive, ref } from "vue";
  import { useRoute } from "vue-router";
  import TeamPlayers from "@/components/molecules/TeamPlayers.vue";
  import EditPlayer from "@/components/EditPlayer.vue";

  interface Players extends ITable {
    id: string;
    full_name: string;
    team_id: string;
  }

  interface SinglePlayer {
    id: string;
    names: string;
  }

  interface IPlayersData {
    playerNames: Players[];
    isLoading: boolean;
  }

  const router = useRoute();
  const players = reactive<IPlayersData>({
    isLoading: true,
    playerNames: [],
  });

  const showForm = reactive({
    showAddForm: false,
    showEditForm: false,
  });

  const playerInfo = reactive<SinglePlayer>({
    names: "",
    id: "",
  });

  supabase
    .from<Players>("player")
    .select("full_name,id,team_id")
    .eq("team_id", router.params.teamId as string)
    .then((res) => {
      if (res) {
        players.playerNames = res.data || [];
        players.isLoading = false;
      }
    });

  async function deletePlayer(playerId: string) {
    const { status, error } = await supabase
      .from("player")
      .delete()
      .match({ id: playerId });
    if (status) {
      const newPlayerNames = players.playerNames.filter(
        (player) => player.id !== playerId,
      );

      players.playerNames = newPlayerNames;
      toast.success("Player deleted");
    } else {
      toast.error(error?.message || "");
    }
  }

  function editPlayer(index: number) {
    const player = players.playerNames[index];
    playerInfo.names = player.full_name || "";
    playerInfo.id = player.id;
    showForm.showEditForm = true;
  }
</script>

<template>
  <div class="mt-11">
    <button
      class="bg-white h-11 flex items-center justify-center w-11 rounded-full"
      @click="$router.back()"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.25 6.75L4.75 12L10.25 17.25"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.25 12H5"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <h1 class="font-medium text-2xl pt-4">{{ router.query.team }}</h1>
    <h3 class="pt-6 pb-4 text-lg">Players</h3>
    <AddPlayer v-if="showForm.showAddForm" />
    <EditPlayer
      v-if="showForm.showEditForm"
      :player-id="playerInfo.id"
      :names="playerInfo.names"
    />

    <div
      v-if="!showForm.showAddForm && !showForm.showEditForm"
      class="flex flex-col justify-start p-6 bg-white w-[22rem]"
    >
      <h1 class="font-medium text-lg pb-6">Registered Players</h1>

      <div v-if="!players.isLoading">
        <div
          v-for="(player, index) in players.playerNames"
          :key="player.id"
          class="flex justify-between items-center pb-6"
        >
          <span class="font-medium text-sm"
            >{{ index + 1 + "." }} {{ player.full_name }}</span
          >

          <div class="cursor-pointer">
            <div class="flex gap-4 items-center justify-center">
              <img
                src="../../assets/icons/edit.svg"
                @click="editPlayer(index)"
              />
              <img
                src="../../assets/icons/close.svg"
                @click="deletePlayer(player.id)"
              />
            </div>
          </div>
        </div>
      </div>

      <span v-else-if="players.isLoading">loading..</span>
      <span
        v-if="players.playerNames.length === 0 && !players.isLoading"
        class="py-6"
        >No players found</span
      >

      <button
        style="border-radius: 28px"
        type="submit"
        class="bg-transparent border-primary border px-6 mt-1 w-44 h-14 flex justify-center items-center text-primary font-medium"
        @click="showForm.showAddForm = true"
      >
        Add new player
      </button>
    </div>
  </div>
</template>
