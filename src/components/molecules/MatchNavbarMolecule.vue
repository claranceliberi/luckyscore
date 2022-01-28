<script lang="ts" setup>
  interface Props {
    team1: string;
    team2: string;
    date: Date;
    score: string;
    isFinished: boolean;
    live: boolean;
    dashboard?: boolean;
  }
  const matchNavbarprops = withDefaults(defineProps<Props>(), {
    isFinished: false,
    live: false,
    dashboard: false,
    score: "0-0",
    date: undefined,
    team1: "",
    team2: "",
  });
</script>

<template>
  <div
    :class="`w-full ${
      matchNavbarprops.dashboard ? 'mt-8' : 'mt-16'
    } flex justify-center`"
  >
    <div
      :class="`w-full ${
        matchNavbarprops.dashboard ? '' : 'md:w-3/5'
      } bg-primary flex gap-6 md:gap-24 justify-center py-10 rounded`"
    >
      <div class="flex flex-col items-center gap-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 5.75C3 5.55109 3.07902 5.36032 3.21967 5.21967C3.36032 5.07902 3.55109 5 3.75 5C6.413 5 9.008 4.057 11.55 2.15C11.6798 2.05263 11.8377 2 12 2C12.1623 2 12.3202 2.05263 12.45 2.15C14.992 4.057 17.587 5 20.25 5C20.4489 5 20.6397 5.07902 20.7803 5.21967C20.921 5.36032 21 5.55109 21 5.75V11C21 16.001 18.042 19.676 12.275 21.948C12.0983 22.0176 11.9017 22.0176 11.725 21.948C5.958 19.676 3 16 3 11V5.75Z"
            fill="white"
          />
        </svg>
        <p class="text-white text-lg">{{ matchNavbarprops.team1 }}</p>
      </div>
      <div class="flex flex-col items-center gap-1 text-lg text-white">
        <h1>
          {{
            matchNavbarprops.isFinished || matchNavbarprops.live
              ? matchNavbarprops.score
              : matchNavbarprops.date?.toLocaleDateString()
          }}
        </h1>
        <p class="text-gray-400">
          {{
            matchNavbarprops.live
              ? "Live"
              : matchNavbarprops.isFinished
              ? "Full Time"
              : matchNavbarprops.date?.toLocaleTimeString()
          }}
        </p>
      </div>
      <div class="flex flex-col items-center gap-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 5.75C3 5.55109 3.07902 5.36032 3.21967 5.21967C3.36032 5.07902 3.55109 5 3.75 5C6.413 5 9.008 4.057 11.55 2.15C11.6798 2.05263 11.8377 2 12 2C12.1623 2 12.3202 2.05263 12.45 2.15C14.992 4.057 17.587 5 20.25 5C20.4489 5 20.6397 5.07902 20.7803 5.21967C20.921 5.36032 21 5.55109 21 5.75V11C21 16.001 18.042 19.676 12.275 21.948C12.0983 22.0176 11.9017 22.0176 11.725 21.948C5.958 19.676 3 16 3 11V5.75Z"
            fill="white"
          />
        </svg>
        <p class="text-white text-lg">{{ matchNavbarprops.team2 }}</p>
      </div>
    </div>
  </div>
</template>
