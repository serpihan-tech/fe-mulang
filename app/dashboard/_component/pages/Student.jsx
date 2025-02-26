import TableComponent from "@/app/component/Table";

export default function StudentDashboard() {
  const columns = ["name", "age", "city"];
const data = [
  { name: "Alice", age: 24, city: "Jakarta" },
  { name: "Bob", age: 30, city: "Bandung" },
  { name: "Charlie", age: 28, city: "Surabaya" },
  { name: "David", age: 22, city: "Yogyakarta" },
];


    return (
      <div>
        <h1 className="text-xl font-bold">Dashboard Mahasiswa</h1>
        <p>Selamat datang, Mahasiswa!</p>
        <TableComponent columns={columns} data={data} />
      </div>
    );
  }