import {api} from 'src/api'

const getSubCategoriesList = async () => {
  const response = await api<Api.Base<any>>('get')('subCategory')
  return response.data
}

const getSubCategoryDetailById = async (subCategoryId: string) => {
  console.log(subCategoryId, 'from service subcategoryUd')
  const response = await api<Api.Base<any>>('get')(
    `subCategory/${subCategoryId}`
  )
  return response.data
}

const updateSubCategory = async (body: any, subCategoryId: string) => {
  const response = await api<Api.Base<{}>>('patch')(
    `/subCategory/${subCategoryId}`,
    undefined,
    body
  )
  return response.data
}

// const getSubCategoriesList = async () => {
//   console.log('it is called subcateogr')
//   const response = await api<Api.Base<any>>('get')(`/subCategory`)
//   return response.data
// }

const deleteSubCategory = async (subCategoryId: string) => {
  const response = await api<any>('delete')(`/subCategory/${subCategoryId}`)
}

const createSubCategory = async (body: any) => {
  const response = await api<Api.Base<{}>>('post')(
    `/subCategory/new`,
    undefined,
    body
  )
  return response.data
}

export const subCategoryService = {
  getSubCategoriesList,
  getSubCategoryDetailById,
  deleteSubCategory,
  createSubCategory,
  updateSubCategory
}
