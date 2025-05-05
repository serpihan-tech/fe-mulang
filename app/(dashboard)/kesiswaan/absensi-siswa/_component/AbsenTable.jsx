import { Edit, Folder, TickCircle } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import SmallButton from '@/app/component/SmallButton';

const AbsenTable = ({ data, columns }) => {
  const [editableColumns, setEditableColumns] = useState(columns);
  const [selectedStatus, setSelectedStatus] = useState({});
  console.log("columns: ",editableColumns)
  console.log("data",data)

  useEffect(() => {
    if (columns && columns.length > 0) {
      setEditableColumns(columns);
    }
  
    
  }, [columns]);

  const handleDisableFillable = async (colKey) => {
    console.log("colkey: ",colKey)
    const targetColumn = editableColumns.find(col => col.key === colKey.key);
    if (!targetColumn) return;
  
    const colIndex = editableColumns.findIndex(col => col.key === colKey.key);
    const columnDate = format(new Date(colKey.date), 'yyyy-MM-dd'); // format date
    const scheduleId = 132; // <- Sesuaikan dengan nilai sebenarnya
  
    // Susun payload absences
    const absencesPayload = data.map((student, rowIndex) => {
      const status = selectedStatus[rowIndex]?.[colKey];
      const reason = status === "Izin" ? student.reason || "Perlu alasan" : null; // Sesuaikan pengambilan reason
      return {
        classStudentId: student.classStudentId,
        status,
        reason,
      };
    }).filter(abs => abs?.status); // pastikan status terisi
  
    const payload = {
      date: columnDate,
      scheduleId,
      absences: absencesPayload,
    };
  
    try {
      await EditAbsensiSiswa(payload);
  
      // Setelah berhasil simpan, ubah fillable jadi false
      setEditableColumns((prev) =>
        prev.map((col) =>
          col.key === colKey ? { ...col, fillable: false } : col
        )
      );
    } catch (err) {
      console.error("Gagal simpan:", err);
    }
  };

  /// handleStatusChange dan getStatusColor pakai dynamic key
  const handleStatusChange = (rowIndex, columnKey, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [rowIndex]: {
        ...prev[rowIndex],
        [columnKey]: status,
      },
    }));
  };

  const handleEnableFillable = (colKey) => {
    console.log("colKey",colKey)
    setEditableColumns((prev) =>
      prev.map((col) =>
        col.key === colKey ? { ...col, fillable: true } : col
      )
    );
  };


  console.log("editable columns: ",editableColumns)

  const getStatusColor = (rowIndex, columnKey, status) => {
    if (selectedStatus[rowIndex]?.[columnKey] === status) {
      switch (status) {
        case 'Hadir':
          return 'bg-green-600 text-white';
        case 'Izin':
          return 'bg-[#FFCF43] text-black';
        case 'Sakit':
          return 'bg-[#0841E2] text-white';
        case 'Alfa':
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
          {editableColumns.map((column, index) => (
            <th key={index} className='px-5 py-[10px] text-black text-lg font-semibold'>
            {column.key.startsWith('status_') ? (
              <>
                <p className='text-black text-lg font-semibold text-left'>
                  {format(new Date(column.date), 'd MMMM yyyy', { locale: id })}
                </p>
                <p className='text-black text-sm font-normal text-left'>Minggu ke-{index-2}</p>
                {column.fillable === false ? 
                  <div className='flex space-x-2 text-success-main text-xs items-center mt-2'>
                    <TickCircle 
                      size={14}
                      color='currentColor'
                      variant='Bold'
                    />
                    <p>Terverifikasi</p>
                  </div>
                  : null
                }
              </>
            ) : (
              <p className='text-black text-lg font-semibold text-left'>{column.label}</p>
            )} 
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            {editableColumns.map((column, colIndex) => (
              <td
                key={colIndex}
                className={`p-[10px] text-base font-medium text-black whitespace-nowrap ${
                  column.key === 'nama' ? 'text-left' : 'text-center'
                }`}
              >
                {column.key === 'id' ? (
                  index + 1
                ) : column.key.startsWith('status_') ? (
                  <div className='w-full flex space-x-2 px-5 py-[10px] items-center'>
                    {['Hadir', 'Izin', 'Sakit', 'Alfa'].map((status) => {
                      const isDisabled = column.fillable === false;
                      return (
                        <div
                          key={status}
                          className={`rounded-full w-12 h-12 text-[10px] font-semibold justify-center items-center flex
                            ${getStatusColor(index, column.key, status)}
                            ${isDisabled ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          onClick={() => {
                            if (!isDisabled) {
                              handleStatusChange(index, column.key, status);
                            }
                          }}
                        >
                          {status}
                        </div>
                      );
                    })}
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
          {editableColumns.map((column, colIndex) => (
            <td key={colIndex} className='justify center px-7'>
              {column.key.startsWith('status_') && column.fillable === false ? (
                <SmallButton 
                  bgColor={"bg-pri-main"}
                  icon={Edit}
                  colorIcon={"currentColor"}
                  iconSize={24}
                  title="Edit"
                  minBtnSize='min-w-full'
                  onClick={() => handleEnableFillable(column.key)}
                />
              ): (column.key.startsWith('status_') &&
                <SmallButton 
                  bgColor={"bg-pri-main"}
                  icon={Folder}
                  colorIcon={"currentColor"}
                  iconSize={24}
                  title="Tambah"
                  minBtnSize='min-w-full'
                  onClick={() => handleDisableFillable(column)}
                />
              )}
            </td>
          ))}
        </tr>
      </tfoot>
    </table>
  );
};

export default AbsenTable;