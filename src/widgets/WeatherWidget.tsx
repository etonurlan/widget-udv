import { useGetWeatherByCityQuery } from "../redux/api/weather"
import { useState } from "react"

export const WeatherWidget = ({index, colIndex}: {index: number, colIndex: string}) => {
    const [searchCity, setSearchCity] = useState("")
    const [cityToFetch, setCityToFetch] = useState("")
    const {data, error, isError} = useGetWeatherByCityQuery(cityToFetch)
    const weather = data ? Math.round(data.main.temp) : null
    const handleCity = () => {
        setCityToFetch(searchCity)
    }
    

    return (
        <div draggable
        onDragStart={(event) => {
            event.dataTransfer.setData(
                "text",
                JSON.stringify({ taskIndex: index, prevColIndex: colIndex,
                typeWidget: 'weatherWidgets' })
            )
        }}
        className="border px-2 rounded-lg flex bg-[#6151c3] mb-2 last-of-type:mb-0">
            {isError && 'data' in error ? (
                <>
                    <input className="w-full outline-none font-semibold text-[20px]
                    bg-inherit placeholder:text-white text-white"
                    onChange={(event) => setSearchCity(event.target.value)}
                    onBlur={handleCity}
                    type="text" placeholder="Search..." />
                    <p className="text-[20px] font-semibold text-white">
                        {error?.data?.message}
                    </p>
                </>
                
            ) : (
                <>
                    <div className="flex flex-col justify-center text-white">
                    <input className="w-full outline-none font-semibold text-[20px]
                        bg-inherit placeholder:text-white text-white"
                        onChange={(event) => setSearchCity(event.target.value)}
                        onBlur={handleCity} value={searchCity}
                        type="text" placeholder="Search..." />
                        <p className="text-white">
                            {data?.weather[0].main}
                        </p> 
                    </div>
                    <p className="font-semibold text-[48px] text-white">
                        {weather}°
                    </p>
                </>
            )}
            
        </div>
    )
}