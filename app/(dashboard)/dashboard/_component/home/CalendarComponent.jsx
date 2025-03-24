import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/calendarCompStyle.css';
import { ArrowRight2 } from 'iconsax-react';

export default function CalendarComponent({ icon:Icon, iconVariant = 'Bold', buttonBorder, gapDays ='', dayNamesMargin='' }) {
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [daysInMonth, setDaysInMonth] = useState([]); 
  const [startDay, setStartDay] = useState(0); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [holidays, setHolidays] = useState([]);
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

  useEffect(() => {
    const year = currentDate.getFullYear(); 
    const month = currentDate.getMonth(); 
    const days = [];

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startingDay = firstDayOfMonth.getDay();
    for (let i = 0; i < startingDay; i++) {
      const prevMonthDate = new Date(year, month, -startingDay + i + 1);
      days.push({ date: prevMonthDate, type: 'prev-month' });
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const currentMonthDate = new Date(year, month, i);
      days.push({ date: currentMonthDate, type: 'current-month' });
    }

    const totalDays = 35;
    const addedDays = days.length;
    for (let i = 1; i <= totalDays - addedDays; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      days.push({ date: nextMonthDate, type: 'next-month' });
    }
     
    setDaysInMonth(days);
    setStartDay(startingDay);

    const events = getUpcomingEvents(currentDate);
    setUpcomingEvents(events);
  }, [currentDate, holidays]);

  const dayNames = ["M","S", "S", "R", "K", "J", "S"];

  const prevMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

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

  const handleDateClick = (date) => {
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
        <div key={`${event.name}-${event.date}`} className="flex w-full">
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
    <div className="calendar">
      <div className="header">
        <button onClick={prevMonth} className={`${buttonBorder}`}>
          <Icon size="22" color="currentColor" variant={iconVariant} style={{transform: 'rotate(180deg)'}}/>
        </button>
        <span>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </span>
        <button onClick={nextMonth}>
          <Icon size="22" color="currentColor" variant={iconVariant}/>
        </button>
      </div>
      <div className={`day-names ${dayNamesMargin} ${gapDays}`}>
        {dayNames.map((day, index) => (
          <div key={index} className="day-name">{day}</div>
        ))}
      </div>
      <div className={`days ${gapDays}`}>
        {daysInMonth.map((dayObj) => (
          <div
            key={dayObj.date.toISOString()}
            className={`day ${dayObj.type} rounded-md ${
              dayObj.date.getDate() === new Date().getDate() &&
              dayObj.date.getMonth() === new Date().getMonth() ? 'today' : ""} ${
              selectedDate && dayObj.date.toDateString() === selectedDate.toDateString() ? 'selected' : ""} ${
              isNationalHoliday(dayObj.date) ? 'holiday' : ""} ${
              dayObj.date.getDay() === 0 ? 'sunday' : ""
            }`}
            onClick={() => handleDateClick(dayObj.date)}
          >
            {dayObj.date.getDate()}
          </div>
        ))}
      </div>
      <div className="upcoming-events">
        <p className="text-base font-medium text-[#333333] mt-4">Upcoming Event</p>
        <div className="w-full py-6 flex-col items-center gap-2.5 inline-flex">
          {renderUpcomingEvents()}
        </div>
      </div>
    </div>
  );
}