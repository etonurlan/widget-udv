import { useGetCurrencyQuery } from "../redux/api/currency"
import { currencies } from "../models/currencyModel"
import { useState } from "react"
import { Conversionrates } from "../models/currencyModel"

export const CurrencyWidget = ({index, colIndex}: {index: number, colIndex: string}) => {
    const [mainCurrency, setMainCurrency] = useState("USD")
    const [secondCurrency, setSecondCurrency] = useState<keyof Conversionrates>("EUR")
    const [mainValue, setMainValue] = useState(0)

    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value);
        if (value > 1000000) {
          value = 1000000;
        } else if (value < 0) {
            value = 0
        }
        setMainValue(value);
    };

    const {data} = useGetCurrencyQuery(mainCurrency)

    return (
        <div draggable
        onDragStart={(event) => {
            event.dataTransfer.setData(
                "text",
                JSON.stringify({ taskIndex: index, prevColIndex: colIndex,
                typeWidget: 'currencyWidgets' })
            )
        }}
        className="border px-2 rounded-lg flex flex-col mb-2 last-of-type:mb-0">
            <div className="flex">
                <input className="w-[67%] outline-none text-center
                text-[20px] font-semibold"
                type="number" placeholder="0"
                value={mainValue}
                onChange={handleValue} />
                <select className="outline-none w-[33%]"
                name="currency_select" title="currency_select"
                onChange={(event) => setMainCurrency(event.target.value)}>
                {currencies.map((currency) => (
                        <option selected={currency == "USD"}
                        value={currency}>{currency}</option>
                    ))} 
                </select> 
            </div>
            <div className="flex items-center">
                <span className="text-[20px] font-medium w-[67%] text-center">
                    {!isNaN(mainValue) ? data?.conversion_rates[secondCurrency]! * mainValue : 0}
                </span>
                <select className="outline-none w-[33%]"
                name="currency_select" title="currency_select"
                onChange={(event) => setSecondCurrency(event.target.value)}>
                {currencies.map((currency) => (
                        <option selected={currency == "EUR"}
                        value={currency}>
                            {currency}
                        </option>
                    ))} 
                </select> 
            </div>
        </div>
    )
}