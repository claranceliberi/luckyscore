<template>
  <p class="header">All formations</p>
  <div class="flex flex-col gap-5">
    <div class="w-72">
      <Listbox v-model="selectedFormation">
        <div class="relative mt-1">
          <ListboxButton
            class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          >
            <span class="block truncate">{{ selectedFormation }}</span>
            <span
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <!-- <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" /> -->
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                v-for="form in formations"
                v-slot="{ active, selected }"
                :key="form"
                :value="form"
                as="template"
              >
                <li
                  :class="[
                    active ? 'text-amber-900 bg-amber-100' : 'text-gray-900',
                    'cursor-default select-none relative py-2 pl-10 pr-4',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]"
                    >{{ form }}</span
                  >
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                  >
                    <!-- <CheckIcon class="w-5 h-5" aria-hidden="true" /> -->
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
    <div class="forms">
      <div class="card">
        <FormationCard
          :formation="selectedFormation"
          :match-id="matchId"
          :team="team"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import FormationCard from "@/components/formations/FormationCard.vue";
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from "@headlessui/vue";

  const formations = ["4-3-3", "4-4-2", "4-2-3-1", "3-4-3", "4-2-2-2", "3-5-2"];
  const matchId = "d0e59e83-30c3-43d9-b032-b311f66295e8";
  const selectedFormation = ref("3-5-2");
  const team = "3d2e2bee-503a-4ce0-93bc-4223ce84417c";
</script>

<style scoped>
  .forms {
    gap: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  .card {
    width: 631px;
  }

  .header {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 40px;
    text-align: center;
  }
</style>
