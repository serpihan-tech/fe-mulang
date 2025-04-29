import React, { use, useEffect, useState } from "react";
import { Edit, Eye, EyeSlash } from "iconsax-react";
import Image from "next/image";
import {
  getProfileStudent,
  updateStudentProfile,
} from "@/app/api/siswa/ApiSiswa";
import { toast } from "react-toastify";
import { useProfile } from "@/provider/ProfileProvider";
import ImageCropper from "@/app/component/ImageCropper";
import getCroppedImg from "@/app/component/getCroppedImg";
import { useLoading } from "@/context/LoadingContext";
import ChangePasswordForm from "../../dashboard/_component/home/ChangePassword";

export default function StudentProfile() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const data = JSON.parse(sessionStorage.getItem("profile_data"));
  const studentId = data.data.profile.id;
  const [studentData, setStudentData] = useState(null);
  const { setIsLoading } = useLoading();
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { setProfileImg } = useProfile();
  const [croppingImage, setCroppingImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCroppingImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (_, croppedAreaPixels) => {
    const { file, base64 } = await getCroppedImg(
      croppingImage,
      croppedAreaPixels
    );

    setImageSrc(base64);
    setSelectedFile(file);
    setCroppingImage(null);

    setStudentData((prev) => ({
      ...prev,
      studentDetail: { ...prev.studentDetail, profilePicture: base64 },
    }));
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const [tanggal, setTanggal] = useState(formatDate(new Date()));
  const [activeTab, setActiveTab] = useState("editProfile");

  const fetchDetailSiswa = async () => {
    try {
      const data = await getProfileStudent(studentId);
      setStudentData(data.student);
    } catch (error) {
      console.error("Gagal memuat data siswa.", error);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    fetchDetailSiswa();
  }, [studentId]);

  useEffect(() => {
    if (studentData) {
      setTanggal(formatDate(new Date(studentData.studentDetail.birthDate)));

      console.log("sdee:", studentData);
    }
  }, [studentData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const image = studentData?.studentDetail.profilePicture;

    const payload = {
      student: {
        is_graduate: studentData?.isGraduate,
        name: studentData?.name,
      },
      student_detail: {
        nis: studentData?.studentDetail?.nis || "",
        nisn: studentData?.studentDetail?.nisn || "",
        gender: "",
        religion: studentData?.studentDetail?.religion || "",
        birth_date: "",
        birth_place: "",
        address: studentData?.studentDetail?.address || "",
        enrollment_year: "",
        parents_name: studentData?.studentDetail?.parentsName || "",
        parents_phone: "",
        parents_job: studentData?.studentDetail?.parentsJob || "",
        students_phone: studentData?.studentDetail?.studentsPhone || "",
      },
    };

    try {
      //console.log(selectedFile)
      const response = await updateStudentProfile(
        studentId,
        payload,
        selectedFile
      );
      if (response.status == 200) {
        toast.success(response.data.message);
        const newProfileImg =
          baseUrl +
          "/file/" +
          response.data.student.studentDetail.profilePicture;
        setProfileImg(newProfileImg);
        sessionStorage.setItem(
          "profile_img",
          response.data.student.studentDetail.profilePicture
        );

        fetchDetailSiswa();
      }
    } catch (error) {
      toast.error(error);
      alert("Terjadi kesalahan saat memperbarui data.");
    }
  };


  const renderContent = () => {
    if (activeTab === "editProfile") {
      return (
        <div>
          {/* Modal Cropper */}
          {croppingImage && (
            <ImageCropper
              image={croppingImage}
              onCropComplete={handleCropComplete}
              onCancel={() => setCroppingImage(null)}
            />
          )}
          <div className="relative w-[150px] h-[150px] flex items-center justify-center">
            <Image
              src={
                imageSrc
                  ? imageSrc
                  : baseUrl +
                    "/file/" +
                    studentData?.studentDetail.profilePicture
              }
              className="rounded-full w-full h-full object-cover"
              alt="photo"
              width={150}
              height={150}
              priority
            />
            {/* Tombol Edit */}
            <label className="bg-white rounded-lg w-[30px] h-[30px] cursor-pointer absolute bottom-0 right-0 flex items-center justify-center shadow-md">
              <Edit size={20} color="blue" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="mt-3 md:mt-6 space-y-2 md:space-y-5">
            <div className="w-full md:flex md:space-x-11 space-y-2 md:space-y-0">
              <div className="w-full md:w-1/2 space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  disabled
                  value={studentData?.name || ""}
                  className="text-netral-40 w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">Email</label>
                <input
                  type="email"
                  disabled
                  value={studentData?.user.email || ""}
                  className="w-full text-netral-40 rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                />
              </div>
            </div>
            <div className="w-full md:flex md:space-x-11 space-y-2 md:space-y-0">
              <div className="w-full md:w-1/2 space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">
                  NIS / NISN
                </label>
                <input
                  type="text"
                  disabled
                  value={
                    studentData?.studentDetail.nis +
                      " / " +
                      studentData?.studentDetail.nisn || ""
                  }
                  className="w-full rounded-md py-2 px-4 text-sm text-netral-40 font-medium bg-[#cccccc] placeholder-black"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">
                  No. Telepon
                </label>
                <input
                  type="text"
                  value={studentData?.studentDetail.studentsPhone || ""}
                  maxLength={13}
                  minLength={11}
                  onChange={(e) =>
                    setStudentData((prev) => ({
                      ...prev,
                      studentDetail: {
                        ...prev.studentDetail,
                        studentsPhone: e.target.value,
                      },
                    }))
                  }
                  className="w-full text-black dark:text-slate-100 rounded-md py-2 px-4 text-sm font-medium border border-gray-400 placeholder-black"
                />
              </div>
            </div>
            <div className="w-full md:flex md:space-x-11 space-y-2 md:space-y-0">
              <div className="w-full md:w-1/2 space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">
                  Jenis Kelamin
                </label>

                <div className="flex py-1 md:py-4 space-x-8">
                  {["Laki-Laki", "Perempuan"].map((gender, index) => {
                    const isChecked =
                      studentData?.studentDetail?.gender === gender;
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-[18px]"
                      >
                        <input
                          id={gender.toLowerCase()}
                          type="radio"
                          name="gender"
                          checked={isChecked}
                          disabled
                          className={`w-4 h-4 border-gray-300 focus:ring-2 focus:ring-pri-main 
                            disabled:bg-pri-main disabled:border-pri-main bg-gray-100 
                            dark:bg-gray-700 dark:border-gray-600`}
                        />
                        <label
                          htmlFor={gender.toLowerCase()}
                          className="text-sm font-medium text-black dark:text-gray-300"
                        >
                          {gender}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">
                  Pilih Status
                </label>
                <div className="flex py-1 md:py-4 space-x-8">
                  {[
                    { label: "Aktif", value: 0 },
                    { label: "Tidak Aktif", value: 1 },
                  ].map((status, index) => {
                    const isChecked = studentData?.isGraduate === status.value;
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-[18px]"
                      >
                        <input
                          id={status.label.toLowerCase().replace(" ", "-")}
                          type="radio"
                          name="status"
                          checked={isChecked}
                          disabled
                          className={`w-4 h-4 border-gray-300 focus:ring-2 focus:ring-pri-main 
                            disabled:bg-pri-main disabled:border-pri-main bg-gray-100 
                            dark:bg-gray-700 dark:border-gray-600`}
                        />
                        <label
                          htmlFor={status.label.toLowerCase().replace(" ", "-")}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {status.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">Agama</label>
              <input
                type="text"
                disabled
                value={studentData?.studentDetail.religion || ""}
                className="w-full text-netral-40 rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
              />
            </div>
            <div className="w-full md:flex md:space-x-11 space-y-2 md:space-y-0">
              <div className="w-full md:w-1/2 space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">
                  Tempat Lahir
                </label>
                <input
                  type="text"
                  disabled
                  value={studentData?.studentDetail.birthPlace || ""}
                  className="w-full text-netral-40 rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  value={tanggal || ""}
                  placeholder="Pilih Tanggal"
                  disabled
                  className="w-full text-netral-40 rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                />
              </div>
            </div>
            <div className="w-full flex justify-center md:justify-end pt-6 md:pt-8 lg:pt-[50px]">
              <button className="w-full md:w-[147px] px-2 py-2.5 rounded-full md:rounded-md text-white text-sm font-medium bg-[#0841e2] hover:bg-blue-700 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
                Simpan
              </button>
            </div>
          </form>
        </div>
      );
    } else if (activeTab === "changePassword") {
      return (
        <ChangePasswordForm />
      );
    }
  };

  return (
    <div className="px-4">
      
      <h1 className="text-center md:text-start text-black dark:text-slate-100 text-xl font-semibold ">Profil Pengguna</h1>
      <div className="w-full py-5 mt-3 md:mt-[25px]">
        <div className="w-full flex border-b-[1.5px] border-[#0841e2] space-x-4">
          <button
            onClick={() => setActiveTab("editProfile")}
            className={`w-36 px-4 py-[13.5px] ${
              activeTab === "editProfile"
                ? "bg-[#0841e2] text-white"
                : "bg-white text-[#0841e2]"
            } rounded-t-md text-sm font-semibold justify-center items-center gap-2.5 hover:bg-blue-800 hover:text-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400 cursor-pointer`}
          >
            Edit Profil
          </button>
          <button
            onClick={() => setActiveTab("changePassword")}
            className={`w-36 px-4 py-[13.5px] ${
              activeTab === "changePassword"
                ? "bg-[#0841e2] text-white"
                : "bg-white text-[#0841e2]"
            } rounded-t-md text-sm font-semibold justify-center items-center gap-2.5 hover:bg-blue-800 hover:text-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400 cursor-pointer`}
          >
            Ubah Kata Sandi
          </button>
        </div>
        <div className="w-full py-5 px-2 md:p-[25px]">{renderContent()}</div>
      </div>
    </div>
  );
}
