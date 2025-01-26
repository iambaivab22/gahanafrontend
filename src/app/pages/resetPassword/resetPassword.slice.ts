import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ResetPasswordService} from './resetPassword.service'

export const ResetPasswordAction = createAsyncThunk(
  'user/reset-password',
  async (
    {
      loginBody,
      onSuccess
    }: {
      loginBody: any
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await ResetPasswordService(loginBody)
      console.log(response, 'response from login')
      onSuccess && onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot Reset Password!')
    }
  }
)

const initialState: {
  resetPasswordLoading?: boolean
} = {
  resetPasswordLoading: false
}

const resetPasswordSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ResetPasswordAction.pending, (state) => {
      state.resetPasswordLoading = true
    })
    builder.addCase(ResetPasswordAction.fulfilled, (state, action) => {
      state.resetPasswordLoading = false
    })
    builder.addCase(ResetPasswordAction.rejected, (state) => {
      state.resetPasswordLoading = false
    })
  }
})

export default resetPasswordSlice.reducer
