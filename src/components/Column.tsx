import Plus from "../img/plus-solid.svg?react"
import { TextWidget } from "../widgets/TextWidget"
import { WeatherWidget } from "../widgets/WeatherWidget"
import { TimerWidget } from "../widgets/TimerWidget"
import { CurrencyWidget } from "../widgets/CurrencyWidget"
import { addWidget, dragTask } from "../redux/features/columnSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"

type Widgets = {
    currencyWidgets: [];
    textWidgets: [];
    timerWidgets: [];
    weatherWidgets: [];
}

export const Column = ({columnNumber, widgets} : {columnNumber: string, widgets: Widgets}) => {
    const [showMenu, setShowMenu] = useState(false)

    const dispatch = useDispatch()

    const colors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-green-500",
        "bg-indigo-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-sky-500",
    ]
    var color = colors[Math.floor(Math.random()*colors.length)]

    const makeWidget = (widget: string) => {
        dispatch(addWidget({widget: widget, column: columnNumber}))
        setShowMenu(false)
    }
    
    return (
        <div className="bg-white h-full w-[25%] relative rounded-xl"
        onDrop={(event) => {
            const { prevColIndex, taskIndex, typeWidget }: 
            {prevColIndex: string, taskIndex: string, typeWidget: string} = JSON.parse(
                event.dataTransfer.getData("text")
            )
            if (columnNumber !== prevColIndex) {
                dispatch(dragTask({ columnNumber, prevColIndex, taskIndex, typeWidget }))
            }
        }}
        onDragOver={(event) => {
            event.preventDefault()
        }}>
            <div className="py-2 px-[18px]">
                <div className={`absolute top-0 left-0 w-full z-10 text-[20px]
                flex flex-col items-center gap-2 rounded-xl shadow-md bg-white
                ${!showMenu && "hidden"}
                ${showMenu && "animate-visibilityOn"}`}>
                    <span className="btn cursor-pointer"
                    onClick={() => makeWidget("text")}>
                        Text
                    </span>
                    <span className="btn cursor-pointer"
                    onClick={() => makeWidget("weather")}>
                        Weather
                    </span>
                    <span className="btn cursor-pointer"
                    onClick={() => makeWidget("timer")}>
                        Timer
                    </span>
                    <span className="btn cursor-pointer"
                    onClick={() => makeWidget("currency")}>
                        Currency
                    </span>
                </div>
                <div className={`${color} h-2 w-full rounded-xl
                flex items-center justify-center mb-2`}></div>
                <div className="overflow-y-auto col max-h-[76vh] pr-2">
                    {widgets.currencyWidgets?.map((index) => (
                        <CurrencyWidget index={index} colIndex={columnNumber} />
                    ))}
                    {widgets.textWidgets?.map((index) => (
                        <TextWidget index={index} colIndex={columnNumber} />
                    ))}
                    {widgets.timerWidgets?.map((index) => (
                        <TimerWidget index={index} colIndex={columnNumber} />
                    ))}
                    {widgets.weatherWidgets?.map((index) => (
                        <WeatherWidget index={index} colIndex={columnNumber} />
                    ))}
                </div>
                <Plus onClick={() => setShowMenu(!showMenu)} 
                className={`w-6 absolute bottom-3 left-[47%] cursor-pointer
                transition-[rotate_0.2s_ease] hover:transform-[scale(1.05)]
                ${showMenu && 'rotate-45'}`} />
            </div>
        </div>
    )
}