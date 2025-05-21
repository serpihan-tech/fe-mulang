const addJadwal = (data) => {
  // Find the last status index
  const statusColumns = editableColumns.filter(col => col.key.startsWith('status_'));
  const lastStatusIndex = statusColumns.length > 0 
    ? Math.max(...statusColumns.map(col => parseInt(col.key.split('_')[1])))
    : -1;
  const newStatusIndex = lastStatusIndex + 1;

  // Create new column data
  const newColumn = {
    key: `status_${newStatusIndex}`,
    label: "Status",
    date: data.date,
    scheduleId: data.scheduleId,
    absences: absenTableColumns.map(item => ({
      classStudentId: item.id,
      status: null,
      reason: null
    }))
  };

  setEditableColumns([...editableColumns, newColumn]);
}; 