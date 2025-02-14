<script setup lang="ts">
const approveResult = useState("approveResult")
</script>

<template>
  <div>
    <OrderSuccess :order-success-info='approveResult'/>
  </div>
</template>

<style scoped>

</style>