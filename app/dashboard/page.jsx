import Card from "./_component/Card";
import { People, Teacher, Book, Award, Calendar } from "iconsax-react";
export default function Dashboard() {
  return (
    <div className="flex bg-[#FAFAFA] pt-8 px-6 gap-5">
      <Card>
        <People className="w-9 h-9 bg-blue-600 p-1.5 rounded-md text-white text-extrabold"
          size="24" variant="Bold" color="white"
        />
        <p className="text-lg font-bold py-4">1025</p>
        <p className="text-sm font-medium" >Total Siswa</p>
      </Card>
      <Card>
        <Teacher className="w-9 h-9 bg-blue-600 p-1.5 rounded-md text-white text-extrabold"
          size="24" variant="Bold" color="white"
        />
        <p className="text-lg font-bold py-4">100</p>
        <p className="text-sm font-medium" >Total Guru</p>
      </Card>
      <Card>
        <Book className="w-9 h-9 bg-blue-600 p-1.5 rounded-md text-white text-extrabold"
          size="24" variant="Bold" color="white"
        />
        <p className="text-lg font-bold py-4">150</p>
        <p className="text-sm font-medium" >Total Mapel</p>
      </Card>
      <Card>
        <Award className="w-9 h-9 bg-blue-600 p-1.5 rounded-md text-white text-extrabold"
          size="24" variant="Bold" color="white"
        />
        <p className="text-lg font-bold py-4">25000</p>
        <p className="text-sm font-medium" >Total Kelulusan</p>
      </Card>
      <div>
        <div className="w-[332px] h-16 flex p-3.5 rounded-md bg-white gap-5">
          <div className="flex items-center">
            <Calendar className="flex items-center justify-center w-7.5 rounded-md text-gray-700 text-extrabold "
              size="24" variant="Bold" color="black"
            />
          </div>
          <div>
            <p className="text-base font-bold">Periode</p>
            <p className="text-[10px] font-medium" >Genap 2024-2025</p>
          </div>
        </div>
        <div className="w-[332px] h-16 flex p-3.5 mt-[27px] rounded-md bg-white gap-5">
          <div>
            <p className="text-lg font-bold">Kalender</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}