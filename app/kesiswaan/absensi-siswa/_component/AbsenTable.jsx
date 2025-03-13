import { Edit, Folder, TickCircle } from 'iconsax-react';
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
      <tfoot>
        <tr>
          {columns.map((column, colIndex) => (
            <td key={colIndex} className='justify center px-7'>
              {column.key === 'status' && (
                // <div className='flex gap-3'>
                //   <button className="w-full flex py-[10px] bg-[#cee8d6] px-3 rounded-[10px] items-center">
                //     <Folder
                //       variant='Bold'
                //       size={24}
                //       color='#0e9035'
                //     />
                //     <TickCircle
                //       variant='Bold'
                //       size={6}
                //       color='white'
                //       className='relative -left-4 top-1'
                //     />
                //     <p className='text-[#07481a] text-sm font-semibold whitespace-nowrap'>Data Tersimpan</p>
                //   </button>
                //   <button className='px-3 bg-[#0841e2] rounded-[10px] justify-center items-center'>
                //     <Edit
                //       size={20}
                //       color='white'
                //     />
                //   </button>
                // </div>
                <button className="w-full flex py-[10px] px-8 bg-[#0841e2] rounded-[10px] items-center gap-3 justify-center mt-2 hover:bg-blue-700 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
                  <Folder
                    variant='Bold'
                    size={24}
                    color='white'
                  />
                  <p className='text-white text-sm font-semibold'>Simpan</p>
                </button>
              )}
            </td>
          ))}
        </tr>
      </tfoot>
    </table>
  );
};

export default AbsenTable;