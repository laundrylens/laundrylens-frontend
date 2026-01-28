import { env } from '../config'

export interface PaymentReadyRequest {
  planId: string
  orderId: string
  amount: number
}

export interface PaymentReadyResponse {
  success: boolean
  orderId: string
  orderName: string
  amount: number
  customerKey: string
}

export interface PaymentConfirmRequest {
  paymentKey: string
  orderId: string
  amount: number
}

export interface PaymentConfirmResponse {
  success: boolean
  paymentKey: string
  orderId: string
  status: 'DONE' | 'CANCELED' | 'FAILED'
}

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const paymentApi = {
  /**
   * Prepare payment - get order info
   */
  async preparePayment(request: PaymentReadyRequest): Promise<PaymentReadyResponse> {
    // TODO: Replace with actual API call
    // const response = await fetch(`${env.apiBaseUrl}/payment/ready`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(request),
    // })
    // return response.json()

    if (env.isDev) {
      console.log('[paymentApi] preparePayment', request)
    }

    if (!env.isTest) {
      await delay(500)
    }

    return {
      success: true,
      orderId: request.orderId,
      orderName: request.planId === 'basic' ? '베이직 플랜 (월간)' : '프리미엄 플랜 (월간)',
      amount: request.amount,
      customerKey: `customer-${Date.now()}`,
    }
  },

  /**
   * Confirm payment after tosspayments widget success
   */
  async confirmPayment(request: PaymentConfirmRequest): Promise<PaymentConfirmResponse> {
    // TODO: Replace with actual API call
    // const response = await fetch(`${env.apiBaseUrl}/payment/confirm`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(request),
    // })
    // return response.json()

    if (env.isDev) {
      console.log('[paymentApi] confirmPayment', request)
    }

    if (!env.isTest) {
      await delay(1000)
    }

    return {
      success: true,
      paymentKey: request.paymentKey,
      orderId: request.orderId,
      status: 'DONE',
    }
  },
}
