import React, { useEffect, useState } from "react";
import { Edit } from "iconsax-react";
import Image from "next/image";
import ChangePasswordForm from "../../dashboard/_component/home/ChangePassword";
import { DetailGuru, UpdateProfileGuru } from "@/app/api/guru/ApiGuru";
import { toast, ToastContainer } from "react-toastify";
import { useLoading } from "@/context/LoadingContext";
import { format } from "date-fns";
import { useProfile } from "@/provider/ProfileProvider";
import getCroppedImg from "@/app/component/getCroppedImg";
import ImageCropper from "@/app/component/ImageCropper";

export default function TeacherProfile() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [activeTab, setActiveTab] = useState("editProfile");
  const data = JSON.parse(sessionStorage.getItem("profile_data"));
  const teacherId = data.data.profile.id;
  const [detailGuru, setDetailGuru] = useState(null);
  const {setIsLoading} = useLoading()
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { setProfileImg } = useProfile();
  const [croppingImage, setCroppingImage] = useState(null);
  //console.log(teacherId);

  const fetchDetailGuru = async () => {
    //setIsLoading(true);
    try {
      const data = await DetailGuru(teacherId);
      if(data){
        console.log("Data detail guru:", data);
        setDetailGuru(data.teacher);
      }
    } catch (error) {
      toast.error("Gagal mengambil data detail guru:", error.message);
    } finally {
      //setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailGuru();
  }, [teacherId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phone = detailGuru?.phone || "";

    if (phone.length < 11) {
      toast.error("Nomor telepon minimal 11 digit.");
      return;
    }

    const payload = {
      teacher : {
        name : "",
        nip : "",
        phone : detailGuru?.phone || "",
        religion : "",
        birth_place : "",
        birth_date : "",
        address : "",
        gender : "",
        profile_picture : ""
      },

    
    };

    try {
      console.log(payload)
      //console.log(selectedFile)
      const response = await UpdateProfileGuru(
        teacherId,
        payload,
        selectedFile
      );
      if (response.status == 200) {
        toast.success(response.data.message);
        const newProfileImg =
          baseUrl +
          "/file/" +
          response.data.teacher.profilePicture;
        setProfileImg(newProfileImg);
        sessionStorage.setItem(
          "profile_img",
          response.data.teacher.profilePicture
        );

        fetchDetailGuru();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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

    setDetailGuru((prev) => ({
      ...prev,
      profilePicture: base64,
    }));
  };

  console.log("Detail Guru:", detailGuru); 

  const renderContent = () => {
    if (activeTab === "editProfile") {
      return (
        <div>
            <div className="flex justify-center items-center">
              <Image
                src={
                  imageSrc
                    ? imageSrc
                    : detailGuru?.profilePicture 
                      ? baseUrl + "/file/" + detailGuru?.profilePicture 
                      : "/svg/logo.svg"
                      
                }
                alt="Profile Photo"
                width={150}
                height={150}
                className="rounded-full w-[150px] h-[150px] object-cover cursor"
              />
              <div className="bg-white rounded-lg w-[30px] h-[30px] top-14 right-11 relative cursor-pointer">
                  <Edit size={30} color="blue" className="cursor-pointer"/>
                  <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                  
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-3 md:mt-6 space-y-2 md:space-y-5">
              <div className="w-full md:flex md:space-x-11 space-y-2 md:space-y-0">
                <div className="w-full md:w-1/2 space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium">Nama Lengkap</label>
                  <input type="text" 
                    disabled
                    value={detailGuru?.name || ""}
                    placeholder="Nama pegawai"
                    className="text-netral-40 w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium">Email</label>
                  <input type="email" 
                    disabled
                    value={detailGuru?.user?.email || ""}
                    placeholder="Email pegawai"
                    className="text-netral-40 w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                  />
                </div>
              </div>
              <div className="w-full md:flex md:space-x-11 space-y-2 md:space-y-0">
                <div className="w-full md:w-1/2 space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium">NIP</label>
                  <input type="number" 
                    disabled
                    value={detailGuru?.nip || ""}
                    placeholder="1236545455"
                    className="text-netral-40 w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium">No. Telepon</label>
                  <input type="text" 
                    value={detailGuru?.phone || ""}
                    maxLength={13}
                    minLength={11}
                    onChange={(e) =>
                      setDetailGuru((prev) => ({
                        ...prev,
                        phone: e.target.value
                        ,
                      }))
                    }
                    className={`w-full rounded-md py-2 px-4 text-sm font-medium border border-gray-400 placeholder-black dark:bg-dark_net-ter ${
                      detailGuru?.phone ? "text-black dark:text-slate-100" : "text-netral-20"
                    }`}
                  />
                </div>
              </div>
              <div className="w-full md:flex md:space-x-11 space-y-2 md:space-y-0">
                <div className="w-full lg:w-1/2 space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium">Jenis Kelamin</label>
                  <div className="flex py-1 md:py-4 space-x-8">
                  {["Laki-Laki", "Perempuan"].map((gender, index) => {
                    const isChecked =
                      detailGuru?.gender === gender;
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-[18px]"
                      >
                        <input
                          id={gender}
                          type="radio"
                          name="gender"
                          checked={isChecked}
                          disabled
                          className={`w-4 h-4 border-gray-300 focus:ring-2 focus:ring-pri-main 
                            disabled:bg-pri-main disabled:border-pri-main bg-gray-100 
                            dark:bg-gray-700 dark:border-gray-600`}
                        />
                        <label
                          htmlFor={gender}
                          className="text-sm font-medium text-black dark:text-slate-100"
                        >
                          {gender}
                        </label>
                      </div>
                    );
                  })}
                </div>
                </div>
                
              </div>
              <div className="space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">Agama</label>
                  <input type="text" 
                    placeholder="Kristen"
                    disabled
                    value={detailGuru?.religion || ""}
                    className="text-netral-40 w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                  />
              </div>
              <div className="w-full md:flex md:space-x-11 space-y-2 md:space-y-0">
                <div className="w-full md:w-1/2 space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium">Tempat Lahir</label>
                  <input type="text" 
                    disabled
                    value={detailGuru?.birthPlace || ""}
                    placeholder="Semarang"
                    className="text-netral-40 w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                  />
                </div>
                <div className="w-full md:w-1/2  space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium">Tanggal Lahir</label>
                  <input 
                    type="text" 
                    value={format(detailGuru?.birthDate || new Date() , "dd/MM/yyyy")}                    
                    placeholder="Pilih Tanggal"
                    disabled
                    className="text-netral-40 w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                  />
                </div>
              </div>
              <div className="w-full flex justify-center md:justify-end pt-6 md:pt-8 lg:pt-[50px]">
                <button 
                type="submit"
                  className="w-full md:w-[147px] px-2 py-2.5 rounded-full md:rounded-md text-white text-sm font-medium bg-[#0841e2] hover:bg-blue-700 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
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
    <div>
      <ToastContainer />
      {croppingImage && (
        <ImageCropper
          image={croppingImage}
          onCropComplete={handleCropComplete}
          onCancel={() => setCroppingImage(null)}
        />
      )}
      <h1 className="text-black dark:text-slate-100 text-xl font-semibold ">Profil Pengguna</h1>
      <div className="w-full py-5 mt-3 md:mt-[25px]">
        <div className="w-full flex border-b-[1.5px] border-[#0841e2] space-x-4">
          <button 
            onClick={() => setActiveTab("editProfile")}
            className={`w-36 px-4 py-[13.5px] ${activeTab === "editProfile" ? "bg-[#0841e2] text-white" : "bg-white text-[#0841e2]"} rounded-t-md text-sm font-semibold justify-center items-center gap-2.5 hover:bg-blue-800 hover:text-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400 dark:hover:shadow-gray-700 cursor-pointer`}
            >Edit Profil
          </button>
          <button 
            onClick={() => setActiveTab("changePassword")}
            className={`w-36 px-4 py-[13.5px] ${activeTab === "changePassword" ? "bg-[#0841e2] text-white" : "bg-white text-[#0841e2]"} rounded-t-md text-sm font-semibold justify-center items-center gap-2.5 hover:bg-blue-800 hover:text-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400 dark:hover:shadow-gray-700 cursor-pointer`}
            >Ubah Kata Sandi
          </button>
        </div>
        <div className="w-full py-5 px-2 md:p-[25px]">
          {renderContent()} 
        </div>
      </div>
    </div>
  )
}