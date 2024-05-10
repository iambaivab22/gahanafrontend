import {api} from 'src/api'

export const RegisterAccount = async (body: any) => {
  const response = await api<Api.Base<{}>>('post')(
    `/user/register`,
    undefined,
    body
  )
  return response.data
}
