/// <reference types="vite-plugin-svgr/client" />

import { Column } from "./components/Column"
import { useSelector } from "react-redux"
import type { RootState } from "./redux/store"

function App() {
  const firstColumnWidgets = useSelector((state: RootState) => state.column.firstColumn)
  const secondColumnWidgets = useSelector((state: RootState) => state.column.secondColumn)
  const thirdColumnWidgets = useSelector((state: RootState) => state.column.thirdColumn)

  return (
    <div className="bg-[#8fb2e8] h-[100vh]">
      <div className="py-12 px-44 h-full border flex justify-between">
        <Column widgets={firstColumnWidgets} columnNumber="firstColumn" />
        <Column widgets={secondColumnWidgets} columnNumber="secondColumn" />
        <Column widgets={thirdColumnWidgets} columnNumber="thirdColumn" />
      </div>
    </div>
  )
}

export default App