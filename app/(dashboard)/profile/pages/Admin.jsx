import React, { useEffect, useState } from "react";
import { Edit } from "iconsax-react";
import Image from "next/image";
import { admin_profile, updateAdminProfile } from "@/app/api/admin/ApiProfile";
import ImageCropper from "@/app/component/ImageCropper";
import { toast } from "react-toastify";
import { useProfile } from "@/provider/ProfileProvider";
import getCroppedImg from "@/app/component/getCroppedImg";
import { useLoading } from "@/context/LoadingContext";
import ChangePasswordForm from "../../dashboard/_component/home/ChangePassword";
import { set } from "date-fns";

export default function AdminProfile() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
	const data = JSON.parse(sessionStorage.getItem("profile_data"));
  const adminId = data.data.profile.id;
	const { setProfileImg } = useProfile();
 	const [adminData, setAdminData] = useState({
		user:{
			email: "",
		},
		admin:{
			name: "",
			address: "",
			phone: "",
			profile_picture: "",
			user:{
				email: "",
			}
		}
	});
	const [imageSrc, setImageSrc] = useState(null);
	const [croppingImage, setCroppingImage] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const { setIsLoading } = useLoading();

	const fetchDetailAdmin = async () => {
		try {
			const data = await admin_profile(adminId);
			setAdminData({
				...data,
				user: {
					email: data?.admin?.user?.email || "",
				},
			});;
		} catch (error) {
			console.error("Gagal memuat data admin.", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchDetailAdmin();
	}, [adminId]);

	const handleInputChange = (section, field) => (e) => {
    const value = e.target.value;
    setAdminData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
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

    setAdminData((prev) => ({
      ...prev,
      admin: { ...prev.admin, profile_picture: base64 },
    }));
  };

  // console.log("adminData", adminData);
  // console.log("imageSrcs", baseUrl +"/image/"+adminData?.admin?.profilePicture);

  const [activeTab, setActiveTab] = useState("editProfile");

	const handleSubmit = async (e) => {
		const oldAdminEmail = adminData?.admin?.user?.email;
		const adminEmail = adminData?.user?.email;
    setIsLoading(true);

		e.preventDefault();

		const payload = {
			user: {
				email: adminEmail ? adminEmail: oldAdminEmail || "",
			},
			admin:{
				name: adminData?.admin.name || "",
				address: adminData?.admin.address|| "-",
				phone: adminData?.admin.phone || "-",
			},
		};

		try {
			console.log(payload)
			const response = await updateAdminProfile(
				adminId,
				payload,
				selectedFile
			);
			if (response.status == 200) {
				toast.success(response.data.message);
				const newProfileImg =
					baseUrl +
					"/file/" +
					response.data.admin.profilePicture;
				setProfileImg(newProfileImg);
				sessionStorage.setItem(
					"profile_img",
					response.data.admin.profilePicture
				) ;
				sessionStorage.setItem("full_name", response.data.admin.name);
				fetchDetailAdmin();
			}
		} catch (error) {
			toast.error(error);
			alert("Terjadi kesalahan saat memperbarui data.");
		} finally {
      setIsLoading(false);
    }
	};
	
	console.log("data:",adminId)
	console.log("adminData:",adminData)

  const renderContent = () => {
    if (activeTab === "editProfile") {
      return (
        <div>
					  {croppingImage && (
							<ImageCropper
								image={croppingImage}
								onCropComplete={handleCropComplete}
								onCancel={() => setCroppingImage(null)}
							/>
						)}
            <div className="flex justify-center items-center">
              <Image
                src={
                imageSrc
                  ? imageSrc
                  : baseUrl +
                    "/file/" +
                    adminData?.admin?.profilePicture
              }
                alt="Profile Photo"
                width={150}
                height={150}
                className="rounded-full w-[150px] h-[150px] object-cover"
              />
              <div className="bg-white rounded-lg w-[30px] h-[30px] top-14 right-11 cursor-pointer relative">
                <Edit size={30} color="blue"/>
								<input
									type="file"
									accept="image/jpeg, image/jpg, image/png"
									onChange={handleImageChange}
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
								
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="w-full flex space-x-11">
                <div className="w-1/2 space-y-[5px]">
                  <label className="text-black text-sm font-medium">Nama Lengkap</label>
                  <input type="text" 
                    value={adminData?.admin.name || ""}
										onChange={handleInputChange("admin", "name")}
                    className="w-full text-black rounded-md py-2 px-4 text-sm font-medium border border-gray-400 placeholder-black"
                  />
                </div>
                <div className="w-1/2 space-y-[5px]">
                  <label className="text-black text-sm font-medium">Email</label>
                  <input type="email" 
                    value={adminData?.user?.email}
										onChange={handleInputChange("user", "email")}
                    className="w-full text-black rounded-md py-2 px-4 text-sm font-medium border border-gray-400 placeholder-black"
                  />
                </div>
              </div>
              <div className="w-full flex space-x-11">
                <div className="w-1/2 space-y-[5px]">
                  <label className="text-black text-sm font-medium">Alamat</label>
                  <textarea
									  maxLength={255} 
										rows={2}
                    value={adminData?.admin?.address || ""}
										onChange={handleInputChange("admin", "address")}
                    className="w-full text-black rounded-md py-2 px-4 text-sm font-medium border border-gray-400 placeholder-black"
                  />
                </div>
                <div className="w-1/2 space-y-[5px]">
                  <label className="text-black text-sm font-medium">No. Telepon</label>
                  <input type="text"
										minLength={8}
										maxLength={15} 
                    value={adminData?.admin?.phone || "-"}
										onChange={handleInputChange("admin", "phone")}
                    className="w-full text-black rounded-md py-2 px-4 text-sm font-medium border border-gray-400 placeholder-black"
                  />
                </div>
              </div>
            
              <div className="w-full flex justify-end pt-[50px]">
                <button type="submit" className="w-[147px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-[#0841e2] hover:bg-blue-700 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
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
      <h1 className="text-black text-xl font-semibold ">Profil Pengguna</h1>
      <div className="w-full py-5 px-4 mt-[25px]">
        <div className="w-full flex border-b-[1.5px] border-[#0841e2] space-x-4">
          <button 
            onClick={() => setActiveTab("editProfile")}
            className={`w-36 px-4 py-[13.5px] ${activeTab === "editProfile" ? "bg-[#0841e2] text-white" : "bg-white text-[#0841e2]"} rounded-t-md text-sm font-semibold justify-center items-center gap-2.5 hover:bg-blue-800 hover:text-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400 cursor-pointer`}
            >Edit Profil
          </button>
          <button 
            onClick={() => setActiveTab("changePassword")}
            className={`w-36 px-4 py-[13.5px] ${activeTab === "changePassword" ? "bg-[#0841e2] text-white" : "bg-white text-[#0841e2]"} rounded-t-md text-sm font-semibold justify-center items-center gap-2.5 hover:bg-blue-800 hover:text-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400 cursor-pointer`}
            >Ubah Kata Sandi
          </button>
        </div>
        <div className="w-full p-[25px]">
          {renderContent()} 
        </div>
      </div>
    </div>
  )
}