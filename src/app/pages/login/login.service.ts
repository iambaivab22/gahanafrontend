import {api} from 'src/api'

export const CreateLogin = async (body: any) => {
  const response = await api<Api.Base<{}>>('post')(`login`, undefined, body)
  return response.data
}

export const ForgotPasswordService = async (body: any) => {
  const response = await api<Api.Base<{}>>('post')(
    `forgot-password`,
    undefined,
    {email: body}
  )
  return response.data
}
