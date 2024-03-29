<script setup lang="ts">
  import SelectAtom from "./Atoms/SelectAtom.vue";
  import { onMounted, reactive, ref } from "vue";
  import {
    IMatchTeamJoin,
    IPlayerMatch,
    Teams,
    IEventType,
    Events,
  } from "@/types/global";
  import { supabase } from "@/lib/supabase";
  import { generateCommentary, generateThumbnail } from "@/lib/commentary";
  import { toast } from "@/plugins/toaster/vue-toast";
  import { fetchMatchDetails } from "@/composables/useMatchinfo";
  const props = defineProps<NewEventProps>();

  type NewEventProps = {
    match: string | string[];
    team: string | string[];
  };

  type Options = {
    value: string;
    label: string;
  };

  const data = reactive<{
    type: string;
    done_by: string;
    assisted_by: string;
    optionsData: Options[];
    opponentOptions: Options[];
    allData: IPlayerMatch[];
    home_team: Teams | null;
    away_team: Teams | null;
    teams: Teams[];
    commentary: string;
    home_score: number;
    away_score: number;
    event_image_url: string;
    is_disabled: boolean;
  }>({
    type: "",
    done_by: "",
    assisted_by: "",
    optionsData: [],
    opponentOptions: [],
    allData: [],
    home_team: null,
    away_team: null,
    commentary: "",
    teams: [],
    home_score: 0,
    away_score: 0,
    event_image_url: "",
    is_disabled: false,
  });

  const isLoading = ref(true);

  supabase
    .from<IMatchTeamJoin>("match")
    .select("*,away:away_team ( * ),home:home_team ( * )")
    .eq("id", props.match + "")
    .single()
    .then((res) => {
      data.home_team = res.data ? res?.data.home : null;
      data.away_team = res.data ? res?.data.away : null;
    });
  let homeOptions = localStorage.getItem(
    `match_data_${props.match}_${props.team}_data`,
  );

  let opponentOptions = localStorage.getItem(
    `match_data_${props.match}_${props.team}_opponent`,
  );

  let allData = localStorage.getItem(`match_data_${props.match}_allData`);

  if (homeOptions != null && opponentOptions != null && allData != null) {
    // data.opponentOptions = JSON.parse(opponentOptions);
    data.opponentOptions = JSON.parse(opponentOptions);
    data.optionsData = JSON.parse(homeOptions);
    data.allData = JSON.parse(allData);
  } else {
    supabase
      .from<IPlayerMatch>("player_match")
      .select("*,player!player_match_player_id_fkey(id,full_name,team_id)")
      .eq("match", props.match + "")
      .then((res) => {
        if (res) {
          data.allData = res.data || [];
          res.data?.forEach((element) => {
            if (element.player.team_id === props.team)
              data.optionsData.push({
                value: element.player_id,
                label: element.player.full_name,
              });
            else
              data.opponentOptions.push({
                value: element.player_id,
                label: element.player.full_name,
              });
          });
          localStorage.setItem(
            `match_data_${props.match}_${props.team}_opponent`,
            JSON.stringify(data.opponentOptions),
          );
          localStorage.setItem(
            `match_data_${props.match}_${props.team}_data`,
            JSON.stringify(data.optionsData),
          );

          localStorage.setItem(
            `match_data_${props.match}_allData`,
            JSON.stringify(data.allData),
          );
        }
      });
  }
  supabase
    .from<Events>("events")
    .select("*")
    .eq("match_id", props.match + "")
    .then((res) => {
      if (res) {
        data.home_score =
          res.data?.filter(
            (event: Events) =>
              (event.team_id == data.home_team?.id &&
                event.type.toLowerCase() === "goal") ||
              (event.team_id == data.away_team?.id &&
                event.type.toLowerCase() === "own goal"),
          ).length || 0;
        data.away_score =
          res.data?.filter(
            (event: Events) =>
              (event.team_id == data.away_team?.id &&
                event.type.toLowerCase() === "goal") ||
              (event.team_id == data.home_team?.id &&
                event.type.toLowerCase() === "own goal"),
          ).length || 0;
      }
    });
  async function eventSelectedType(type: string) {
    data.type = type;
  }
  async function addEvent() {
    if (data.done_by == "") {
      toast.error("Please select a player");
      return;
    }
    if (data.type === "") {
      toast.error("Please select event");
      return;
    }
    data.is_disabled = true;
    const done_by = data.done_by;
    const type = data.type;
    data.done_by = "";
    data.type = "";
    let time = localStorage.getItem(`${props.match}_currentTime`);

    const player = data.allData.find(
      (player: IPlayerMatch) => player.player_id === done_by,
    );
    if (type === IEventType.GOAL) {
      await generateCommentary(
        `Player ${player?.player.full_name} scored for team ${
          data.home_team?.id === player?.player.team_id
            ? data.home_team?.name
            : data.away_team?.name
        } against ${
          data.home_team?.id !== player?.player.team_id
            ? data.home_team?.name
            : data.away_team?.name
        } to make it ${
          data.home_team?.id === player?.player.team_id
            ? ++data.home_score
            : ++data.away_score
        }-${
          data.home_team?.id === player?.player.team_id
            ? data.away_score
            : data.home_score
        } ${data.home_team?.id === player?.player.team_id ? "home" : "away"}
        ${
          data.assisted_by.trim() == ""
            ? ""
            : `assisted by ${
                data.allData.find(
                  (player: IPlayerMatch) =>
                    player.player_id === data.assisted_by,
                )?.player.full_name
              }`
        }, ${time} minutes`,
      ).then((res) => {
        data.home_team?.id === player?.player.team_id;
        data.commentary = res.data.choices ? res.data.choices[0].text + "" : "";
      });

      data.event_image_url = await generateThumbnail("goal celebration");
    } else if (type === IEventType.OWN_GOAL) {
      await generateCommentary(
        `Player ${player?.player.full_name} scored own goal agains his team ${
          data.home_team?.id === player?.player.team_id
            ? data.home_team?.name
            : data.away_team?.name
        } and made it ${
          data.home_team?.id === player?.player.team_id
            ? ++data.home_score
            : ++data.away_score
        }-${
          data.home_team?.id === player?.player.team_id
            ? data.away_score
            : data.home_score
        } ${data.home_team?.id === player?.player.team_id ? "home" : "away"}
     , ${time} minutes`,
      ).then((res) => {
        data.home_team?.id === player?.player.team_id;
        data.commentary = res.data.choices ? res.data.choices[0].text + "" : "";
      });

      data.event_image_url = await generateThumbnail("own goal scored");
    } else if (type === IEventType.SHOT_ON_TARGET || type === IEventType.SHOT) {
      await generateCommentary(
        `${player?.player.full_name} makes ${type} but not goal scored team ${
          data.home_team?.id === player?.player.team_id
            ? data.home_team?.name
            : data.away_team?.name
        },  ${time} minutes`,
      ).then((res) => {
        data.commentary = res.data.choices ? res.data.choices[0].text + "" : "";
      });
      if (type === IEventType.SHOT_ON_TARGET)
        data.event_image_url = await generateThumbnail(
          "saving shot on goal  football europe",
        );
    } else if (
      type === IEventType.YELLOW_CARD ||
      type === IEventType.RED_CARD
    ) {
      await generateCommentary(
        `${type} to ${player?.player.full_name} plays for ${
          data.home_team?.id === player?.player.team_id
            ? data.home_team?.name
            : data.away_team?.name
        }, ${time} minutes`,
      ).then((res) => {
        data.commentary = res.data.choices ? res.data.choices[0].text + "" : "";
      });
    } else if (type === IEventType.FOUL || type === IEventType.OFFSIDE) {
      await generateCommentary(
        `${player?.player.full_name} plays for ${
          data.home_team?.id === player?.player.team_id
            ? data.home_team?.name
            : data.away_team?.name
        } makes a ${type}, ${time} minutes`,
      ).then((res) => {
        data.commentary = res.data.choices ? res.data.choices[0].text + "" : "";
      });
    } else if (type === IEventType.CORNER) {
      await generateCommentary(`
        ${type}  ${
        data.home_team?.id === player?.player.team_id
          ? data.home_team?.name
          : data.away_team?.name
      } ${player?.player.full_name},
       ${time} minutes`).then((res) => {
        data.commentary = res.data.choices ? res.data.choices[0].text + "" : "";
      });
    }
    if (type.trim() !== "" && done_by.trim() !== "") {
      await supabase
        .from("events")
        .insert({
          type: type,
          commentary: data.commentary,
          event_image_url: data.event_image_url,
          match_id: props.match,
          player_id: done_by,
          time: time,
          assist_id: data.assisted_by == "" ? null : data.assisted_by,
          team_id: props.team,
        })
        .then(async () => {
          data.is_disabled = false;
          toast.success(`${type} added successfully`);
          data.type = "";
          data.done_by = "";
          data.assisted_by = "";
        });
    }
  }
  const eventTypes = [
    "Goal",
    "Own Goal",
    "Shot",
    "Shot on target",
    "Foul",
    "Corner",
    "Yellow card",
    "Red card",
    "Offside",
  ];
