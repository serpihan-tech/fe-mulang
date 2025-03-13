import React, { useState } from 'react';

const Table = ({ data }) => {
  // Initialize state to keep track of selected status for each row and week
  const [selectedStatus, setSelectedStatus] = useState({});

  // Function to handle status change
  const handleStatusChange = (id, week, status) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [id]: {
        ...prevStatus[id],
        [week]: status,
      },
    }));
  };

  // Function to get the color class based on the status
  const getStatusColor = (id, week, status) => {
    if (selectedStatus[id]?.[week] === status) {
      switch (status) {
        case 'Hadir':
          return 'bg-green-600 text-white';
        case 'Izin':
          return 'bg-[#FFCF43] text-black';
        case 'Sakit':
          return 'bg-[#0841E2] text-white';
        case 'Alpha':
          return 'bg-[#DC1010] text-white';
        default:
          return 'bg-white text-black border-[#CCCCCC] border-[1.5px]';
      }
    }
    return 'bg-white text-black border-[#CCCCCC] border-[1.5px]';
  };

  return (
    <table className='bg-white'>
      <thead>
        <tr>
          <th className='px-5 py-[10px] text-black text-lg font-semibold'>No</th>
          <th className='px-5 py-[10px] text-black text-lg font-semibold'>NIS</th>
          <th className='px-5 py-[10px] text-black text-lg font-semibold'>Nama</th>
          {['3 Februari 2025', '10 Februari 2025', '17 Februari 2025', '24 Februari 2025', '2 Maret 2025', '9 Maret 2025'].map((date, index) => (
            <th key={index} className='px-5 py-[10px] text-black text-lg font-semibold justify-start'>
              <p className='text-black text-lg font-semibold flex justify-start'>{date}</p>
              <p className='text-black text-sm font-normal flex justify-start'>Minggu ke-{index + 1}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td className="p-[10px] text-center text-base font-medium text-black">{index + 1}</td>
            <td className='p-[10px] text-center text-base font-medium text-black'>{item.id}</td>
            <td className='px-5 py-[10px] items-center justify-start text-base font-medium text-black'>{item.name}</td>
            {Array.from({ length: 6 }).map((_, weekIndex) => (
              <td key={weekIndex}>
                <div className='w-full flex space-x-3 px-5 py-[10px] items-center'>
                  {['Hadir', 'Izin', 'Sakit', 'Alpha'].map((status) => (
                    <div
                      key={status}
                      className={`rounded-full w-10 h-10 text-[10px] font-semibold justify-center items-center flex cursor-pointer ${getStatusColor(item.id, weekIndex, status)}`}
                      onClick={() => handleStatusChange(item.id, weekIndex, status)}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;