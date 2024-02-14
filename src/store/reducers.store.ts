import {configureStore} from '@reduxjs/toolkit'

import productReducer from 'src/app/pages/products/product.slice'
import categoryReducer from 'src/app/pages/category/category.slice'
import subCategoryReducer from 'src/app/pages/subCategory/subCategory.slice'
import BannerReducer from 'src/app/pages/banners/banners.slice'
import TestimonialReducer from 'src/app/pages/testimonial/testimonial.slice'
import ShopByBudgetReducer from 'src/app/pages/shopByBudget/shopByBudget.slice'
import CartReducer from 'src/app/pages/web/cart/cart.slice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    banner: BannerReducer,
    testimonial: TestimonialReducer,
    shopByBudget: ShopByBudgetReducer,
    cart: CartReducer
  }
})
