<script setup lang="ts">
import type {nicePayApproveCommonResponse, nicePayGoPayResponse} from "~/types/nice-pay";
import formDataToObject from "~/utils/common-util";
import {API_ORDER, API_ORDER_PAYMENT, V1} from "~/utils/constants";
import {useNicePay} from "~/composables/payment/nice-pay";

defineProps({
  payInfo: {
    type: Object,
    required: true
  }
})

useHead({
  script: [useNicePay().getNicePayPlugin()]
})

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
    const approveResultForOrderSuccess = useState("approveResult", () => approveResult);
    console.log('approveResultForOrderSuccess', approveResultForOrderSuccess)
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
    merchantKey: payInfo.value.merchantKey
  }

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

const openPopup = () => {
  const popup = window.open(
      "/nicepay/windowopen",
      "PopupWindow",
      "width=600,height=400,left=100,top=100"
  );

  setTimeout(() => {
    if (popup) {
      popup.postMessage({ message: formDataToObject(formRef.value) }, window.location.origin);
    }
  }, 1000);
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
      MerchantKey : <input type="text" name="MerchantKey" :value="payInfo.merchantKey" /><br/>
      SignData : <input type="text" name="SignData" :value="payInfo.signData" /><br/>
      BuyerName : <input type="text" name="BuyerName" :value="payInfo.buyerName" /><br/>
      BuyerTel : <input type="text" name="BuyerTel" :value="payInfo.buyerTel" /><br/>
      BuyerEmail : <input type="text" name="BuyerEmail" :value="payInfo.buyerEmail" /><br/>
      ReturnURL : <input type="text" name="ReturnURL" :value="payInfo.returnURL" /><br/>
      GoodsCl : <input type="text" name="GoodsCl" :value="payInfo.goodsCl" /><br/>
      <button type="submit">결제하기</button>
    </form>
    <button @click="openPopup">결제하기(새창)</button>
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