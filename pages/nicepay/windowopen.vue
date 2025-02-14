<script setup lang="ts">
import {useNicePay} from "~/composables/payment/nice-pay"

definePageMeta({
  layout: false
});

const payInfo = await useNicePay().getPayInfo()

const receivedMessage = ref({});

onMounted(() => {
  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) return;
    console.log('event.data.message', event.data.message)
    receivedMessage.value = event.data.message;
  });
});
</script>

<template>
  <div>
    <NicePayWithWindowOpen
        :pay-info="payInfo"
    />
    <p>{{ receivedMessage }}</p>
  </div>
</template>

<style scoped>

</style>