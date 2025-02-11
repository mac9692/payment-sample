<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Header"
})
</script>

<template>
  <div>
    <NuxtLink to="/inicis">inicis</NuxtLink><br />
    <NuxtLink to="/nicepay">nicePay</NuxtLink>
  </div>
</template>

<style scoped>

</style>