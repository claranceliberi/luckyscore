<script lang="ts">
  import { IPlayerMatch } from "@/types/global";
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "ThreeFiveTwo",
    props: {
      players: {
        type: Array as () => IPlayerMatch[],
        required: false,
        default: () => [],
      },
    },
    data() {
      return {
        pitch_players: [] as IPlayerMatch[],
        loading: false,
        goalkeeper: {} as IPlayerMatch | undefined,
      };
    },
    created() {
      this.goalkeeper = this.players.find(
        (player) => player.pitch_position === 1,
      );
      this.pitch_players = this.players.filter(
        (player) => player.pitch_position !== 1,
      );
    },
  });
</script>

<template>
  <div class="field">
    <div class="large-goal">
      <div class="small-goal">
        <div class="user u1">
          <span class="p-names">{{ goalkeeper?.player_id.split(" ")[0] }}</span>
        </div>
      </div>
    </div>
    <div
      v-for="(player, index) in pitch_players"
      :key="index"
      class="user"
      :class="`u${player.pitch_position}`"
    >
      <span class="p-names">{{ player.player_id.split(" ")[0] }}</span>
    </div>
    <div class="face-of-goal"></div>
  </div>
</template>

<style scoped>
  .p-names {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    position: relative;
    top: 110%;
  }
  .large-goal {
    width: 40%;
    height: 20%;
    border: 3px solid #fff;
    position: absolute;
    top: 0%;
    left: 30%;
  }

  .small-goal {
    width: 50%;
    height: 55%;
    border: 3px solid #fff;
    position: absolute;
    top: -3%;
    left: 26%;
  }
  .field {
    height: 580px;
    background: #02b65a;
    width: 631px;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    position: relative;
  }

  .user {
    width: 50px;
    height: 50px;
    background-color: #c4c4c4;
    border-radius: 50%;
    position: absolute;
    border: 4px solid #fff;
    cursor: pointer;
  }

  .u1 {
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .u2 {
    top: 50%;
    left: 0%;
  }

  .u3 {
    top: 50%;
    right: 0%;
  }
  .u4 {
    top: 23%;
    left: 18%;
  }

  .u5 {
    top: 23%;
    right: 45%;
  }

  .u6 {
    top: 23%;
    right: 18%;
  }

  .u8 {
    top: 50%;
    right: 22%;
  }

  .u7 {
    top: 50%;
    left: 20%;
  }

  .u10 {
    top: 50%;
    left: 47%;
  }

  .u11 {
    bottom: 18%;
    right: 20%;
  }

  .u9 {
    bottom: 18%;
    left: 20%;
  }

  .face-of-goal {
    width: 20%;
    height: 10%;
    border: 3px solid #fff;
    position: absolute;
    bottom: 0.2%;
    left: 40%;
    border-radius: 50% / 100%;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>
