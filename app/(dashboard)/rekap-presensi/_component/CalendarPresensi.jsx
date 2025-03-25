import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight2 } from 'iconsax-react';
import Dropdown from '@/app/component/Dropdown';

export default function CalendarPresensi({ icon:Icon, iconVariant = 'Bold', buttonBorder, gapDays ='', dayNamesMargin='' }) {
  const tahunAjarOptions = [
    { label: "2024-2025", value: "2024_2025" },
    { label: "2023-2024", value: "2023_2024" },
  ];

  const semesterOptions = [
    { label: "Genap", value: "genap" },
    { label: "Ganjil", value: "ganjil" },
  ];

  const [selectedTahunAjar, setSelectedTahunAjar] = useState(null);

  const [selectedSemester, setSelectedSemester] = useState(null);
  
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
    <>
      <div className="lg:w-2/3">
        <div className="overflow-hidden p-2.5 bg-white rounded-lg">
          {/* Header */}
          <div className="flex justify-between items-center text-black bg-white text-base font-semibold mb-6">
            <button 
              onClick={prevMonth} 
              className={`p-1.5 rounded-md ${buttonBorder}`}
            >
              <ArrowRight2 
                size="22" 
                color="currentColor" 
                variant='Outline' 
                style={{transform: 'rotate(180deg)'}}
              />
            </button>
            <span>
              {currentDate.toLocaleString("default", { month: "long" })}{" "}
              {currentDate.getFullYear()}
            </span>
            <button onClick={nextMonth}>
              <ArrowRight2 
                size="22" 
                color="currentColor" 
                variant='Outline'
              />
            </button>
          </div>

          {/* Day Names */}
          <div className="flex flex-wrap text-center text-sm font-normal justify-between cursor-pointer">
            {dayNames.map((day, index) => (
              <div 
                key={index} 
                className="w-[14.25%] p-7 text-[#333333]"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="flex flex-wrap text-center text-xl font-bold gap-3 cursor-pointer">
            {daysInMonth.map((dayObj) => (
              <div
                key={dayObj.date.toISOString()}
                className={`
                  w-[12.75%] 
                  p-7 
                  text-[#0841e2] 
                  border border-[#0841e2] 
                  rounded-md 
                  cursor-pointer
                  ${
                    dayObj.type === 'prev-month' || dayObj.type === 'next-month' 
                      ? 'text-[#CCCCCC] opacity-50' 
                      : ''
                  }
                  ${
                    dayObj.date.getDate() === new Date().getDate() &&
                    dayObj.date.getMonth() === new Date().getMonth() 
                      ? 'bg-blue-200' 
                      : ''
                  }
                  ${
                    isNationalHoliday(dayObj.date) 
                      ? 'bg-gray-300 text-gray-600' 
                      : ''
                  }
                  ${
                    dayObj.date.getDay() === 0 
                      ? 'bg-gray-300 text-gray-600' 
                      : ''
                  }
                  ${
                    selectedDate && 
                    dayObj.date.toDateString() === selectedDate.toDateString() 
                      ? 'bg-blue-100' 
                      : ''
                  }
                `}
                onClick={() => handleDateClick(dayObj.date)}
              >
                {dayObj.date.getDate()}
              </div>
            ))}
          </div>

          {/* Upcoming Events */}
          <div className="mt-4">
            <p className="text-base font-medium text-[#333333]">Upcoming Event</p>
            <div className="w-full py-6 flex flex-col items-center gap-2.5">
              {renderUpcomingEvents()}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3">
        <div className="w-full flex space-x-6">
          <div className="w-1/2">
            <Dropdown
              options={tahunAjarOptions}
              value={selectedTahunAjar}
              onChange={setSelectedTahunAjar}
              placeholder="Tahun Ajar"
              className="h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200 placeholder-gray-300"
              dropdownStyle="dark:bg-black dark:text-white"
            />
          </div>
          <div className="w-1/2">
            <Dropdown
              options={semesterOptions}
              value={selectedSemester}
              onChange={setSelectedSemester}
              placeholder="Semester"
              className="h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200 placeholder-gray-300"
              dropdownStyle="dark:bg-black dark:text-white"
            />
          </div>
        </div>
        <div className="w-full flex mt-[51px] space-x-4">
          <div className="w-1/2 px-4 py-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#adc0f5] justify-start items-center gap-3">
            <div className="text-center justify-center text-black text-lg font-bold">9 Hari</div>
              <div className="flex justify-center items-center gap-2">
                <div className="w-2 h-2 bg-[#0841e2] rounded-full" />
                <div className="text-center justify-center text-black text-base font-medium">Hadir</div>
            </div>
          </div>
          <div className="w-1/2 px-4 py-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#adc0f5] justify-start items-center gap-3">
            <div className="text-center justify-center text-black text-lg font-bold">2 Hari</div>
              <div className="flex justify-center items-center gap-2">
                <div className="w-2 h-2 bg-[#dc1010] rounded-full" />
                <div className="text-center justify-center text-black text-base font-medium">Tidak Hadir</div>
            </div>
          </div>
        </div>
        <div className="mt-7 w-full inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-center text-black text-base font-bold">Keterangan</div>
            <div className="self-stretch inline-flex justify-start items-center gap-3">
              <div className="inline-flex flex-col justify-start items-center gap-1">
                  <div className="text-center justify-center text-black text-sm font-normal">Rab</div>
                  <div className="self-stretch text-center justify-center text-black text-lg font-bold">4</div>
              </div>
              <div className="flex-1 px-3 py-2 bg-[#dc1010] rounded-[5px] flex justify-start items-center gap-2.5">
                  <div className="text-center justify-center text-white text-sm font-medium">Sakit demam</div>
              </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-center gap-3">
            <div className="inline-flex flex-col justify-start items-center gap-1">
              <div className="text-center justify-center text-black text-sm font-normal">Sen</div>
              <div className="text-center justify-center text-black text-lg font-bold">17</div>
            </div>
            <div className="flex-1 px-3 py-2 bg-[#dc1010] rounded-[5px] flex justify-start items-center gap-2.5">
              <div className="text-center justify-center text-white text-sm font-medium">Acara keluarga</div>
            </div>
          </div>
          </div>
      </div>
    </>
  );
}