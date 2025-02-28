import { useState } from "react";

const initialStudents = [
  { name: "Andi", tugas1: "", tugas2: "", tugas3: "" },
  { name: "Budi", tugas1: "", tugas2: "", tugas3: "" },
  { name: "Citra", tugas1: "", tugas2: "", tugas3: "" },
];

export default function FillableTable() {
  const [students, setStudents] = useState(initialStudents);
  const [isEditing, setIsEditing] = useState(false);
  const [columns, setColumns] = useState(["tugas1", "tugas2", "tugas3"]);

  const handleChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  const toggleEdit = () => {
    if (isEditing) {
      console.log("Data yang disimpan:", students);
    }
    setIsEditing(!isEditing);
  };

  const addColumn = () => {
    const newColumn = `tugas${columns.length + 1}`;
    setColumns([...columns, newColumn]);
    setStudents(students.map(student => ({ ...student, [newColumn]: "" })));
  };

  return (
    <div className="p-4">
      <button onClick={toggleEdit} className="mb-2 px-4 py-2 bg-blue-500 text-white rounded">
        {isEditing ? "Simpan" : "Edit"}
      </button>
      <button onClick={addColumn} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">
        Tambah Kolom Tugas
      </button>
      <table className="w-full border-collapse border border-gray-300 mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nama</th>
            {columns.map((col) => (
              <th key={col} className="border p-2">{col.replace("tugas", "Tugas ")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td className="border p-2">{student.name}</td>
              {columns.map((task) => (
                <td key={task} className="border p-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={student[task]}
                      onChange={(e) => handleChange(index, task, e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                  ) : (
                    student[task]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
