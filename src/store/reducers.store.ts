import {configureStore} from '@reduxjs/toolkit'

import productReducer from 'src/app/pages/products/product.slice'
import categoryReducer from 'src/app/pages/category/category.slice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer
  }
})
