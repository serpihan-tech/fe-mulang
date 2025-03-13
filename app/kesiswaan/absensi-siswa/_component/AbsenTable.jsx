import React, { useState } from 'react';

const AbsenTable = ({ data, columns }) => {
  const [selectedStatus, setSelectedStatus] = useState({});

  // Function to handle status change
  const handleStatusChange = (nis, week, status) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [nis]: {
        ...prevStatus[nis],
        [week]: status,
      },
    }));
  };

  // Function to get the color class based on the status
  const getStatusColor = (nis, week, status) => {
    if (selectedStatus[nis]?.[week] === status) {
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
          {columns.map((column, index) => (
            <th key={index} className='px-5 py-[10px] text-black text-lg font-semibold'>
              {column.key === 'status' ? (
                <>
                  <p className='text-black text-lg font-semibold text-left'>{column.date}</p>
                  <p className='text-black text-sm font-normal text-left'>{column.week}</p>
                </>
              ) : (
                column.label
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className={`p-[10px] text-base font-medium text-black whitespace-nowrap ${
                  column.key === 'nama' ? 'text-left' : 'text-center'
                }`}
              >
                {column.key === 'id' ? (
                  index + 1
                ) : column.key === 'status' ? (
                  <div className='w-full flex space-x-3 px-5 py-[10px] items-center'>
                    {['Hadir', 'Izin', 'Sakit', 'Alpha'].map((status) => (
                      <div
                        key={status}
                        className={`rounded-full w-12 h-12 text-[10px] font-semibold justify-center items-center flex cursor-pointer ${getStatusColor(item.nis, colIndex, status)}`}
                        onClick={() => handleStatusChange(item.nis, colIndex, status)}
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                ) : (
                  item[column.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AbsenTable;