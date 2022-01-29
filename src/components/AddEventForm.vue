<script setup lang="ts">
  import SelectAtom from "./Atoms/SelectAtom.vue";
  import { onMounted, reactive, ref } from "vue";
  import { IPlayerMatch } from "@/types/global";
  import { supabase } from "@/lib/supabase";
  import { toast } from "@/plugins/toaster/vue-toast";
  const props = defineProps<NewEventProps>();

  type NewEventProps = {
    match: string | string[];
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
    allData: IPlayerMatch[];
  }>({
    type: "",
    done_by: "",
    assisted_by: "",
    optionsData: [],
    allData: [],
  });

  const isLoading = ref(true);
  supabase
    .from<IPlayerMatch>("player_match")
    .select("*,player!player_match_player_id_fkey(id,full_name,team_id)")
    .eq("match", props.match + "")
    .then((res) => {
      if (res) {
        data.allData = res.data || [];
        res.data?.forEach((element) => {
          data.optionsData.push({
            value: element.player_id,
            label: element.player.full_name,
          });
        });
      }
    });

  async function eventSelectedType(type: string) {
    data.type = type;
  }
  async function addEvent() {
    console.log(data);
    if (data.type !== "" && data.done_by !== "") {
      await supabase
        .from("events")
        .insert({
          type: data.type,
          match_id: props.match,
          player_id: data.done_by,
          assist_id: data.assisted_by == "" ? null : data.assisted_by,
          team_id: data.allData.find(
            (player: IPlayerMatch) => player.player_id === data.done_by,
          )?.player.team_id,
        })
        .then(async () => {
          toast.success(`${data.type} added successfully`);
          data.type = "";
          data.done_by = "";
          data.assisted_by = "";
        });
    }
  }
  const eventTypes = [
    "Goal",
    "Shot",
    "Shot on target",
    "Foul",
    "Corner",
    "Yellow card",
    "Red card",
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
        :options="data.optionsData"
      ></SelectAtom>
    </div>
    <h1 class="font-black mt-6 mb-4">Assisted by</h1>
    <div class="w-full md:w-1/2">
      <SelectAtom
        v-model="data.assisted_by"
        placeholder="Select Player to assisted"
        :options="data.optionsData"
      ></SelectAtom>
    </div>

    <button
      class="bg-primary text-white mt-2 p-4 px-8 rounded-full"
      @click="addEvent()"
    >
      Add Event
    </button>
  </div>
</template>
