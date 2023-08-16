import {api} from 'src/api'

// MARK: - getbusinesslist
const getCategoryList = async () => {
  const response = await api<Api.Base<any>>('get')('category')
  return response.data
}

// MARK: - getBusinessDetail
const getSubCategory = async () => {
  const response = await api<Api.Base<any>>('get')(`/subCategory`)
  return response.data
}

// MARK: - updateBusinessStatus
// const updateBusinessStatus = async (
//   businessId: number,
//   isBusinessApproved: boolean
// ) => {
//   const response = await api<Api.Base<{}>>('patch')(
//     `/users/${businessId}/approve`,
//     undefined,
//     {isBusinessApproved}
//   )
//   return response.data.data.data
// }

// MARK: - updateBusinessTrusted
// const updateBusinessTrusted = async (
//   businessId: number,
//   isBusinessTrusted: boolean
// ) => {
//   const response = await api<Api.Base<{}>>('patch')(
//     `/users/${businessId}/trusted`,
//     undefined,
//     {isTrusted: isBusinessTrusted}
//   )
//   return response.data.data.data
// }

export const categoryService = {
  getCategoryList,
  getSubCategory
}
