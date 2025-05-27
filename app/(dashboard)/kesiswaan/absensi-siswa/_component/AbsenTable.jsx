import { DocumentText, Edit, Folder, TickCircle } from 'iconsax-react';
import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import SmallButton from '@/app/component/SmallButton';
import { toast } from 'react-toastify';
import { EditAbsensiSiswa } from '@/app/api/guru/ApiKesiswaan';
import ReasonModal from './ReasonModal';

const AbsenTable = ({ data, columns, onfetch, onShowDescription }) => {
  const [editableColumns, setEditableColumns] = useState(columns);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const [reasons, setReasons] = useState({});
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentColumn, setCurrentColumn] = useState(null);
  const latestStatusRef = useRef(null);

  useEffect(() => {
    if (columns && columns.length > 0 && data && data.length > 0) {
      setEditableColumns(columns);
  
      // Inisialisasi status dari data
      const initialStatus = {};
      const initialDescriptions = {};
      const initialReasons = {};
      data.forEach((student, studentIndex) => {
        initialStatus[studentIndex] = {};
        initialReasons[studentIndex] = {};
        columns.forEach((col) => {
          if (col.key.startsWith('status_')) {
            const absence = col.absences?.find(
              (abs) => abs.classStudentId === student.id
            );
            if (absence) {
              initialStatus[studentIndex][col.key] = absence.status || '-';
              initialReasons[studentIndex][col.key] = absence.reason || '';
            }
            // Inisialisasi deskripsi
            initialDescriptions[col.key] = col.description || '';
          }
        });
      });
  
      setSelectedStatus(initialStatus);
      setDescriptions(initialDescriptions);
      setReasons(initialReasons);
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

  }, [columns])
  
  

  const handleDescriptionChange = (columnKey, value) => {
    setDescriptions(prev => ({
      ...prev,
      [columnKey]: value
    }));
  };

  const handleStatusChange = (rowIndex, columnKey, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [rowIndex]: {
        ...prev[rowIndex],
        [columnKey]: status,
      },
    }));

    // Jika status adalah Izin, tampilkan modal reason
    if (status === 'Izin') {
      setCurrentStudent(data[rowIndex]);
      setCurrentColumn(columnKey);
      setShowReasonModal(true);
    } else {
      // Jika status bukan Izin, hapus reason
      setReasons(prev => ({
        ...prev,
        [rowIndex]: {
          ...prev[rowIndex],
          [columnKey]: '',
        },
      }));
    }
  };

  const handleReasonSubmit = (reason) => {
    if (currentStudent && currentColumn) {
      const rowIndex = data.findIndex(student => student.id === currentStudent.id);
      setReasons(prev => ({
        ...prev,
        [rowIndex]: {
          ...prev[rowIndex],
          [currentColumn]: reason,
        },
      }));
    }
    setShowReasonModal(false);
    setCurrentStudent(null);
    setCurrentColumn(null);
  };

  const handleDisableFillable = async (colKey) => {
    console.log("colkey: ",colKey)
    const targetColumn = editableColumns.find(col => col.key === colKey.key);
    if (!targetColumn) return;
  
    const columnDate = format(new Date(colKey.date), 'yyyy-MM-dd');
    const scheduleId = colKey.scheduleId;
  
    // Susun payload absences
    const absencesPayload = data.map((student, rowIndex) => {
      const status = selectedStatus[rowIndex]?.[colKey.key];
      const reason = status === "Izin" ? reasons[rowIndex]?.[colKey.key] : null;
      return {
        classStudentId: student.id,
        status,
        reason,
      };
    }).filter(abs => abs?.status);
  
    const payload = {
      date: columnDate,
      scheduleId,
      absences: absencesPayload,
      description: descriptions[colKey.key] || ''
    };
  
    try {
      const response = await EditAbsensiSiswa(payload);
      if(response) {
        setEditableColumns((prev) =>
          prev.map((col) =>
            col.key === colKey.key ? { ...col, fillable: false, description: descriptions[colKey.key] } : col
          )
        );
      }
    } catch (err) {
      toast.error("Data absensi harus lengkap")
    }
  };

  /// handleStatusChange dan getStatusColor pakai dynamic key
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
          return 'bg-[#FFCF43] text-black dark:text-slate-100';
        case 'Sakit':
          return 'bg-[#0841E2] text-white';
        case 'Alfa':
          return 'bg-[#DC1010] text-white';
        default:
          return 'bg-white dark:bg-dark_net-ter text-black dark:text-slate-100 border-[#CCCCCC] border-[1.5px]';
      }
    }
    return 'bg-white dark:bg-dark_net-ter text-black dark:text-slate-100 border-[#CCCCCC] border-[1.5px]';
  };

  const stickyClass = (key) => {
    switch (key) {
      case 'id':
        return 'sticky left-0  bg-white dark:bg-dark_net-ter min-w-[60px]';
      case 'nis':
        return 'sticky left-[60px] bg-white dark:bg-dark_net-ter min-w-[80px]';
      case 'nama':
        return 'sticky left-[140px] bg-white dark:bg-dark_net-ter min-w-[160px]';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full ">
  <table className="bg-white dark:bg-dark_net-ter min-w-max border-separate border-spacing-0">
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
          className={`px-5 py-[10px] text-black dark:text-slate-100 text-lg font-semibold text-left whitespace-nowrap ${stickyClass(column.key)}`}
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
                ? 'sticky left-0 bg-white dark:bg-dark_net-ter'
                : column.key === 'nis'
                  ? 'sticky left-[60px] bg-white dark:bg-dark_net-ter'
                  : 'sticky left-[140px] bg-white dark:bg-dark_net-ter'
              : '';

            return (
              <td
                key={colIndex}
                className={`p-[10px] text-base font-medium text-black dark:bg-dark_net-ter dark:text-slate-100 whitespace-nowrap ${
                  column.key === 'nama' ? 'text-left' : 'text-center'
                } ${stickyClass}`}
              >
                {column.key === 'id' ? (
                  index + 1
                ) : column.key.startsWith('status_') ? (
                  <div className='w-full flex space-x-2 px-5 py-[10px] items-center dark:text-slate-100'>
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
            className={`justify-center px-7 ${stickyClass(column.key)} pb-5`}
          >
            {column.key.startsWith('status_') && column.fillable === false ? (
              <div className='flex space-x-2 w-full'>
                <SmallButton
                  bgColor={'bg-sec-main '}
                  icon={DocumentText}
                  textColor='text-black'
                  colorIcon={'currentColor'}
                  iconSize={24}
                  title='Desc'
                  minBtnSize='w-full'
                  onClick={() => onShowDescription(column.description)}
                />

                <SmallButton
                  bgColor={'bg-pri-main'}
                  icon={Edit}
                  colorIcon={'currentColor'}
                  iconSize={24}
                  title='Edit'
                  minBtnSize='w-full'
                  onClick={() => handleEnableFillable(column.key)}
                />
              </div>
            ) : (
              column.key.startsWith('status_') && (
                <div className="space-y-2">
                  <textarea
                    value={descriptions[column.key] || ''}
                    onChange={(e) => handleDescriptionChange(column.key, e.target.value)}
                    placeholder="Masukkan deskripsi absensi..."
                    className="w-full p-2 dark:bg-dark_net-ter border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows="3"
                  />
                  <SmallButton
                    bgColor={'bg-pri-main'}
                    icon={Folder}
                    colorIcon={'currentColor'}
                    iconSize={24}
                    title='Tambah'
                    minBtnSize='min-w-full'
                    onClick={() => handleDisableFillable(column)}
                  />
                </div>
              )
            )}
          </td>
        ))}
      </tr>
    </tfoot>
  </table>

  <ReasonModal
    isOpen={showReasonModal}
    onClose={() => {
      setShowReasonModal(false);
      setCurrentStudent(null);
      setCurrentColumn(null);
    }}
    onSubmit={handleReasonSubmit}
    student={currentStudent}
  />
</div>



  );
};

export default AbsenTable;