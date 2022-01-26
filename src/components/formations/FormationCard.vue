<script lang="ts">
  import { IPlayerMatch } from "@/types/global";
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "FormationCard",
    props: {
      formation: {
        type: String,
        required: true,
        default: () => "3-4-3",
      },
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
      :class="`u${player.pitch_position}-${formation}`"
    >
      <span class="p-names">{{ player.player_id.split(" ")[0] }}</span>
    </div>
    <div class="face-of-goal"></div>
  </div>
</template>

<style scoped>
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

  /* all 3-5-2 formations css */

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
    bottom: 18%;
    right: 20%;
  }

  .u9-3-5-2 {
    bottom: 18%;
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
    bottom: 18%;
    left: 10%;
  }

  .u10-4-3-3 {
    top: 48%;
    left: 47%;
  }

  .u11-4-3-3 {
    bottom: 18%;
    right: 10%;
  }

  .u9-4-3-3 {
    bottom: 18%;
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
    bottom: 18%;
    left: 58%;
  }

  .u9-4-4-2 {
    bottom: 18%;
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
    bottom: 18%;
    right: 15%;
  }

  .u9-4-2-2-2 {
    bottom: 18%;
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
    bottom: 18%;
    left: 15%;
  }

  .u10-3-4-3 {
    top: 43%;
    left: 25%;
  }

  .u11-3-4-3 {
    bottom: 18%;
    right: 15%;
  }

  .u9-3-4-3 {
    bottom: 18%;
    left: 47%;
  }
</style>