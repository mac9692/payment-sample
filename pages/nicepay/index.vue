<script lang="ts">
import {defineComponent} from 'vue'
import {NicePay} from "#components";

export default defineComponent({
  name: "index",
  components: {NicePay}
})
</script>

<template>
  <div>
    <nice-pay />
  </div>
</template>

<style scoped>

</style>