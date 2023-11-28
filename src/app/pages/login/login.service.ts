import {api} from 'src/api'

export const CreateLogin = async (body: any) => {
  const response = await api<Api.Base<{}>>('post')(
    `/user/login`,
    undefined,
    body
  )
  return response.data
}
