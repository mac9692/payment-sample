export interface nicePayGoPayRequest {
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

export interface nicePayGoPayResponse {
    authResultCode: string
    authResultMsg: string
    authToken: string
    payMethod: string
    mid: string
    ediDate: string
    moid: string
    signature: string
    amt: number
    reqReserved: string
    txTid: string
    nextAppURL: string
    netCancelURL: string
}

export interface nicePayApproveRequest {
    TID: string,
    AuthToken: string,
    MID: string,
    Amt: number,
    EdiDate: string,
    SignData: string,
    CharSet?: string,
    EdiType?: string,
    MallReserved?: string
}

export interface nicePayApproveCommonResponse {
    ResultCode: string,
    ResultMsg: string,
    MID?: string,
    Amt?: number,
    Moid?: string,
    Signature?: string,
    BuyerEmail?: string,
    BuyerTel?: string,
    BuyerName?: string,
    GoodsName?: string,
    TID?: string,
    AuthCode?: string,
    AuthDate?: string,
    PayMethod?: string,
    MallReserved?: string
}