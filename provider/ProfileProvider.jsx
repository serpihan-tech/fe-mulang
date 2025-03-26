"use client";
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const linkImg = sessionStorage.getItem("profile_img");
  const [profileImg, setProfileImg] = useState(
    linkImg ? `${baseUrl}/image/${linkImg}` : null
  );

  return (
    <ProfileContext.Provider value={{ profileImg, setProfileImg }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);