</script>

<template>
  <div class="bg-white shadow-sm p-4 mt-10 w-full pb-8 mb-4">
    <h1 class="font-black mt-4 mb-4">Event type</h1>
    <div class="flex flex-wrap gap-4">
      <div
        v-for="type in eventTypes"
        :key="type"
        :class="`border-2 px-6 py-2 rounded-md font-semibold cursor-pointer ${
          type === data.type ? 'text-primary border-primary' : ''
        }`"
        @click="eventSelectedType(type)"
      >
        {{ type }}
      </div>
    </div>

    <h1 class="font-black mt-6 mb-4">Shot by</h1>
    <div class="w-full md:w-1/2">
      <SelectAtom
        v-model="data.done_by"
        placeholder="Select Player who shot"
        :options="
          data.type == IEventType.OWN_GOAL
            ? data.opponentOptions
            : data.optionsData
        "
      ></SelectAtom>
    </div>
    <template
      v-if="
        data.type == IEventType.GOAL ||
        data.type == IEventType.SHOT ||
        data.type == IEventType.SHOT_ON_TARGET
      "
    >
      <h1 class="font-black mt-6 mb-4">Assisted by</h1>
      <div class="w-full md:w-1/2">
        <SelectAtom
          v-model="data.assisted_by"
          placeholder="Select Player to assisted"
          :options="data.optionsData"
        ></SelectAtom>
      </div>
    </template>

    <button
      class="bg-primary text-white mt-2 p-4 px-8 rounded-full"
      @click="addEvent()"
    >
      <span v-if="!data.is_disabled">Add Event</span
      ><span v-else>Adding ...</span>
    </button>
  </div>
</template>
