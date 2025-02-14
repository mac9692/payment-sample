<script setup lang="ts">
import {useNicePay} from "~/composables/payment/nice-pay";

const payInfo = await useNicePay().getPayInfo()
</script>

<template>
  <div>
    <NicePay
        :pay-info="payInfo"
    />
  </div>
</template>

<style scoped>

</style>