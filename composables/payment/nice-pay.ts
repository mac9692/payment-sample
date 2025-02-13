import {NICE_PAY} from "~/utils/constants/payment-constants";

export const useNicePay = () => {

    const isSuccessResult = (resultCode: string): boolean => {
        return [
            NICE_PAY.CREDIT_CARD_SUCCESS,
            NICE_PAY.REAL_TIME_ACCOUNT_TRANSFER_SUCCESS,
            NICE_PAY.VIRTUAL_ACCOUNT_SUCCESS,
            NICE_PAY.MOBILE_PAY_SUCCESS,
            NICE_PAY.CASH_RECEIPT_SUCCESS
        ].includes(resultCode)
    }

    return {isSuccessResult}
}