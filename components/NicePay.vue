<script setup lang="ts">
import dayjs from "dayjs";
import encryptSHA256 from "~/utils/encrypt";
import type {nicePayRequestForGoPay} from "~/types/nice-pay";

useHead({
  script: [
    {
      src: 'https://pg-web.nicepay.co.kr/v3/common/js/nicepay-pgweb.js',
      type: 'text/javascript',
      async: true,
    }
  ]
})

const config = useRuntimeConfig()

const payInfo = ref<nicePayRequestForGoPay>({
  goodsName: '테스트 상품',
  amt: 30000,
  mId: config.public.PAYMENT.NICE_PAY.MID,
  ediDate: '',
  moid: config.public.PAYMENT.NICE_PAY.MOID,
  signData: '',
  payMethod: 'CARD',
  returnURL: 'http://localhost:3000/nicepay',
  buyerName: '박진성',
  buyerTel: 36349692,
  reqReserved: '',
  buyerEmail: 'mac9692@nate.com',
  charSet: 'utf-8',
  goodsCl: '1'
})

onMounted(() => {
  payInfo.value = {
    ...payInfo.value,
    ediDate: dayjs().format('YYYYMMDDHHmmss'),
  }
})

const merchantKey = config.public.PAYMENT.NICE_PAY.MERCHANT_KEY
encryptSHA256(payInfo.value.ediDate + payInfo.value.mId + payInfo.value.amt + merchantKey).then((value) => payInfo.value.signData = value)

const formRef = ref<HTMLFormElement | null> (null)
const nicepaySubmit = () => {
  console.log('nicepaySubmit')
}
const nicepayClose = () => {
  console.log('nicepayClose');
}
const submitForm = () => {
  if (formRef.value) {
    console.log('submit', formRef.value)
    window.nicepaySubmit = nicepaySubmit
    window.nicepayClose = nicepayClose
    window.goPay(formRef.value)
  }
}
</script>

<template>
  <div>
    <p>NicePay Sample</p>
    <form
        name="payForm"
        method="post"
        @submit.prevent="submitForm"
        ref="formRef"
        accept-charset="EUC-KR"
    >
      GoodsName : <input type="text" name="GoodsName" :value="payInfo.goodsName"/><br/>
      Amt : <input type="number" name="Amt" :value="payInfo.amt" /><br/>
      MID : <input type="text" name="MID" :value="payInfo.mId" /><br/>
      EdiDate : <input type="text" name="EdiDate" :value="payInfo.ediDate" /><br/>
      Moid : <input type="text" name="Moid" :value="payInfo.moid" /><br/>
      PayMethod : <input type="text" name="PayMethod" :value="payInfo.payMethod" /><br/>
      MerchantKey : <input type="text" name="MerchantKey" :value="merchantKey" /><br/>
      SignData : <input type="text" name="SignData" :value="payInfo.signData" /><br/>
      BuyerName : <input type="text" name="BuyerName" :value="payInfo.buyerName" /><br/>
      BuyerTel : <input type="text" name="BuyerTel" :value="payInfo.buyerTel" /><br/>
      BuyerEmail : <input type="text" name="BuyerEmail" :value="payInfo.buyerEmail" /><br/>
      ReturnURL : <input type="text" name="ReturnURL" :value="payInfo.returnURL" /><br/>
      GoodsCl : <input type="text" name="GoodsCl" :value="payInfo.goodsCl" /><br/>
      <button type="submit">결제하기</button>
    </form>
  </div>
</template>

<style scoped>

</style>