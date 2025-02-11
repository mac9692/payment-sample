<script lang="ts">
import {defineComponent} from "vue";
import Header from "~/components/Header.vue";

export default defineComponent({
  components: {Header}
})
</script>

<template>
  <div>
    <p>EC1</p>
    <Header />
    <slot />
  </div>
</template>

<style scoped>

</style>