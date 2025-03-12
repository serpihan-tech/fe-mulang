// components/Table.js
import React from 'react';

const Table = ({ data }) => {
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <table>
      <thead>
        <tr>
          <th className='px-5 py-[10px] text-black text-lg font-semibold'>No</th>
          <th className='px-5 py-[10px] text-black text-lg font-semibold'>NIS</th>
          <th className='px-5 py-[10px] text-black text-lg font-semibold'>Nama</th>
          <th className='px-5 py-[10px] text-black text-lg font-semibold justify-start'>
            <p className='text-black text-lg font-semibold flex justify-start'>3 Februari 2025</p>
            <p className='text-black text-sm font-normal flex justify-start'>Minggu ke-1</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td className="p-[10px] text-center">{index + 1}</td>
            <td className='p-[10px] text-center'>{item.id}</td>
            <td className='px-5 py-[10px] items-center justify-start'>{item.name}</td>
            <td>
              <div className='w-full flex space-x-3 px-5 py-[10px] items-center'>
                <div className='rounded-full w-10 h-10 bg-green-600 text-white text-[10px] font-semibold justify-center items-center flex'>Hadir</div>
                <div className='rounded-full w-10 h-10 bg-[#cccccc] text-[#555555] text-[10px] font-semibold justify-center items-center flex'>Izin</div>
                <div className='rounded-full w-10 h-10 bg-[#cccccc] text-[#555555] text-[10px] font-semibold justify-center items-center flex'>Sakit</div>
                <div className='rounded-full w-10 h-10 bg-[#cccccc] text-[#555555] text-[10px] font-semibold justify-center items-center flex'>Alpha</div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;