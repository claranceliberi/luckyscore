<template>
  <div class="skeleton-loading h-14"></div>
</template>

<script lang="ts">
  interface IProps {
    className: string;
    height: number;
  }

  //   const props = withDefaults(defineProps<IProps>(), {
  //     className: "",
  //     height: 50,
  //   });
</script>

<style scoped>
  .skeleton-loading {
    background-color: blue;
    background-image: linear-gradient(90deg, #eee, #fff, #eee);
    background-size: 200px 100%;
    background-repeat: no-repeat;
    border-radius: 4px;
    display: inline-block;
    line-height: 1;
    width: 100%;
    animation: loadingAnimation 1.5s ease-in-out infinite;
  }

  @keyframes loadingAnimation {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
</style>
