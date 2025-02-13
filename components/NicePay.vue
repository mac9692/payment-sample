<script setup lang="ts">
import dayjs from "dayjs";
import encryptSHA256 from "~/utils/encrypt";
import type {nicePayApproveCommonResponse, nicePayGoPayRequest, nicePayGoPayResponse} from "~/types/nice-pay";
import formDataToObject from "~/utils/common-util";
import {API_ORDER, API_ORDER_PAYMENT, V1} from "~/utils/constants";
import {useNicePay} from "~/composables/payment/nice-pay";

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

const payInfo = ref<nicePayGoPayRequest>({
  goodsName: '테스트 상품',
  amt: 100,
  mId: config.public.PAYMENT.NICE_PAY.MID,
  ediDate: dayjs().format('YYYYMMDDHHmmss'),
  moid: 'mnoid1234567890',
  signData: '',
  payMethod: 'CARD',
  returnURL: 'http://localhost:3000/ordersuccess',
  buyerName: '박진성',
  buyerTel: 36349692,
  reqReserved: '',
  buyerEmail: 'mac9692@nate.com',
  charSet: 'utf-8',
  goodsCl: '1'
})

const merchantKey = config.public.PAYMENT.NICE_PAY.MERCHANT_KEY
encryptSHA256(payInfo.value.ediDate + payInfo.value.mId + payInfo.value.amt + merchantKey).then((value) => payInfo.value.signData = value)

const formRef = ref<HTMLFormElement | null> (null)
const paymentResponse = ref<nicePayGoPayResponse | null>(null)
const paymentApproveResponse = ref<nicePayApproveCommonResponse | null>(null)

const approveNicePay = async (request) => {
  const response = await useApi().post(API_ORDER + V1 + API_ORDER_PAYMENT + '/approveNicePay', request)
  paymentApproveResponse.value = response?.payload

  approveNicePayAfterProcess(paymentApproveResponse.value)
}

const approveNicePayAfterProcess = (approveResult: nicePayApproveCommonResponse) => {
  if (!approveResult) {
    return
  }

  if (useNicePay().isSuccessResult(approveResult.ResultCode)) {
    useState("approveResult", () => approveResult);
    navigateTo('/ordersuccess')
  }
}

const nicepaySubmit = () => {
  const returnObject = formDataToObject(formRef.value)

  window.deleteLayer()
  paymentResponse.value = {
    authResultCode: returnObject.AuthResultCode,
    authResultMsg: returnObject.AuthResultMsg,
    authToken: returnObject.AuthToken,
    payMethod: returnObject.PayMethod,
    mid: returnObject.MID,
    ediDate: returnObject.EdiDate,
    moid: returnObject.Moid,
    signature: returnObject.Signature,
    amt: returnObject.Amt,
    reqReserved: '가맹점 여분 필드',
    txTid: returnObject.TxTid,
    nextAppURL: returnObject.NextAppURL,
    netCancelURL: returnObject.NetCancelURL,
    merchantKey: merchantKey
  }

  // paymentResponse.value = {
  //   authResultCode: '0000',
  //   authResultMsg: "인증 성공",
  //   authToken: "NICETOKNABFE2C95D2BC739F2BC53ADF49E1CB7D",
  //   payMethod: "CARD",
  //   mid: "nicepay00m",
  //   ediDate: payInfo.value.ediDate,
  //   moid: "mnoid1234567890",
  //   signature: "e6a4291f3fc848a95164ebc0deae2f641b565853036161edd63f1201b2349a6b",
  //   amt: 100,
  //   reqReserved: '가맹점 여분 필드',
  //   txTid: "nicepay00m01012502121529334718",
  //   nextAppURL: "https://dc1-api.nicepay.co.kr/webapi/pay_process.jsp",
  //   netCancelURL: "https://dc1-api.nicepay.co.kr/webapi/cancel_process.jsp",
  // merchantKey: merchantKey
  // }

  approveNicePay(paymentResponse.value)
};
const nicepayClose = () => console.log('nicepayClose')
const submitForm = () => {
  if (formRef.value) {
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
    <div v-if="paymentResponse">
      <br/>
      <br/>
      <h1>인증창 반환값</h1>
      <p>{{ paymentResponse }}</p>
    </div>
    <div v-if="paymentApproveResponse">
      <br/>
      <br/>
      <h1>승인 요청 반환값</h1>
      <p>{{ paymentApproveResponse }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>