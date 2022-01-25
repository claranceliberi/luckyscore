<script lang="ts" setup>
  import { ILink } from "~/types/global";

  interface Props {
    links: ILink[];
  }
  const props = defineProps<Props>();
</script>

<template>
  <div>
    <div class="subnav bg-primary rounded px-4 mt-16 text-white">
      <div class="py-2">
        <slot></slot>
      </div>
      <div class="links">
        <ul class="flex text-white space-x-10 py-2">
          <li
            v-for="(link, i) in props.links"
            :key="i"
            :class="`${i < 1 ? 'home' : 'link'}`"
          >
            <router-link :to="link.href"> {{ link.name }} </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .links {
    .home {
      .router-link-exact-active {
        @apply text-white border-b-2 border-white pb-2;
      }
      .link {
        .router-link-active {
          @apply text-white border-b-2 border-white pb-4;
        }
      }
    }
  }
</style>
