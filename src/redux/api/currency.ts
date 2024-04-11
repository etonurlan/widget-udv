import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Currency } from '../../models/currencyModel'

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://v6.exchangerate-api.com/v6/07fc1d4887e618f8c56dafb2/latest/' }),
  endpoints: (builder) => ({
    getCurrency: builder.query<Currency, string>({
      query: (currency) => currency 
    }),
  }),
})

export const { useGetCurrencyQuery } = currencyApi