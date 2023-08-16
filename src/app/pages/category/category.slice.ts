import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {categoryService} from './category.service'
import {toast} from 'react-hot-toast'

const getCategoryListAction = createAsyncThunk(
  'category/list',
  async (
    {
      onSuccess
    }: {
      onSuccess: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await categoryService.getCategoryList()
      onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get Category!')
    }
  }
)

const getSubCategoryAction = createAsyncThunk(
  'subCategory/list',
  async (
    {
      onSuccess
    }: {
      onSuccess: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await categoryService.getSubCategory()
      onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get SubCategory!')
    }
  }
)

// const delteProductAction = createAsyncThunk(
//   'product/delete',
//   async (
//     {
//       productId,
//       onSuccess
//     }: {
//       productId: string
//       onSuccess?: (data: any) => void
//     },
//     thunkAPI
//   ) => {
//     console.log(productId, 'productId slice')
//     try {
//       const response = await productService.deleteProduct(productId)
//       onSuccess && onSuccess(response)
//       return response
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Cannot get product!')
//     }
//   }
// )

// const createProductAction = createAsyncThunk(
//   'product/create',
//   async (
//     {
//       productBody,
//       onSuccess
//     }: {
//       productBody: any
//       onSuccess?: (data: any) => void
//     },
//     thunkAPI
//   ) => {
//     try {
//       const response = await productService.createProduct(productBody)
//       onSuccess && onSuccess(response)
//       return response
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Cannot create product!')
//     }
//   }
// )

// const getProductDetailByIdAction = createAsyncThunk(
//   'product/detail',
//   async (
//     {
//       productId
//     }: {
//       productId: string
//     },
//     thunkAPI
//   ) => {
//     try {
//       const response = await productService.getProductDetailById(productId)
//       return response
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Error fetching Product Detail!')
//     }
//   }
// )

// const updateBusinessStatusAction = createAsyncThunk(
//   'business/updateStatus',
//   async (
//     {
//       businessId,
//       isBusinessApproved,
//       callback
//     }: {
//       businessId: number
//       isBusinessApproved: boolean
//       callback?: () => void
//     },
//     thunkAPI
//   ) => {
//     try {
//       const response = await businessService.updateBusinessStatus(
//         businessId,
//         isBusinessApproved
//       )
//       callback && callback()
//       return response
//     } catch (error) {
//       const {message} = error.response.data.data
//       toast.error(message)
//       return thunkAPI.rejectWithValue('Error updating business status')
//     }
//   }
// )

// const updateBusinessTrustedAction = createAsyncThunk(
//   'business/updateTrusted',
//   async (
//     {
//       businessId,
//       isBusinessTrusted,
//       callback
//     }: {
//       businessId: number
//       isBusinessTrusted: boolean
//       callback?: () => void
//     },
//     thunkAPI
//   ) => {
//     try {
//       const response = await businessService.updateBusinessTrusted(
//         businessId,
//         isBusinessTrusted
//       )
//       callback && callback()
//       return response
//     } catch (error) {
//       const {message} = error.response.data.data
//       toast.error(message)
//       return thunkAPI.rejectWithValue('Error updating business status')
//     }
//   }
// )

const initialState: {
  categoryData?: any
  getCategoryLoading?: boolean
  subCategoryData?: any
  getSubCategoryLoading?: boolean
  //   detailLoading: boolean
  //   detail: any
  //   detailSuccess: boolean

  //   updateLoading: boolean

  //   updateTrustLoading: boolean
} = {
  categoryData: undefined,
  getCategoryLoading: false,
  subCategoryData: undefined,
  getSubCategoryLoading: false

  //   detailLoading: false,
  //   detail: undefined,
  //   detailSuccess: false,

  //   updateLoading: false,
  //   updateTrustLoading: false
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryListAction.pending, (state) => {
      state.getCategoryLoading = true
    })
    builder.addCase(getCategoryListAction.fulfilled, (state, action) => {
      state.getCategoryLoading = false
      state.categoryData = action.payload.data
    })
    builder.addCase(getCategoryListAction.rejected, (state) => {
      state.getCategoryLoading = false
    })

    builder.addCase(getSubCategoryAction.pending, (state) => {
      state.getSubCategoryLoading = true
    })
    builder.addCase(getSubCategoryAction.fulfilled, (state, action) => {
      state.getSubCategoryLoading = false
      state.subCategoryData = action.payload.data
    })
    builder.addCase(getSubCategoryAction.rejected, (state) => {
      state.getSubCategoryLoading = false
    })

    // builder.addCase(updateBusinessStatusAction.pending, (state) => {
    //   state.updateLoading = true
    // })
    // builder.addCase(updateBusinessStatusAction.fulfilled, (state) => {
    //   state.updateLoading = false
    // })
    // builder.addCase(updateBusinessStatusAction.rejected, (state) => {
    //   state.updateLoading = false
    // })

    // builder.addCase(updateBusinessTrustedAction.pending, (state) => {
    //   state.updateLoading = true
    // })
    // builder.addCase(updateBusinessTrustedAction.fulfilled, (state) => {
    //   state.updateLoading = false
    // })
    // builder.addCase(updateBusinessTrustedAction.rejected, (state) => {
    //   state.updateLoading = false
    // })
  }
})

export {getCategoryListAction, getSubCategoryAction}
export default productSlice.reducer
