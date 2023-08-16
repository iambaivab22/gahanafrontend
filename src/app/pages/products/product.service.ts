import {api} from 'src/api'

// MARK: - getProductlist
const getProductList = async () => {
  const response = await api<any>('get')('/product')
  return response.data
}

const deleteProduct = async (productId: string) => {
  console.log(productId, 'productId from service')
  const response = await api<any>('delete')(`/product/${productId}`)
}

// MARK: - getProductDetail
const getProductDetailById = async (productId: string) => {
  const response = await api<Api.Base<any>>('get')(`/product/${productId}`)
  return response.data
}

const getProductListByCategoryId = async (categoryId: string) => {
  const response = await api<Api.Base<any>>('get')(
    `/product/category/${categoryId}`
  )
  return response.data
}

// MARK: - createProduct
const createProduct = async (body: any) => {
  const response = await api<Api.Base<{}>>('post')(
    `/product/new`,
    undefined,
    body
  )
  return response.data
}

const updateProduct = async (body: any, productId: string) => {
  console.log(body, 'bodyyyyy from update')
  const response = await api<Api.Base<{}>>('patch')(
    `/product/${productId}`,
    undefined,
    body
  )
  return response.data
}

// MARK: - updateBusinessTrusted
const updateBusinessTrusted = async (
  businessId: number,
  isBusinessTrusted: boolean
) => {
  const response = await api<Api.Base<{}>>('patch')(
    `/users/${businessId}/trusted`,
    undefined,
    {isTrusted: isBusinessTrusted}
  )
  return response.data.data.data
}

export const productService = {
  getProductList,
  deleteProduct,
  getProductDetailById,
  createProduct,
  getProductListByCategoryId,
  updateProduct
}
