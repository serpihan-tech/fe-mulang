"use client";
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileImg, setProfileImg] = useState(
    sessionStorage.getItem("profile_img") || null
  );

  return (
    <ProfileContext.Provider value={{ profileImg, setProfileImg }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);