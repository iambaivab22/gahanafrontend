import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {productService} from './product.service'
import {toast} from 'react-hot-toast'

const getProductListAction = createAsyncThunk(
  'product/list',
  async (
    {
      onSuccess
    }: {
      onSuccess?: (data: Api.BusinessList) => void
    },
    thunkAPI
  ) => {
    try {
      const response = await productService.getProductList()
      onSuccess?.(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get product!')
    }
  }
)

const delteProductAction = createAsyncThunk(
  'product/delete',
  async (
    {
      productId,
      onSuccess
    }: {
      productId: string
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    console.log(productId, 'productId slice')
    try {
      const response = await productService.deleteProduct(productId)
      onSuccess && onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get product!')
    }
  }
)

const delteProductImageAction = createAsyncThunk(
  'productImage/delete',
  async (
    {
      productId,
      imageId,
      onSuccess
    }: {
      productId: string
      imageId: string
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      console.log('productIMages slice', productId)
      const response = await productService.deleteProductImages(
        productId,
        imageId
      )
      onSuccess && onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot delete product image!')
    }
  }
)
const createProductAction = createAsyncThunk(
  'product/create',
  async (
    {
      productBody,
      onSuccess
    }: {
      productBody: any
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      console.log(productBody, 'productBody create')
      const response = await productService.createProduct(productBody)
      onSuccess && onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot create product!')
    }
  }
)

const updateProductAction = createAsyncThunk(
  'product/udpate',
  async (
    {
      productBody,
      productId,
      onSuccess
    }: {
      productBody: any
      productId: string
      onSuccess?: (data: any) => void
    },
    thunkAPI
  ) => {
    try {
      console.log(productBody, 'productBody')
      const response = await productService.updateProduct(
        productBody,
        productId
      )
      onSuccess && onSuccess(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot update product!')
    }
  }
)

const getProductDetailByIdAction = createAsyncThunk(
  'product/detail',
  async (
    {
      productId
    }: {
      productId: string
    },
    thunkAPI
  ) => {
    console.log('getproduct detail by id called')
    try {
      const response = await productService.getProductDetailById(productId)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching Product Detail!')
    }
  }
)

const getProductListByCategoryIdAction = createAsyncThunk(
  'product/category',
  async (
    {
      categoryId
    }: {
      categoryId: string
    },
    thunkAPI
  ) => {
    try {
      const response = await productService.getProductListByCategoryId(
        categoryId
      )
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching Product List by Category')
    }
  }
)

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
  loading: boolean
  data?: Api.productList[]
  success: boolean
  deleteProductLoading: boolean
  productDetailData?: any
  productDetailLoading?: boolean
  createProductLoading?: boolean
  updateProductLoading?: boolean
  deleteProductImageLoading?: boolean
  //   detailLoading: boolean
  //   detail: any
  //   detailSuccess: boolean

  //   updateLoading: boolean

  //   updateTrustLoading: boolean
} = {
  loading: false,
  data: undefined,
  success: false,
  deleteProductLoading: false,
  createProductLoading: false,
  updateProductLoading: false,
  deleteProductImageLoading: false

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
    builder.addCase(getProductListAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProductListAction.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload.data
      state.success = true
    })
    builder.addCase(getProductListAction.rejected, (state) => {
      state.loading = false
      state.success = false
    })

    builder.addCase(getProductDetailByIdAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProductDetailByIdAction.fulfilled, (state, action) => {
      state.productDetailLoading = false
      state.productDetailData = action.payload.data
    })
    builder.addCase(getProductDetailByIdAction.rejected, (state) => {
      state.productDetailLoading = false
    })

    builder.addCase(delteProductAction.pending, (state) => {
      state.deleteProductLoading = true
    })
    builder.addCase(delteProductAction.fulfilled, (state, action) => {
      state.deleteProductLoading = false
    })
    builder.addCase(delteProductAction.rejected, (state) => {
      state.deleteProductLoading = false
    })

    builder.addCase(delteProductImageAction.pending, (state) => {
      state.deleteProductImageLoading = true
    })
    builder.addCase(delteProductImageAction.fulfilled, (state, action) => {
      state.deleteProductImageLoading = false
    })
    builder.addCase(delteProductImageAction.rejected, (state) => {
      state.deleteProductImageLoading = false
    })

    builder.addCase(updateProductAction.pending, (state) => {
      state.updateProductLoading = true
    })
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.updateProductLoading = false
    })
    builder.addCase(updateProductAction.rejected, (state) => {
      state.updateProductLoading = false
    })

    builder.addCase(createProductAction.pending, (state) => {
      state.createProductLoading = true
    })
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.createProductLoading = false
    })
    builder.addCase(createProductAction.rejected, (state) => {
      state.createProductLoading = false
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

export {
  getProductListAction,
  delteProductAction,
  getProductDetailByIdAction,
  createProductAction,
  updateProductAction,
  getProductListByCategoryIdAction,
  delteProductImageAction
}
export default productSlice.reducer
