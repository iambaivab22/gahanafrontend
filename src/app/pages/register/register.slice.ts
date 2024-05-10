import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RegisterAccount} from './register.service'

export const RegisterAction = createAsyncThunk(
  'user/login',
  async (
    {
      registerBody,
      onSuccess
    }: {
      registerBody: any
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await RegisterAccount(registerBody)
      console.log(response, 'response from login')
      onSuccess && onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Could not create account!')
    }
  }
)

const initialState: {
  registerLoading?: boolean
} = {
  registerLoading: false
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RegisterAction.pending, (state) => {
      state.registerLoading = true
    })
    builder.addCase(RegisterAction.fulfilled, (state, action) => {
      state.registerLoading = false
    })
    builder.addCase(RegisterAction.rejected, (state) => {
      state.registerLoading = false
    })
  }
})
