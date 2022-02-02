<template>
  <div class="load-10">
    <div class="bar"></div>
  </div>
</template>
<style lang="scss" scoped>
  $color: #00e676;

  .bar {
    width: 10px;
    height: 4px;
    border-radius: 2px;
    background-color: $color;
  }

  .load-10 .bar {
    animation: loadingJ 2s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
  }

  @keyframes loadingJ {
    0%,
    100% {
      transform: translate(0, -5px);
    }

    50% {
      transform: translate(30px, -5px);
      width: 15px;
    }
  }
</style>
