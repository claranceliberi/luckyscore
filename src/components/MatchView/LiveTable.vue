<script setup lang="ts">
  interface Team {
    name: string;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsForward: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
  }
  const teams: Array<Team> = [
    {
      name: "Year Three",
      played: 3,
      wins: 1,
      draws: 1,
      losses: 1,
      goalsForward: 1,
      goalsAgainst: 1,
      goalDifference: 1,
      points: 4,
    },
    {
      name: "Welding L2",
      played: 3,
      wins: 1,
      draws: 1,
      losses: 1,
      goalsForward: 1,
      goalsAgainst: 1,
      goalDifference: 1,
      points: 4,
    },
  ];
</script>

<template>
  <div class="bg-white shadow-sm p-4">
    <h1 class="font-black mt-4 mb-8">Live Table</h1>
    <div>
      <div class="flex md:pr-8">
        <div class="flex-1 flex"></div>
        <div class="flex gap-4">
          <div class="w-4 md:w-6 text-center">P</div>
          <div class="w-4 md:w-6 text-center">W</div>
          <div class="w-4 md:w-6 text-center">D</div>
          <div class="w-4 md:w-6 text-center">L</div>
          <div class="w-4 md:w-6 text-center">GF</div>
          <div class="w-4 md:w-6 text-center">GA</div>
          <div class="w-4 md:w-6 text-center">GD</div>
          <div class="w-4 md:w-6 text-center">PTS</div>
        </div>
      </div>
      <div
        v-for="(team, index) in teams"
        :key="team.name"
        class="my-4 pb-4 flex md:pr-8 border-b-2"
      >
        <div class="flex-1 flex">
          <p class="text-black mx-2">{{ index + 1 }}</p>
          <p class="text-black mx-2">{{ team.name }}</p>
        </div>
        <div class="flex gap-4">
          <div class="w-4 md:w-6 text-center">
            {{ team.played }}
          </div>
          <div class="w-4 md:w-6 text-center">
            {{ team.wins }}
          </div>
          <div class="w-4 md:w-6 text-center">
            {{ team.draws }}
          </div>
          <div class="w-4 md:w-6 text-center">
            {{ team.losses }}
          </div>
          <div class="w-4 md:w-6 text-center">
            {{ team.goalsForward }}
          </div>
          <div class="w-4 md:w-6 text-center">
            {{ team.goalsAgainst }}
          </div>
          <div class="w-4 md:w-6 text-center">
            {{ team.goalDifference }}
          </div>
          <div class="w-4 md:w-6 text-center">
            {{ team.points }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
