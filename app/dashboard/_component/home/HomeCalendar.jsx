"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../style/calendarStyle.css"; // Pastikan file ini memuat definisi .holiday

export default function HomeCalendar() {
  const [holidays, setHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    axios.get("https://api-harilibur.vercel.app/api")
      .then((response) => {
        setHolidays(response.data);
        const currentMonthEvents = getUpcomingEvents(new Date());
        setUpcomingEvents(currentMonthEvents);
      })
      .catch((error) => console.error("Error fetching holidays:", error));
  }, []);

  const isNationalHoliday = (date) => {
    return holidays.some((holiday) => 
      new Date(holiday.holiday_date).toDateString() === date.toDateString() && holiday.is_national_holiday
    );
  };

  const getHolidayInfo = (date) => {
    const holiday = holidays.find((holiday) => 
      new Date(holiday.holiday_date).toDateString() === date.toDateString() && holiday.is_national_holiday
    );
    return holiday ? holiday.holiday_name : null;
  };

  const getUpcomingEvents = (date) => {
    const currentMonth = date.getMonth();
    return holidays
      .filter((holiday) => 
        new Date(holiday.holiday_date).getMonth() === currentMonth && holiday.is_national_holiday
      )
      .sort((a, b) => new Date(a.holiday_date) - new Date(b.holiday_date))
      .map((holiday) => ({ name: holiday.holiday_name, date: new Date(holiday.holiday_date) }));
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    const holidayInfo = getHolidayInfo(date);
    if (holidayInfo) {
      setUpcomingEvents([{ name: holidayInfo, date }]);
    } else {
      setUpcomingEvents([]);
    }
  };

  const handleEventClick = (date) => {
    setSelectedDate(date);
    const holidayInfo = getHolidayInfo(date);
    if (holidayInfo) {
      setUpcomingEvents([{ name: holidayInfo, date }]);
    } else {
      setUpcomingEvents([]);
    }
  };

  const renderUpcomingEvents = () => {
    if (upcomingEvents.length === 0) {
      return (
        <div className="w-full py-8 flex-col justify-center items-center gap-2.5 inline-flex">
          <div className="w-[45px] h-[45px] relative">
            <img className="w-[45px] h-[45px] left-0 top-0 absolute" src="/svg/event.svg" />
          </div>
          <div className="opacity-80 justify-start items-start gap-2.5 inline-flex">
            <div className="text-[#333333] justify-center text-xs font-normal">No upcoming events</div>
          </div>
        </div>
      );
    }
    return upcomingEvents.map((event, index) => {
      const day = event.date.getDate();
      return (
        <div key={`${event.name}-${event.date}`} className="flex w-full" onClick={() => handleEventClick(event.date)}>
          <div className="w-1/12 flex justify-center items-center ps-1 pe-4">
            <div className="text-black text-sm font-semibold justify-center">{day}</div>
          </div>
          <div className="w-full bg-red-600 rounded-md p-2">
            <div className="text-white w-full text-sm font-normal justify-start">
              {event.name}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full max-h-max p-3.5 mt-4 rounded-md bg-white gap-5">
      <div>
        <p className="text-lg font-bold">Kalender</p>
        <ReactCalendar
          className="react-calendar mb-3"
          formatShortWeekday={(locale, date) => ["M", "S", "S", "R", "K", "J", "S"][date.getDay()]}
          formatDay={(locale, date) => date.getDate().toString().padStart(2, "0")}
          nextLabel="›"
          prevLabel="‹"
          view="month"
          tileClassName={({ date, view }) => (view === "month" && isNationalHoliday(date) ? 'holiday' : null)}
          onClickDay={handleDayClick}
          value={selectedDate}
          onActiveStartDateChange={({ activeStartDate }) => {
            const events = getUpcomingEvents(activeStartDate);
            setUpcomingEvents(events);
          }}
        />
      </div>
      <div>
        <p className="text-base font-medium text-[#333333] mt-4">Upcoming Event</p>
        <div className="w-full py-6 flex-col items-center gap-2.5 inline-flex">
          {renderUpcomingEvents()}
        </div>
      </div>
    </div>
  );
}