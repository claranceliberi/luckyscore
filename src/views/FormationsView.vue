<template>
  <p class="header">All formations</p>
  <div class="flex flex-col gap-5">
    <div class="w-72">
      <Listbox v-model="selectedFormation">
        <div class="relative mt-1">
          <ListboxButton
            class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          >
            <span class="block truncate">{{ selectedFormation.name }}</span>
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
                v-for="person in people"
                v-slot="{ active, selected }"
                :key="person.name"
                :value="person"
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
                    >{{ person.name }}</span
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
      <FormationCard :formation="selectedFormation.name" />
    </div>
  </div>
</template>

<script lang="ts">
  import { ref } from "vue";
  import FormationCard from "@/components/formations/FormationCard.vue";
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from "@headlessui/vue";
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "FormationsView",
    components: {
      FormationCard,
      Listbox,
      ListboxButton,
      ListboxOptions,
      ListboxOption,
      // CheckIcon,
      // SelectorIcon,
    },

    setup() {
      const people = [
        { name: "4-3-3" },
        { name: "4-4-2" },
        { name: "4-2-3-1" },
        { name: "3-4-3" },
        { name: "4-2-2-2" },
        { name: "3-5-2" },
      ];
      const selectedFormation = ref(people[0]);

      return {
        people,
        selectedFormation,
      };
    },
  });
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

  .header {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 40px;
    text-align: center;
  }
</style>
