import {NICE_PAY} from "~/utils/constants/payment-constants";
import dayjs from "dayjs";
import encryptSHA256 from "~/utils/encrypt";

export const useNicePay = () => {

    const config = useRuntimeConfig()

    const isSuccessResult = (resultCode: string): boolean => {
        return [
            NICE_PAY.CREDIT_CARD_SUCCESS,
            NICE_PAY.REAL_TIME_ACCOUNT_TRANSFER_SUCCESS,
            NICE_PAY.VIRTUAL_ACCOUNT_SUCCESS,
            NICE_PAY.MOBILE_PAY_SUCCESS,
            NICE_PAY.CASH_RECEIPT_SUCCESS
        ].includes(resultCode)
    }

    const getPayInfo = async () => {
        const merchantKey = config.public.PAYMENT.NICE_PAY.MERCHANT_KEY

        const result = {
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
            goodsCl: '1',
            merchantKey
        }

        result.signData = await encryptSHA256(result.ediDate + result.mId + result.amt + merchantKey)

        return result
    }

    const getNicePayPlugin = () => {
        return {
            src: 'https://pg-web.nicepay.co.kr/v3/common/js/nicepay-pgweb.js',
            type: 'text/javascript',
            async: true,
        }
    }

    return {isSuccessResult, getPayInfo, getNicePayPlugin}
}