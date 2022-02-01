<script setup lang="ts">
  import { Events } from "@/types/global";

  type LiveEventsProps = {
    events: Events[];
  };
  const props = defineProps<LiveEventsProps>();
</script>

<template>
  <div class="bg-white shadow-sm p-4 w-full md:w-1/2">
    <h1 class="font-black mt-4 mb-8">Timeline</h1>
    <div v-if="props.events.length === 0" class="my-4">
      No events in this match.
    </div>
    <div>
      <div v-for="event in props.events" :key="event.id" class="my-5">
        <div class="flex gap-4 items-center mb-1">
          <h1 class="font-black">{{ event.type }}</h1>
          <p class="text-xs bg-gray-200 px-2 py-1 rounded-full">
            {{ event.team?.name }}
          </p>
        </div>
        <p>
          {{
            event.commentary ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis atque eligendi eum labore et quae ex tempore in ipsa, fuga perferendis aspernatur maiores neque a ut possimus accusamus corporis quas."
          }}
        </p>
      </div>
    </div>
  </div>
</template>
