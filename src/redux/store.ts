import { configureStore } from '@reduxjs/toolkit'
import { weatherApi } from './api/weather'
import { currencyApi } from './api/currency'
import columnReducer from "./features/columnSlice"

export const store = configureStore({
  reducer: {
    column : columnReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, currencyApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch