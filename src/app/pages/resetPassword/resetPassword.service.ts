import {api} from 'src/api'

export const ResetPasswordService = async (body: any) => {
  console.log('reset pasword', body.resetToken, body.newPassword)
  const response = await api<Api.Base<{}>>('post')(
    `reset-password`,
    undefined,
    {resetToken: body.resetToken, newPassword: body.newPassword}
  )
  return response.data
}
