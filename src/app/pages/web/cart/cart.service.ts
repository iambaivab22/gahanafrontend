import {api} from 'src/api'

const getCartListByUserId = async ({userId}: {userId: string}) => {
  const response = await api<Api.Base<any>>('get')(`/cart/${userId}`)
  console.log('from cart service', response.data)
  return response.data
}
export const createCartByUserId = async (body: any, userId: string) => {
  console.log(body, 'b')
  const response = await api<Api.Base<{}>>('post')(
    `/cart/new/${userId}`,
    undefined,
    body
  )
  return response.data
}

export const createOrderByUserId = async (body: any, userId: string) => {
  console.log(body, 'b')
  const response = await api<Api.Base<{}>>('post')(
    `/order/new/${userId}`,
    undefined,
    body
  )
  return response.data
}

const deleteCartByProductId = async (userId: string, productId: string) => {
  //   console.log(bannerName, 'productId from service')
  const response = await api<any>('delete')(`/cart/${productId}`, undefined, {
    userId: userId
  })
}

export const CartService = {
  createCartByUserId,
  deleteCartByProductId,
  getCartListByUserId,
  createOrderByUserId
}
