"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    const linkImg = sessionStorage.getItem("profile_img");
    setProfileImg(linkImg ? `${baseUrl}/image/${linkImg}` : null);
  }, []); // Hanya dijalankan setelah komponen di-mount (client-side)

  return (
    <ProfileContext.Provider value={{ profileImg, setProfileImg }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
