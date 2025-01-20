import {api} from 'src/api'

export const ResetPasswordService = async (body: any) => {
  const response = await api<Api.Base<{}>>('post')(
    `reset-password`,
    undefined,
    {token: body, newPassword: body.newPassword}
  )
  return response.data
}
