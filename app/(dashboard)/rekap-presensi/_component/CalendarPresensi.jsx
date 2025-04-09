import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight2 } from 'iconsax-react';

export default function CalendarPresensi({ icon:Icon, iconVariant = 'Bold', buttonBorder, gapDays ='', dayNamesMargin='', dataPresences }) {
  
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [daysInMonth, setDaysInMonth] = useState([]); 
  const [startDay, setStartDay] = useState(0); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [presenceMap, setPresenceMap] = useState({});

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
    if (Array.isArray(dataPresences) && dataPresences.length > 0) {
      const map = {};
      dataPresences.forEach((item) => {
        const dateStr = new Date(item.date).toDateString();
        map[dateStr] = item;
      });
      setPresenceMap(map);
    }
  }, [dataPresences]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // jika klik tidak mengenai tanggal
      if (!e.target.closest('.calendar-date')) {
        setSelectedDate(null);
        const events = getUpcomingEvents(currentDate);
        setUpcomingEvents(events);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [currentDate]);

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

  const getMonthlyPresences = () => {
    if (!Array.isArray(dataPresences)) return [];
    return dataPresences.filter((p) => {
      const date = new Date(p.date);
      return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
    });
  };

  const countStatus = (type) => {
    const monthlyPresences = getMonthlyPresences();
    return monthlyPresences.filter(p => {
      if (type === 'Hadir') return p.status === 'Hadir';
      return p.status !== 'Hadir';
    }).length;
  };
  

  const renderUpcomingEvents = () => {
    if (upcomingEvents.length === 0) {
      return (
        <div className="w-full py-8 flex-col justify-center items-center gap-2.5 inline-flex">
          <div className="w-[45px] h-[45px] relative">
            <img className="w-[45px] h-[45px] left-0 top-0 absolute" src="/svg/event.svg" />
          </div>
          <div className="opacity-80 justify-start items-start gap-2.5 inline-flex">
            <div className="text-[#333333] justify-center text-xs font-normal">Tidak ada acara yang akan datang</div>
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
            {daysInMonth.map((dayObj) => {
              const dateStr = dayObj.date.toDateString();
              const data = presenceMap[dateStr];
              const isToday = dayObj.date.toDateString() === new Date().toDateString();
              const isSelected = selectedDate && selectedDate.toDateString() === dateStr;

              let bgColor = '';
              if (data) {
                bgColor = data.status === 'Hadir' ? 'bg-[#0841e2] text-white' : 'bg-[#dc1010] text-white';
              }

              return (
                <div
                  key={dayObj.date.toISOString()}
                  className={`
                    calendar-date
                    w-[12.65%]
                    p-7
                    rounded-md
                    border border-[#0841e2]
                    ${bgColor}
                    ${dayObj.type !== 'current-month' ? 'text-[#CCCCCC] opacity-50' : ''}
                    ${isToday ? 'ring-2 ring-blue-400' : ''}
                    ${isNationalHoliday(dayObj.date) ? 'bg-gray-300 text-gray-600' : ''}
                    ${dayObj.date.getDay() === 0 ? 'bg-gray-300 text-gray-600' : ''}
                    ${isSelected ? 'ring-4 ring-blue-200' : ''}
                  `}
                  onClick={() => handleDateClick(dayObj.date)}
                >
                  {dayObj.date.getDate()}
                </div>
              );
            })}
          </div>

          {/* Upcoming Events */}
          <div className="mt-4">
            <p className="text-base font-medium text-[#333333]">Acara yang akan datang</p>
            <div className="w-full py-6 flex flex-col items-center gap-2.5">
              {renderUpcomingEvents()}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/3">
        <div className="w-full flex space-x-4">
          <div className="w-1/2 px-4 py-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#adc0f5] justify-start items-center gap-3">
            <div className="text-center justify-center text-black text-lg font-bold">{countStatus('Hadir')} Hari</div>
              <div className="flex justify-center items-center gap-2">
                <div className="w-2 h-2 bg-[#0841e2] rounded-full" />
                <div className="text-center justify-center text-black text-base font-medium">Hadir</div>
            </div>
          </div>
          <div className="w-1/2 px-4 py-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#adc0f5] justify-start items-center gap-3">
            <div className="text-center justify-center text-black text-lg font-bold">{countStatus('Tidak Hadir')} Hari</div>
              <div className="flex justify-center items-center gap-2">
                <div className="w-2 h-2 bg-[#dc1010] rounded-full" />
                <div className="text-center justify-center text-black text-base font-medium">Tidak Hadir</div>
            </div>
          </div>
        </div>
        <div className="mt-7 w-full inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-center text-black text-base font-bold">Keterangan</div>
          {!selectedDate && getMonthlyPresences()
            .filter(p => p.reason)
            .map((p, idx) => {
              const date = new Date(p.date);
              return (
                <div key={idx} className="self-stretch inline-flex justify-start items-center gap-3">
                  <div className="inline-flex flex-col justify-start items-center gap-1">
                    <div className="text-center text-black text-sm font-normal">{date.toLocaleDateString('id-ID', { weekday: 'short' })}</div>
                    <div className="text-center text-black text-lg font-bold">{date.getDate()}</div>
                  </div>
                  <div className="flex-1 px-3 py-2 bg-[#dc1010] rounded-[5px] flex justify-start items-center gap-2.5">
                    <div className="text-white text-sm font-medium">{p.reason}</div>
                  </div>
                </div>
              );
            })
          }

          {selectedDate && (() => {
            const selectedStr = selectedDate.toDateString();
            const selectedPresence = presenceMap[selectedStr];
            if (selectedPresence?.reason) {
              return (
                <div className="self-stretch inline-flex justify-start items-center gap-3">
                  <div className="inline-flex flex-col justify-start items-center gap-1">
                    <div className="text-center text-black text-sm font-normal">{selectedDate.toLocaleDateString('id-ID', { weekday: 'short' })}</div>
                    <div className="text-center text-black text-lg font-bold">{selectedDate.getDate()}</div>
                  </div>
                  <div className="flex-1 px-3 py-2 bg-[#dc1010] rounded-[5px] flex justify-start items-center gap-2.5">
                    <div className="text-white text-sm font-medium">{selectedPresence.reason}</div>
                  </div>
                </div>
              );
            }
            return null;
          })()}
        </div>
      </div>
    </>
  );
}