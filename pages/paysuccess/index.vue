<script lang="ts">
import {defineComponent} from 'vue'
import PaySuccess from "#components";

export default defineComponent({
  name: "index",
  components: {PaySuccess}
})
</script>

<template>
  <div>
    <pay-success />
  </div>
</template>

<style scoped>

</style>