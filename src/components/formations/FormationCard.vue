<script setup lang="ts">
  import { IPlayerMatch } from "@/types/global";
  import { supabase } from "@/lib/supabase";
  import { useRoute } from "vue-router";
  import { ref, reactive } from "vue";

  type FormationProps = {
    formation: string;
    matchId: string;
    team: string;
  };

  const props = defineProps<FormationProps>();
  const team = reactive({
    players: [] as IPlayerMatch[],
    subbs: [] as IPlayerMatch[],
    goalkeeper: {} as IPlayerMatch | undefined,
  });
  console.log(props);
  const isLoading = ref(true);
  supabase
    .from<IPlayerMatch>("player_match")
    .select("*,player!player_match_player_id_fkey(id,full_name,team_id)")
    .eq("match", props.matchId + "")
    .then((res) => {
      if (res) {
        team.goalkeeper = res.data?.find(
          (player: IPlayerMatch) => player.pitch_position === 1,
        );
        team.players =
          res.data?.filter(
            (player: IPlayerMatch) =>
              player.pitch_position !== 1 &&
              player.pitch_position >= 2 &&
              player.pitch_position <= 11 &&
              player.player.team_id == props.team,
          ) || [];
        team.subbs =
          res.data?.filter(
            (player: IPlayerMatch) =>
              player.pitch_position >= 12 &&
              player.player.team_id == props.team,
          ) || [];
        isLoading.value = false;
      }
    });
</script>

