import {api} from 'src/api'

const getShopByBudgetList = async () => {
  const response = await api<Api.Base<any>>('get')('/shopByBudget')
  return response.data
}
export const createShopByBudget = async (body: any) => {
  //   console.log(body, 'body from servie')
  console.log(body, 'b')
  const response = await api<Api.Base<{}>>('post')(
    `/shopByBudget/new`,

    undefined,
    body
  )
  return response.data
}

const deleteShopByBudget = async (shopByBudgetId: string) => {
  //   console.log(bannerName, 'productId from service')
  const response = await api<any>('delete')(`/shopByBudget/${shopByBudgetId}`)
}

export const ShopByBudgetService = {
  createShopByBudget,
  getShopByBudgetList,
  deleteShopByBudget
}
