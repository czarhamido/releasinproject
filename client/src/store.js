import { configureStore } from '@reduxjs/toolkit'
import prodctTypeSlice from './redux/prodctTypeSlice'
import productSlice from './redux/productSlice'
export const store = configureStore({
  reducer: {
    productsType:prodctTypeSlice,
    products:productSlice
  },
})