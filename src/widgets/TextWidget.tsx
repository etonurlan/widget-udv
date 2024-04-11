export const TextWidget = ({index, colIndex}: {index: number, colIndex: string}) => {
    const autoGrow = (event: any) => {
        const element = event.target;
        element.style.height = '5px';
        element.style.height = `${element.scrollHeight}px`;
    }

    return (
        <div draggable
        onDragStart={(event) => {
            event.dataTransfer.setData(
                "text",
                JSON.stringify({ taskIndex: index, prevColIndex: colIndex,
                typeWidget: 'textWidgets' })
            )
        }}
        className="border px-2 rounded-lg mb-2 last-of-type:mb-0">
            <textarea className="w-full mb-2 text-[20px] font-semibold
            outline-none resize-none overflow-hidden h-[30px]" 
            placeholder="Heading..."
            onInput={autoGrow} />
            <textarea className="w-full outline-none resize-none overflow-hidden"
            placeholder="Text..."
            onInput={autoGrow} />
        </div>
    )
}