import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {SocialLinkService} from './socialLinks.service'

const getSocialLinksAction = createAsyncThunk(
  'socialLinks/list',
  async (
    {
      onSuccess
    }: {
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await SocialLinkService.getSocialLinks()
      console.log('from slice')
      onSuccess?.(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get Social Links!')
    }
  }
)

const updateSocialLinksAction = createAsyncThunk(
  'socialLinks/udpate',
  async (
    {
      body,
      socialLinksId,
      onSuccess
    }: {
      body: any
      socialLinksId: string
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await SocialLinkService.updateSocialLinks(
        body,
        socialLinksId
      )

      onSuccess && onSuccess?.(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot update Social Links !')
    }
  }
)

const deleteSocialLinksAction = createAsyncThunk(
  'socialLinks/delete',
  async (
    {
      socialLinksId,
      onSuccess
    }: {
      socialLinksId: string
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await SocialLinkService.deleteSocialLinks(socialLinksId)
      onSuccess && onSuccess?.(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot delete Social Links !')
    }
  }
)

const createSocialLinksAction = createAsyncThunk(
  'socialLinks/create',
  async (
    {
      body,
      onSuccess
    }: {
      body: any
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await SocialLinkService.createSocialLinks(body)
      onSuccess && onSuccess?.(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot create Social Links !')
    }
  }
)

interface SocialLinksState {
  socialLinks: {
    socialLinks: {
      instagram: String
      tiktok: String
      facebook: String
    }
    specialSlogan: string

    offerText: string
  }[]
  isGetLoading: boolean
  isCreateLoading: boolean
  isUpdateLoading: boolean
  isDeleteLoading: boolean
}
const initialState: SocialLinksState = {
  socialLinks: [],
  isGetLoading: false,
  isCreateLoading: false,
  isUpdateLoading: false,
  isDeleteLoading: false
}
export const socialLinksSlice = createSlice({
  name: 'socialLinks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSocialLinksAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getSocialLinksAction.fulfilled, (state, action) => {
      state.isGetLoading = false
      state.socialLinks = action.payload as any
    })
    builder.addCase(getSocialLinksAction.rejected, (state) => {
      state.isGetLoading = false
    })

    builder.addCase(updateSocialLinksAction.pending, (state) => {
      state.isGetLoading = true
    })
    builder.addCase(updateSocialLinksAction.fulfilled, (state, action) => {
      state.isUpdateLoading = false
      state.socialLinks = action.payload as any
    })
    builder.addCase(updateSocialLinksAction.rejected, (state) => {
      state.isUpdateLoading = false
    })

    builder.addCase(deleteSocialLinksAction.pending, (state) => {
      state.isDeleteLoading = true
    })
    builder.addCase(deleteSocialLinksAction.fulfilled, (state, action) => {
      state.isDeleteLoading = false
      state.socialLinks = action.payload as any
    })
    builder.addCase(deleteSocialLinksAction.rejected, (state) => {
      state.isDeleteLoading = false
    })

    builder.addCase(createSocialLinksAction.pending, (state) => {
      state.isCreateLoading = true
    })
    builder.addCase(createSocialLinksAction.fulfilled, (state, action) => {
      state.isCreateLoading = false
      state.socialLinks = action.payload as any
    })
    builder.addCase(createSocialLinksAction.rejected, (state) => {
      state.isCreateLoading = false
    })
  }
})
