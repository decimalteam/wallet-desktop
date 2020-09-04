<template>
  <b-pagination
    v-model="currentPage"
    :total-rows="totalRows"
    :per-page="perPage"
    :aria-controls="ariaControls"
    first-number
    last-number
  >
    <template v-slot:prev-text>
      <svg
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 1L2 7.5L8 14"
          stroke="#7B98F9"
          stroke-width="2"
        />
      </svg>
    </template>
    <template v-slot:next-text>
      <svg
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L7 7.5L1 14"
          stroke="#7B98F9"
          stroke-width="2"
        />
      </svg>
    </template>
  </b-pagination>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss"></style>
