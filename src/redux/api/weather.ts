import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CityWeather } from '../../models/weatherModel'

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<CityWeather, string>({
      query: (city) => {
        if (!city) {
          throw new Error("Category city is required.")
        } else {
          return `weather?q=${city}&units=metric&appid=57900b4ec26414c6143ea9126fe75523`
        }
      } 
    }),
  }),
})

export const { useGetWeatherByCityQuery } = weatherApi