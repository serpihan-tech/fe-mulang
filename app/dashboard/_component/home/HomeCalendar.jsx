"use client";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../style/calendarStyle.css";

export default function HomeCalendar() {
  return (
    <>
       <div className="w-full max-h-max p-3.5 mt-[27px] rounded-md bg-white gap-5">
        <div>
          <p className="text-lg font-bold">Kalender</p>
          <ReactCalendar 
            className="react-calendar mb-3"
            formatShortWeekday={(locale, date) => 
              ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
            }
            formatDay={(locale, date) => {
              return date.getDate().toString().padStart(2, '0');
            }}
            nextLabel="›"
            prevLabel="‹"
            view="month"
          />
        </div>
        <div>
          <p className="text-base font-medium text-[#333333]">Upcoming Event</p>
          <div className="w-full py-8 flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="w-[45px] h-[45px] relative">
                <img className="w-[45px] h-[45px] left-0 top-0 absolute" src="/svg/event.svg" />
            </div>
            <div className="opacity-80 justify-start items-start gap-2.5 inline-flex">
                <div className="text-[#333333] text-xs font-normal">No upcoming events</div>
            </div>
          </div>
        </div>
            </div> 
    </>
  );
}