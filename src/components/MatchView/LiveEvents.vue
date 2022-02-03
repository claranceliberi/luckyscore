<script setup lang="ts">
  import { Events, IEventType } from "@/types/global";

  type LiveEventsProps = {
    events: Events[];
  };
  const props = defineProps<LiveEventsProps>();
</script>

<template>
  <div
    class="bg-white flex justify-center text-gray-700 shadow-sm p-4 w-full md:w-1/2"
  >
    <div>
      <h1 class="font-black mt-4 mb-8">Timeline</h1>
      <div v-if="props.events.length === 0" class="my-4">
        No events in this match.
      </div>
      <div>
        <div v-for="event in props.events" :key="event.id">
          <div class="w-[25rem] my-4 rounded-lg border-2">
            <div class="flex justify-between border-b-2 p-2 py-4">
              <div class="flex items-center">
                <img
                  v-if="event.type === IEventType.GOAL"
                  class="max-w-6 max-h-6"
                  src="@/assets/icons/images/goal.png"
                  :alt="event.type"
                />
                <img
                  v-else-if="event.type === IEventType.SHOT"
                  class="max-w-6 max-h-6"
                  src="@/assets/icons/images/free-kick.png"
                  :alt="event.type"
                />
                <img
                  v-else-if="event.type === IEventType.FOUL"
                  class="max-w-6 max-h-6"
                  src="@/assets/icons/images/foul.png"
                  :alt="event.type"
                />
                <img
                  v-else-if="event.type === IEventType.CORNER"
                  class="max-w-6 max-h-6"
                  src="@/assets/icons/images/corner-kick.png"
                  :alt="event.type"
                />
                <img
                  v-else-if="event.type === IEventType.RED_CARD"
                  class="max-w-6 max-h-6"
                  src="@/assets/icons/images/red.png"
                  :alt="event.type"
                />
                <img
                  v-else-if="event.type === IEventType.YELLOW_CARD"
                  class="max-w-6 max-h-6"
                  src="@/assets/icons/images/yellow.png"
                  :alt="event.type"
                />
                <h1 class="ml-3">
                  <span class="font-bold">{{ event.type + "  " }}</span>
                  <span class="font-medium"
                    >by {{ " " + event.player.full_name }}</span
                  >
                </h1>
              </div>
              <div class="font-bold text-gray-600">70'</div>
            </div>
            <div v-if="event.event_image_url" class="flex justify-center pb-2">
              <img
                class="w-full"
                :src="event.event_image_url"
                :alt="event.commentary"
              />
            </div>
            <p
              class="w-fit text-white bg-gray-500 my-2 ml-2 text-sm rounded-full px-4"
            >
              {{ event.team.name }}
            </p>
            <p class="text-gray-600 font-medium px-2">{{ event.commentary }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
