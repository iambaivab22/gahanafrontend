import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {CreateLogin} from './login.service'

export const LoginAction = createAsyncThunk(
  'user/login',
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
      const response = await CreateLogin(loginBody)
      console.log(response, 'response from login')
      onSuccess && onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot Login!')
    }
  }
)

const initialState: {
  loginLoading?: boolean
} = {
  loginLoading: false
}

const subCategorySlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LoginAction.pending, (state) => {
      state.loginLoading = true
    })
    builder.addCase(LoginAction.fulfilled, (state, action) => {
      state.loginLoading = false
    })
    builder.addCase(LoginAction.rejected, (state) => {
      state.loginLoading = false
    })
  }
})
