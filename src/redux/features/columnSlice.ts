import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TypeState = {
    firstColumn: {
        currencyWidgets: number[],
        textWidgets: number[],
        timerWidgets: number[],
        weatherWidgets: number[],
    },
    secondColumn: {
        currencyWidgets: number[],
        textWidgets: number[],
        timerWidgets: number[],
        weatherWidgets: number[],
    },
    thirdColumn: {
        currencyWidgets: number[],
        textWidgets: number[],
        timerWidgets: number[],
        weatherWidgets: number[],
    },
}

const initialState: TypeState = {
    firstColumn: {
        currencyWidgets: [],
        textWidgets: [],
        timerWidgets: [],
        weatherWidgets: [],
    },
    secondColumn: {
        currencyWidgets: [],
        textWidgets: [],
        timerWidgets: [],
        weatherWidgets: [],
    },
    thirdColumn: {
        currencyWidgets: [],
        textWidgets: [],
        timerWidgets: [],
        weatherWidgets: [],
    },
}

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    addWidget: (state, action) => {
        const payload = action.payload
        if (payload.column == 'firstColumn') {
            if (payload.widget == "text") {
                state.firstColumn.textWidgets.push(state.firstColumn.textWidgets.length)
            } else if (payload.widget == "timer") {
                state.firstColumn.timerWidgets.push(state.firstColumn.timerWidgets.length)
            } else if (payload.widget == "currency") {
                state.firstColumn.currencyWidgets.push(state.firstColumn.currencyWidgets.length)
            } else if (payload.widget == "weather") {
                state.firstColumn.weatherWidgets.push(state.firstColumn.weatherWidgets.length)
            }
        } else if (payload.column == "secondColumn") {
            if (payload.widget == "text") {
                state.secondColumn.textWidgets.push(state.secondColumn.textWidgets.length)
            } else if (payload.widget == "timer") {
                state.secondColumn.timerWidgets.push(state.secondColumn.timerWidgets.length)
            } else if (payload.widget == "currency") {
                state.secondColumn.currencyWidgets.push(state.secondColumn.currencyWidgets.length)
            } else if (payload.widget == "weather") {
                state.secondColumn.weatherWidgets.push(state.secondColumn.weatherWidgets.length)
            }
        } else if (payload.column == "thirdColumn") {
            if (payload.widget == "text") {
                state.thirdColumn.textWidgets.push(state.thirdColumn.textWidgets.length)
            } else if (payload.widget == "timer") {
                state.thirdColumn.timerWidgets.push(state.thirdColumn.timerWidgets.length)
            } else if (payload.widget == "currency") {
                state.thirdColumn.currencyWidgets.push(state.thirdColumn.currencyWidgets.length)
            } else if (payload.widget == "weather") {
                state.thirdColumn.weatherWidgets.push(state.thirdColumn.weatherWidgets.length)
            }
        }
    },
    dragTask: (state, action) => {
        const payload = action.payload
        const prevCol = state[payload.prevColIndex]
        const col = state[payload.columnNumber]
        const task = prevCol[payload.typeWidget]?.splice(payload.taskIndex, 1)[0]!
        col[payload.typeWidget].push(task)
    }
  },
})

export const { addWidget, dragTask } = columnSlice.actions
export default columnSlice.reducer