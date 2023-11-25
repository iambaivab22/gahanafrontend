import {api} from 'src/api'

// MARK: - getbusinesslist
const getCategoryList = async () => {
  const response = await api<Api.Base<any>>('get')('category')
  return response.data
}

const getCategoryDetailById = async (categoryId: string) => {
  const response = await api<Api.Base<any>>('get')(`/category/${categoryId}`)
  return response.data
}

const getSubCategoryList = async () => {
  console.log('response data from service')
  const response = await api<Api.Base<any>>('get')('subCategory')

  return response.data
}

// MARK: - getBusinessDetail

const deleteCategory = async (categoryId: string) => {
  const response = await api<any>('delete')(`/category/${categoryId}`)
}

const updateCategory = async (body: any, categoryId: string) => {
  const response = await api<Api.Base<{}>>('patch')(
    `/category/${categoryId}`,
    undefined,
    body
  )
  return response.data
}

const createCategory = async (body: any) => {
  const response = await api<Api.Base<{}>>('post')(
    `/category/new`,
    undefined,
    body
  )
  return response.data
}

const createSubCategory = async (body: any) => {
  const response = await api<Api.Base<{}>>('post')(
    `/subCategory/new`,
    undefined,
    body
  )
  return response.data
}

const addSubCategorytoCategory = async (
  body: any,
  subCategoryId: string | number
) => {
  const response = await api<Api.Base<{}>>('post')(
    `/subCategory/${subCategoryId}`
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

const deleteSubCategory = async (subCategoryId: string) => {
  const response = await api<any>('delete')(`/subCategory/${subCategoryId}`)
}

export const categoryService = {
  getCategoryList,
  deleteCategory,
  updateCategory,
  createCategory,
  createSubCategory,
  addSubCategorytoCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryList,
  getCategoryDetailById
}
