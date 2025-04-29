import React, { useState } from "react";
import { Eye, EyeSlash } from "iconsax-react";
import { toast } from "react-toastify";
import { change_password } from "@/app/api/ApiAuth";
import EditPopUp from "@/app/component/EditPopUp";

export default function ChangePasswordForm({ fetchData }) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const [error, setError] = useState(false);
  const [errors, setErrors] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (formData.newPassword === formData.newPasswordConfirmation) {
      setIsEdit(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    const payload = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      newPasswordConfirmation: formData.newPasswordConfirmation,
    };

    try {
      const response = await change_password(payload);
      if (response && response.status === 200) {
        toast.success(response.data.message);
        fetchData?.();
        setError(false);
        setErrors(false);
      } else {
        setErrors(true);
      }
    } catch (err) {
      setErrors(true);
    } finally {
      setIsLoading(false);
      setIsEdit(false);
      setFormData({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
      });
    }
  };

  return (
    <div className="mt-3 md:mt-6 text-black">
      {isEdit && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <EditPopUp onCancel={() => setIsEdit(false)} onConfirm={handleChangePassword} isLoading={isLoading}/>
        </div>
      )}

      <form onSubmit={handleEdit}>
        {/* Kata Sandi Lama */}
        <div className="space-y-[5px] mb-5">
          <label className="text-black dark:text-slate-100 text-sm font-medium">Kata Sandi Lama</label>
          <div className="relative w-full">
            <input
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Masukkan kata sandi lama"
              type={showOldPassword ? "text" : "password"}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200 bg-white text-gray-900 placeholder-gray-400 pr-12
                ${error || errors ? "border-err-main focus:ring-err-main" : "border-gray-300 focus:ring-pri-main"}
              `}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <EyeSlash size="20" color="#7F7F7F" /> : <Eye size="20" color="#7F7F7F" />}
            </button>
          </div>
        </div>

        {/* Kata Sandi Baru */}
        <div className="space-y-[5px] mb-5">
          <label className="text-black dark:text-slate-100 text-sm font-medium">Kata Sandi Baru</label>
          <div className="relative w-full">
            <input
              name="newPassword"
              minLength={8}
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Masukkan kata sandi baru"
              type={showPassword ? "text" : "password"}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200 bg-white text-gray-900 placeholder-gray-400 pr-12
                ${error || errors ? "border-err-main focus:ring-err-main" : "border-gray-300 focus:ring-pri-main"}
              `}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash size="20" color="#7F7F7F" /> : <Eye size="20" color="#7F7F7F" />}
            </button>
          </div>
          {error && (
            <span className="text-xs text-err-main absolute">
              Kata sandi baru dan konfirmasi kata sandi baru harus sama!
            </span>
          )}
        </div>

        {/* Konfirmasi Kata Sandi Baru */}
        <div className="space-y-[5px] mb-5">
          <label className="text-black dark:text-slate-100 text-sm font-medium">Konfirmasi Kata Sandi Baru</label>
          <div className="relative w-full">
            <input
              name="newPasswordConfirmation"
              value={formData.newPasswordConfirmation}
              minLength={8}
              onChange={handleChange}
              placeholder="Masukkan kata sandi baru lagi"
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200 bg-white text-gray-900 placeholder-gray-400 pr-12
                ${error || errors ? "border-err-main focus:ring-err-main" : "border-gray-300 focus:ring-pri-main"}
              `}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeSlash size="20" color="#7F7F7F" /> : <Eye size="20" color="#7F7F7F" />}
            </button>
          </div>
          {error && (
            <span className="text-xs text-err-main">
              Kata sandi baru dan konfirmasi kata sandi baru harus sama!
            </span>
          )}
        </div>

        <div className="w-full flex justify-center md:justify-end pt-6 md:pt-8 lg:pt-[50px]">
          <button
            className="w-3/4 md:w-[147px] px-2 py-2.5 rounded-md text-white text-sm font-medium bg-[#0841e2] hover:bg-blue-700 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
