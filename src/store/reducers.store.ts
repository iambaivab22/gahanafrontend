import {configureStore} from '@reduxjs/toolkit'

import productReducer from 'src/app/pages/products/product.slice'
import categoryReducer from 'src/app/pages/category/category.slice'
import subCategoryReducer from 'src/app/pages/subCategory/subCategory.slice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer
  }
})
