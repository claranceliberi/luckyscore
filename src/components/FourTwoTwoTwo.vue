<script setup lang="ts"></script>

<template>
  <div class="field">
    <div class="large-goal">
      <div class="small-goal">
        <div class="user u1"><span class="p-names">Damour</span></div>
      </div>
    </div>
    <div class="user u2"><span class="p-names">Gershom</span></div>
    <div class="user u3"><span class="p-names">Fredson</span></div>
    <div class="user u4"><span class="p-names">Blessing</span></div>
    <div class="user u5"><span class="p-names">Yassin</span></div>
    <div class="user u6"><span class="p-names">Kenny</span></div>
    <div class="user u7"><span class="p-names">Patrick</span></div>
    <div class="user u8"><span class="p-names">Sage</span></div>
    <div class="user u9"><span class="p-names">Isaac</span></div>
    <div class="user u10"><span class="p-names">Divin</span></div>
    <div class="user u11"><span class="p-names">Liberi</span></div>
    <div class="face-of-goal"></div>
  </div>
</template>

<style scoped>
  .p-names {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    position: relative;
    top: 110%;
  }
  .large-goal {
    width: 40%;
    height: 20%;
    border: 3px solid #fff;
    position: absolute;
    top: 0%;
    left: 30%;
  }

  .small-goal {
    width: 50%;
    height: 55%;
    border: 3px solid #fff;
    position: absolute;
    top: -3%;
    left: 26%;
  }
  .field {
    height: 580px;
    background: #02b65a;
    width: 631px;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    position: relative;
  }

  .user {
    width: 50px;
    height: 50px;
    background-color: #c4c4c4;
    border-radius: 50%;
    position: absolute;
    border: 4px solid #fff;
  }

  .u1 {
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .u2 {
    top: 23%;
    left: 0%;
  }

  .u3 {
    top: 23%;
    right: 0%;
  }
  .u4 {
    top: 23%;
    left: 30%;
  }

  .u5 {
    top: 23%;
    right: 30%;
  }

  .u6 {
    top: 40%;
    left: 15%;
  }

  .u8 {
    top: 40%;
    right: 15%;
  }

  .u7 {
    top: 55%;
    left: 15%;
  }

  .u10 {
    top: 55%;
    right: 15%;
  }

  .u11 {
    bottom: 18%;
    right: 15%;
  }

  .u9 {
    bottom: 18%;
    left: 15%;
  }

  .face-of-goal {
    width: 20%;
    height: 10%;
    border: 3px solid #fff;
    position: absolute;
    bottom: 0.2%;
    left: 40%;
    border-radius: 50% / 100%;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>
