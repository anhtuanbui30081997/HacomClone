import { ParamsDictionary } from 'express-serve-static-core'

export interface AddToCartReqBody {
  product_id: string
  buy_count: number
}

export interface GetPurchasesReqParams extends ParamsDictionary {
  purchase_status: string
}

export interface UpdatePurchaseReqBody {
  product_id: string
  buy_count: number
}

export interface DeletePurchaseReqParam extends ParamsDictionary {
  product_id: string
}
