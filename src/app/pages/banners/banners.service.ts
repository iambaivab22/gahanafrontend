import {api} from 'src/api'

const getBannerList = async () => {
  const response = await api<Api.Base<any>>('get')('banner')
  return response.data
}
export const createBanner = async (body: any) => {
  console.log(body, 'body from servie')
  const response = await api<Api.Base<{}>>('post')(
    `/banner/new`,
    undefined,
    body
  )
  return response.data
}

const deleteBannerImages = async (bannerName: string) => {
  console.log(bannerName, 'productId from service')
  const response = await api<any>('delete')(`/banner/${bannerName}`)
}

export const BannerService = {
  createBanner,
  getBannerList,
  deleteBannerImages
}
