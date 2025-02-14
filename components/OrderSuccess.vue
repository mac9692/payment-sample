<script setup lang="ts">
defineProps({
  orderSuccessInfo: {
    type: Object,
    required: true
  }
});

const state = useNuxtApp().payload.state
</script>

<template>
  <div>
    <h1>주문 완료</h1>
    <p>결제승인정보</p>
    <p>{{ orderSuccessInfo }}</p>
    <p>State 저장 값(새로고침 시 휘발)</p>
    <p>{{state}}</p>
  </div>
</template>

<style scoped>

</style>