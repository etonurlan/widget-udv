import { useState, useEffect } from "react";

export const TimerWidget = ({index, colIndex}: {index: number, colIndex: string}) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
  
    useEffect(() => {
      let interval: number = 0;
  
      if (isActive) {
        interval = window.setInterval(() => {
          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(interval);
            setIsActive(false);
          } else {
            if (seconds === 0) {
              if (minutes === 0) {
                if (hours === 0) {
                  clearInterval(interval);
                  setIsActive(false);
                } else {
                  setHours((prevHours) => prevHours - 1);
                  setMinutes(59);
                }
              } else {
                setMinutes((prevMinutes) => prevMinutes - 1);
              }
              setSeconds(59);
            } else {
              setSeconds((prevSeconds) => prevSeconds - 1);
            }
          }
        }, 1000);
      } else if (!isActive && (hours !== 0 || minutes !== 0 || seconds !== 0)) {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [isActive, hours, minutes, seconds]);
  
    const toggleTimer = () => {
      setIsActive(!isActive);
    };
  
    const resetTimer = () => {
      setIsActive(false);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    };
  
    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHours(parseInt(e.target.value));
    };
  
    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = parseInt(e.target.value);
      if (value > 59) {
        value = 59;
      }
      setMinutes(value);
    };
  
    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = parseInt(e.target.value);
      if (value > 59) {
        value = 59;
      }
      setSeconds(value);
    };
  
    return (
      <div draggable
      onDragStart={(event) => {
        event.dataTransfer.setData(
            "text",
            JSON.stringify({ taskIndex: index, prevColIndex: colIndex,
            typeWidget: 'timerWidgets' })
        )
      }}
      className="border px-2 rounded-lg mb-2 last-of-type:mb-0">
        <div className="flex w-full">
            <input className="w-[33%] outline-none text-center
            text-[20px] font-semibold"
            placeholder="hh"
            type="number" id="hours" value={hours} onChange={handleHoursChange} />
            <input className="w-[33%] outline-none text-center
            text-[20px] font-semibold"
            placeholder="mm"
            type="number" id="minutes" value={minutes}
            onChange={handleMinutesChange} max="59" />
            <input className="w-[33%] outline-none text-center
            text-[20px] font-semibold"
            placeholder="ss"
            type="number" id="seconds" value={seconds}
            onChange={handleSecondsChange} max="59" />
        </div>
        <div className="flex justify-around">
          <button className="flex items-center btn" 
          onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
          <button className="flex items-center btn"
          onClick={resetTimer}>Reset</button>
        </div>
      </div>
    );
}