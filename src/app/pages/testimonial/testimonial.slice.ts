import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {testimonialService} from './testimonial.service'
import {toast} from 'react-hot-toast'

const getTestimonialListAction = createAsyncThunk(
  'testimonial/list',
  async (
    {
      onSuccess
    }: {
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await testimonialService.getTestimonialList()
      onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get Testimonial!')
    }
  }
)

const updateTestimonialAction = createAsyncThunk(
  'testimonial/udpate',
  async (
    {
      testimonialBody,
      testimonialId,
      onSuccess
    }: {
      testimonialBody: any
      testimonialId: string
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await testimonialService.updateTestimonial(
        testimonialBody,
        testimonialId
      )
      onSuccess && onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot update Testimonial!')
    }
  }
)

// const getSubCategoryDetailByIdAction = createAsyncThunk(
//   'subCategory/detail',
//   async (
//     {
//       subCategoryId
//     }: {
//       subCategoryId: string
//     },
//     thunkAPI
//   ) => {
//     console.log('getproduct detail by id called')
//     try {
//       const response = await subCategoryService.getSubCategoryDetailById(
//         subCategoryId
//       )
//       return response
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Error fetching Sub Category Detail!')
//     }
//   }
// )

const createTestimonialAction = createAsyncThunk(
  'testimonial/create',
  async (
    {
      subCategoryBody,
      onSuccess
    }: {
      subCategoryBody: any
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await testimonialService.createTestimonial(
        subCategoryBody
      )
      onSuccess && onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot create Testimonial!')
    }
  }
)

const deleteTestimonialAction = createAsyncThunk(
  'subCategory/delete',
  async (
    {
      testimonialId,
      onSuccess
    }: {
      testimonialId: string
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await testimonialService.deleteTestimonial(testimonialId)
      onSuccess && onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get Testimonial!')
    }
  }
)

const initialState: {
  getTestimonialLoading?: boolean
  testimonialData?: any
  // subCategoryDetailData?: any
  // subCategoryDetailDataLoading?: boolean

  deleteTestimonialLoading?: boolean
  createTestimonialLoading?: boolean
  updateTestimonialLoading?: boolean
} = {
  getTestimonialLoading: false,
  testimonialData: undefined,
  // subCategoryDetailData: undefined,

  deleteTestimonialLoading: false,
  createTestimonialLoading: false,
  updateTestimonialLoading: false
}

const testimonialSlice = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTestimonialListAction.pending, (state) => {
      state.getTestimonialLoading = true
    })
    builder.addCase(getTestimonialListAction.fulfilled, (state, action) => {
      state.getTestimonialLoading = false
      state.testimonialData = action.payload.data
    })
    builder.addCase(getTestimonialListAction.rejected, (state) => {
      state.getTestimonialLoading = false
    })

    // builder.addCase(getSubCategoryDetailByIdAction.pending, (state) => {
    //   state.subCategoryDetailDataLoading = true
    // })
    // builder.addCase(
    //   getSubCategoryDetailByIdAction.fulfilled,
    //   (state, action) => {
    //     state.subCategoryDetailDataLoading = false
    //     state.subCategoryDetailData = action.payload.data
    //   }
    // )
    // builder.addCase(getSubCategoryDetailByIdAction.rejected, (state) => {
    //   state.subCategoryDetailDataLoading = false
    // })

    builder.addCase(deleteTestimonialAction.pending, (state) => {
      state.deleteTestimonialLoading = true
    })
    builder.addCase(deleteTestimonialAction.fulfilled, (state, action) => {
      state.deleteTestimonialLoading = false
    })
    builder.addCase(deleteTestimonialAction.rejected, (state) => {
      state.deleteTestimonialLoading = false
    })

    builder.addCase(createTestimonialAction.pending, (state) => {
      state.createTestimonialLoading = true
    })
    builder.addCase(createTestimonialAction.fulfilled, (state, action) => {
      state.createTestimonialLoading = false
    })
    builder.addCase(createTestimonialAction.rejected, (state) => {
      state.createTestimonialLoading = false
    })

    builder.addCase(updateTestimonialAction.pending, (state) => {
      state.updateTestimonialLoading = true
    })
    builder.addCase(updateTestimonialAction.fulfilled, (state, action) => {
      state.updateTestimonialLoading = false
    })
    builder.addCase(updateTestimonialAction.rejected, (state) => {
      state.updateTestimonialLoading = false
    })
  }
})

export {
  getTestimonialListAction,
  deleteTestimonialAction,
  updateTestimonialAction,
  createTestimonialAction
  // getSubCategoryDetailByIdAction
}
export default testimonialSlice.reducer
