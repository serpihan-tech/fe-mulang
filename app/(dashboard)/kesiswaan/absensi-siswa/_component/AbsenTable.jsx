import { Edit, Folder, TickCircle } from 'iconsax-react';
import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import SmallButton from '@/app/component/SmallButton';
import { toast } from 'react-toastify';
import { EditAbsensiSiswa } from '@/app/api/guru/ApiKesiswaan';

const AbsenTable = ({ data, columns, onfetch }) => {
  const [editableColumns, setEditableColumns] = useState(columns);
  const [selectedStatus, setSelectedStatus] = useState({});
  const latestStatusRef = useRef(null);

  useEffect(() => {
    if (columns && columns.length > 0 && data && data.length > 0) {
      setEditableColumns(columns);
  
      // Inisialisasi status dari data
      const initialStatus = {};
      data.forEach((student, studentIndex) => {
        initialStatus[studentIndex] = {};
        columns.forEach((col) => {
          if (col.key.startsWith('status_')) {
            const absence = col.absences?.find(
              (abs) => abs.classStudentId === student.id
            );
            if (absence) {
              initialStatus[studentIndex][col.key] = absence.status || '-';
            }
          }
        });
      });
  
      setSelectedStatus(initialStatus);

    
    }
  }, [columns, data]);

  useEffect(() => {
    
    setTimeout(() => {
      latestStatusRef.current?.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest',
      });
    }, 0);

  }, [])
  
  

  const handleDisableFillable = async (colKey) => {
    console.log("colkey: ",colKey)
    const targetColumn = editableColumns.find(col => col.key === colKey.key);
    if (!targetColumn) return;
  
    const columnDate = format(new Date(colKey.date), 'yyyy-MM-dd'); // format date
    const scheduleId = colKey.scheduleId;
  
    // Susun payload absences
    const absencesPayload = data.map((student, rowIndex) => {
      const status = selectedStatus[rowIndex]?.[colKey.key];
      const reason = status === "Izin" ? student.reason || "Default reason" : null; // Sesuaikan pengambilan reason
      return {
        classStudentId: student.id,
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
      //console.log("payload: ", payload)
      const response = await EditAbsensiSiswa(payload);
      if(response) {
        setEditableColumns((prev) =>
          prev.map((col) =>
            col.key === colKey.key ? { ...col, fillable: false } : col
          )
        );
      }
    } catch (err) {
      toast.error("Data absensi harus lengkap")
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
  console.log("data: ",data)


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

  const stickyClass = (key) => {
    switch (key) {
      case 'id':
        return 'sticky left-0  bg-white min-w-[60px]';
      case 'nis':
        return 'sticky left-[60px] bg-white min-w-[80px]';
      case 'nama':
        return 'sticky left-[140px] bg-white min-w-[160px]';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full ">
  <table className="bg-white min-w-max border-separate border-spacing-0">
  <thead>
  <tr>
    {editableColumns.map((column, index) => {
      const lastStatusColumn = editableColumns
        .filter(col => col.key.startsWith('status_'))
        .at(-1); // ambil kolom status terakhir

      console.log("status terakhir:", lastStatusColumn.key)
      const isLastStatusColumn = column?.key === lastStatusColumn?.key;

      return (
        <th
          key={index}
          ref={isLastStatusColumn ? latestStatusRef : null}
          className={`px-5 py-[10px] text-black text-lg font-semibold text-left whitespace-nowrap ${stickyClass(column.key)}`}
        >
          {column.key.startsWith('status_') ? (
            <>
              <p>{format(new Date(column.date), 'd MMMM yyyy', { locale: id })}</p>
              <p className='text-sm font-normal'>Minggu ke-{index - 2}</p>
              {column.fillable === false && (
                <div className='flex space-x-2 text-success-main text-xs items-center mt-2'>
                  <TickCircle size={14} color="currentColor" variant="Bold" />
                  <p>Terverifikasi</p>
                </div>
              )}
            </>
          ) : (
            column.label
          )}
        </th>
      );
    })}
  </tr>
</thead>


    <tbody>
      {data.map((item, index) => (
        <tr key={item.id}>
          {editableColumns.map((column, colIndex) => {
            const isFixed = ['id', 'nis', 'nama'].includes(column.key);
            const stickyClass = isFixed
              ? column.key === 'id'
                ? 'sticky left-0 bg-white'
                : column.key === 'nis'
                  ? 'sticky left-[60px] bg-white'
                  : 'sticky left-[140px] bg-white'
              : '';

            return (
              <td
                key={colIndex}
                className={`p-[10px] text-base font-medium text-black whitespace-nowrap ${
                  column.key === 'nama' ? 'text-left' : 'text-center'
                } ${stickyClass}`}
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
            );
          })}
        </tr>
      ))}
    </tbody>

    <tfoot>
      <tr>
        {editableColumns.map((column, colIndex) => (
          <td
            key={colIndex}
            className={`justify-center px-7 ${stickyClass(column.key)}`}
          >
            {column.key.startsWith('status_') && column.fillable === false ? (
              <SmallButton
                bgColor={'bg-pri-main'}
                icon={Edit}
                colorIcon={'currentColor'}
                iconSize={24}
                title='Edit'
                minBtnSize='min-w-full'
                onClick={() => handleEnableFillable(column.key)}
              />
            ) : (
              column.key.startsWith('status_') && (
                <SmallButton
                  bgColor={'bg-pri-main'}
                  icon={Folder}
                  colorIcon={'currentColor'}
                  iconSize={24}
                  title='Tambah'
                  minBtnSize='min-w-full'
                  onClick={() => handleDisableFillable(column)}
                />
              )
            )}
          </td>
        ))}
      </tr>
    </tfoot>
  </table>
</div>



  );
};

export default AbsenTable;