<template>
  <div
    v-if="!isLoading && team.players.length >= 10 && team.goalkeeper != null"
    class="field w-full"
  >
    <div class="inner-field w-full h-full">
      <div class="trans-field w-full h-full">
        <div class="large-goal">
          <div class="small-goal">
            <div class="user w-6 h-6 md:w-10 md:h-10 u1">
              <span class="p-names">{{
                team.goalkeeper?.player.full_name.split(" ")[0]
              }}</span>
            </div>
          </div>
        </div>
        <div
          v-for="(player, index) in team.players"
          :key="index"
          class="user w-6 h-6 md:w-10 md:h-10"
          :class="`u${player.pitch_position}-${props.formation}`"
        >
          <span
            v-if="player.player.full_name.split(` `)[0].length > 3"
            class="p-names"
            >{{ player.player.full_name.split(" ")[0] }}</span
          >
          <span
            v-else-if="player.player.full_name.split(` `)[1].length > 3"
            class="p-names"
            >{{ player.player.full_name.split(" ")[1] }}</span
          >
          <span v-else class="p-names">{{ player.player.full_name }}</span>
        </div>
        <div class="face-of-goal"></div>
      </div>
    </div>
  </div>
  <div v-if="isLoading">
    <p>Getting team's lineup</p>
  </div>
  <div
    v-if="!isLoading && (!team.goalkeeper || team.players.length < 10)"
    class="w-full flex item-center justify-center"
  >
    <div>
      <h1 class="font-medium text-red-600">
        Lineup can not be generated because of the following:
      </h1>
      <p v-if="!isLoading && !team.goalkeeper" class="text-red-500">
        Lineup does not have goalkeeper.
      </p>
      <p v-if="team.players.length < 10" class="text-red-500">
        Pitch players number is less than ten.
      </p>
    </div>
  </div>
  <div v-if="team.subbs.length > 0" class="w-full bg-white px-4 py-6 rounded">
    <h1 class="font-semibold text-2xl text-black-600 mb-2">Substitutes</h1>
    <div class="">
      <div
        v-for="(player, index) in team.subbs"
        :key="index"
        class="flex cursor-pointer gap-3"
      >
        <span class="subb w-6 h-6 md:w-10 md:h-10"></span>
        <span class="pt-2">{{ player.player.full_name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .face-of-goal {
    width: 30%;
    height: 11%;
    border: 2px solid #fff;
    position: absolute;
    bottom: 0.2%;
    left: 36%;
    border-radius: 50% / 100%;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .inner-field {
    border-left: 2px solid #fff;
    border-right: 2px solid #fff;
    padding-left: 20px;
  }
  .trans-field {
    position: relative;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
  }
  .p-names {
    font-size: 1rem;
    font-weight: 400;
    color: #fff;
    position: relative;
    top: 110%;
  }
  .large-goal {
    width: 60%;
    height: 20%;
    border: 2px solid #fff;
    position: absolute;
    top: 0%;
    left: 21%;
  }

  .small-goal {
    width: 50%;
    height: 55%;
    border: 2px solid #fff;
    position: absolute;
    top: -3%;
    left: 26%;
  }
  .field {
    height: 580px;
    background: #02b65a;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
  }

  /* all 3-5-2 formations css */

  .user {
    background-color: #c4c4c4;
    border-radius: 50%;
    position: absolute;
    border: 2px solid #fff;
    cursor: pointer;
  }

  .subb {
    background-color: #c4c4c4;
    border-radius: 50%;
    border: 2px solid #fff;
    cursor: pointer;
  }

  .u1 {
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .u2-3-5-2 {
    top: 50%;
    left: 0%;
  }

  .u3-3-5-2 {
    top: 50%;
    right: 0%;
  }
  .u4-3-5-2 {
    top: 23%;
    left: 18%;
  }

  .u5-3-5-2 {
    top: 23%;
    right: 45%;
  }

  .u6-3-5-2 {
    top: 23%;
    right: 18%;
  }

  .u8-3-5-2 {
    top: 50%;
    right: 22%;
  }

  .u7-3-5-2 {
    top: 50%;
    left: 20%;
  }

  .u10-3-5-2 {
    top: 50%;
    left: 47%;
  }

  .u11-3-5-2 {
    bottom: 16%;
    right: 20%;
  }

  .u9-3-5-2 {
    bottom: 16%;
    left: 20%;
  }

  /* All 4-3-3 formation css */
  .u2-4-3-3 {
    top: 23%;
    left: 0%;
  }

  .u3-4-3-3 {
    top: 23%;
    right: 0%;
  }
  .u4-4-3-3 {
    top: 23%;
    left: 30%;
  }

  .u5-4-3-3 {
    top: 23%;
    right: 30%;
  }

  .u6-4-3-3 {
    top: 48%;
    left: 10%;
  }

  .u8-4-3-3 {
    top: 48%;
    right: 10%;
  }

  .u7-4-3-3 {
    bottom: 16%;
    left: 10%;
  }

  .u10-4-3-3 {
    top: 48%;
    left: 47%;
  }

  .u11-4-3-3 {
    bottom: 16%;
    right: 10%;
  }

  .u9-4-3-3 {
    bottom: 16%;
    left: 47%;
  }

  /* 4-2-3-1 formation css */

  .u2-4-2-3-1 {
    top: 23%;
    left: 0%;
  }

  .u3-4-2-3-1 {
    top: 23%;
    right: 0%;
  }
  .u4-4-2-3-1 {
    top: 23%;
    left: 30%;
  }

  .u5-4-2-3-1 {
    top: 23%;
    right: 30%;
  }

  .u6-4-2-3-1 {
    top: 45%;
    right: 58%;
  }

  .u8-4-2-3-1 {
    top: 45%;
    left: 58%;
  }

  .u7-4-2-3-1 {
    bottom: 29%;
    left: 8%;
  }

  .u10-4-2-3-1 {
    bottom: 29%;
    left: 47%;
  }

  .u11-4-2-3-1 {
    bottom: 29%;
    right: 8%;
  }

  .u9-4-2-3-1 {
    bottom: 15%;
    left: 47%;
  }

  /* All 4-4-2 formation css */

  .u2-4-4-2 {
    top: 23%;
    left: 0%;
  }

  .u3-4-4-2 {
    top: 23%;
    right: 0%;
  }
  .u4-4-4-2 {
    top: 23%;
    left: 30%;
  }

  .u5-4-4-2 {
    top: 23%;
    right: 30%;
  }

  .u6-4-4-2 {
    top: 50%;
    left: 30%;
  }

  .u8-4-4-2 {
    top: 50%;
    right: 0%;
  }

  .u7-4-4-2 {
    top: 50%;
    left: 0%;
  }

  .u10-4-4-2 {
    top: 50%;
    right: 30%;
  }

  .u11-4-4-2 {
    bottom: 16%;
    left: 58%;
  }

  .u9-4-4-2 {
    bottom: 16%;
    right: 58%;
  }

  /* All 4-2-2-2 css formations */

  .u2-4-2-2-2 {
    top: 23%;
    left: 0%;
  }

  .u3-4-2-2-2 {
    top: 23%;
    right: 0%;
  }
  .u4-4-2-2-2 {
    top: 23%;
    left: 30%;
  }

  .u5-4-2-2-2 {
    top: 23%;
    right: 30%;
  }

  .u6-4-2-2-2 {
    top: 40%;
    left: 15%;
  }

  .u8-4-2-2-2 {
    top: 40%;
    right: 15%;
  }

  .u7-4-2-2-2 {
    top: 55%;
    left: 15%;
  }

  .u10-4-2-2-2 {
    top: 55%;
    right: 15%;
  }

  .u11-4-2-2-2 {
    bottom: 16%;
    right: 15%;
  }

  .u9-4-2-2-2 {
    bottom: 16%;
    left: 15%;
  }

  /* All 3-4-3 css formations */
  .u2-3-4-3 {
    top: 50%;
    left: 0%;
  }

  .u3-3-4-3 {
    top: 50%;
    right: 0%;
  }
  .u4-3-4-3 {
    top: 23%;
    left: 18%;
  }

  .u5-3-4-3 {
    top: 23%;
    right: 45%;
  }

  .u6-3-4-3 {
    top: 23%;
    right: 18%;
  }

  .u8-3-4-3 {
    top: 43%;
    right: 25%;
  }

  .u7-3-4-3 {
    bottom: 16%;
    left: 15%;
  }

  .u10-3-4-3 {
    top: 43%;
    left: 25%;
  }

  .u11-3-4-3 {
    bottom: 16%;
    right: 15%;
  }

  .u9-3-4-3 {
    bottom: 16%;
    left: 47%;
  }
</style>
