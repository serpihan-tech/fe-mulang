'use client'
import axios from "axios";
import { useState } from "react";
import { updateStudent } from "../api/siswa/ApiSiswa";

export default function ProfileEdit() {
  const [formData, setFormData] = useState({
    username: "salsa_putri_updated",
    email: "salsa.putri.new@example.com",
    password: "",
    name: "Salsabila Putri Updated",
    is_graduate: true,
    nis: "2034567891",
    nisn: "809876543332432",
    gender: "perempuan",
    religion: "Islam",
    profile_picture: null,
    birth_date: "2007-10-01",
    birth_place: "Surabaya",
    address: "Jl. Raya Darmo No. 45, Surabaya",
    enrollment_year: "2022-07-15",
    parents_name: "Hadi Setiawan & Rini Lestari",
    parents_phone: "081355667789",
    parents_job: "Dosen",
    students_phone: "081287654322",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password || undefined,
      },
      student: {
        name: formData.name,
        is_graduate: formData.is_graduate,
      },
      student_detail: {
        nis: formData.nis,
        nisn: formData.nisn,
        gender: formData.gender,
        religion: formData.religion,
        birth_date: formData.birth_date,
        birth_place: formData.birth_place,
        address: formData.address,
        enrollment_year: formData.enrollment_year,
        parents_name: formData.parents_name,
        parents_phone: formData.parents_phone,
        parents_job: formData.parents_job,
        students_phone: formData.students_phone,
        profile_picture: formData.profile_picture || null, // Tambahkan jika ada file
      },
    };
  
    try {
      await updateStudent(1, payload);
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      alert("Gagal memperbarui profil!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          <label className="cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileChange} />
            {formData.profile_picture ? (
              <img
                src={URL.createObjectURL(formData.profile_picture)}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                Upload
              </div>
            )}
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="border p-2 rounded" placeholder="Username" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="border p-2 rounded" placeholder="Password" />
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded" placeholder="Nama Lengkap" required />
          <input type="text" name="nis" value={formData.nis} onChange={handleChange} className="border p-2 rounded" placeholder="NIS" required />
          <input type="text" name="nisn" value={formData.nisn} onChange={handleChange} className="border p-2 rounded" placeholder="NISN" required />
          <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded">
            <option value="perempuan">Perempuan</option>
            <option value="laki-laki">Laki-laki</option>
          </select>
          <input type="text" name="religion" value={formData.religion} onChange={handleChange} className="border p-2 rounded" placeholder="Agama" />
          <input type="text" name="birth_place" value={formData.birth_place} onChange={handleChange} className="border p-2 rounded" placeholder="Tempat Lahir" required />
          <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="border p-2 rounded" placeholder="Alamat" required />
          <input type="text" name="parents_name" value={formData.parents_name} onChange={handleChange} className="border p-2 rounded" placeholder="Nama Orang Tua" required />
          <input type="tel" name="parents_phone" value={formData.parents_phone} onChange={handleChange} className="border p-2 rounded" placeholder="Nomor HP Orang Tua" required />
          <input type="text" name="parents_job" value={formData.parents_job} onChange={handleChange} className="border p-2 rounded" placeholder="Pekerjaan Orang Tua" required />
          <input type="tel" name="students_phone" value={formData.students_phone} onChange={handleChange} className="border p-2 rounded" placeholder="Nomor HP Siswa" required />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
