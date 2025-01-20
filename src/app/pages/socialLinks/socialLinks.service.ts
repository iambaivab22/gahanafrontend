import {api} from 'src/helpers'

const getSocialLinks = async () => {
  const response = await api<Api.Base<any>>('get')(`/socialLinks`)
  console.log('from cart service', response.data)
  return response.data
}

const createSocialLinks = async (body: any) => {
  const response = await api<Api.Base<any>>('post')(`/socialLinks`, body)
  return response.data
}

const deleteSocialLinks = async (socialLinksId: string) => {
  const response = await api<any>('delete')(`/socialLinks/${socialLinksId}`)
}

const updateSocialLinks = async (body: any, socialLinksId: string) => {
  const response = await api<Api.Base<{}>>('patch')(
    `/socialLinks/${socialLinksId}`,
    undefined,
    body
  )
  return response.data
}
export const SocialLinkService = {
  getSocialLinks,
  createSocialLinks,
  updateSocialLinks,
  deleteSocialLinks
}
