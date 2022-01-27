<script setup lang="ts">
  interface MatchEvent {
    id: number;
    name: string;
    type: string;
  }
  interface Props {
    eventsData: Array<MatchEvent>;
  }
  const eventProps = defineProps<Props>();
</script>

<template>
  <div class="bg-white shadow-sm p-4 mt-28 w-3/5 lg:w-3/4">
    <h1 class="font-black mt-4 mb-4">Match Events</h1>

    <div>
      <div v-for="event in eventProps.eventsData" :key="event.id">
        <h1 class="font-black mb-1 mt-4">{{ event.type }}</h1>
        <p>{{ event.name }}</p>
      </div>
    </div>
  </div>
</template>
