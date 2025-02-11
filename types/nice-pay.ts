export interface nicePayRequestForGoPay {
    goodsName: string
    amt: number
    mId: string
    ediDate: string
    moid: string
    signData: string
    payMethod: string
    returnURL?: string
    buyerName?: string
    buyerTel?: number
    reqReserved?: string
    buyerEmail?: string
    charSet?: string
    vbankExpDate?: string
    goodsCl?: string
    connWithIframe?: string
}

export interface nicePayResponseForGoPay {
    authResultCode: string
    authResultMsg: string
    authToken: string
    payMethod: string
    mID: string
    moid: string
    signature: string
    amt: number
    reqReserved: string
    txTid: string
    nextAppURL: string
    netCancelURL: string
}