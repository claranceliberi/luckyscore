<template>
  <h1 class="font-medium md:py-5">Standings</h1>
  <table class="table-auto w-full mb-10">
    <thead class="text-sm text-[#6C757D] font-medium text-center">
      <tr>
        <th></th>
        <th></th>
        <th>P</th>
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th>GF</th>
        <th>GA</th>
        <th>GD</th>
        <th>PTS</th>
      </tr>
    </thead>
    <tbody class="font-medium text-sm">
      <tr
        v-for="(num, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
        :key="index"
        class="py-10"
      >
        <td>{{ index + 1 }}</td>
        <td>Chelsea {{ index }}</td>
        <td class="text-center">{{ num * 2 }}</td>
        <td class="text-center">{{ num * 3 }}</td>
        <td class="text-center">{{ num * 4 }}</td>
        <td class="text-center">-{{ num * 5 }}</td>
        <td class="text-center">{{ num * 6 }}</td>
        <td class="text-center">{{ num * 7 }}</td>
        <td class="text-center">{{ num * 8 }}</td>
        <td class="text-center">{{ num * 9 }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
  import Vue from "vue";
</script>
