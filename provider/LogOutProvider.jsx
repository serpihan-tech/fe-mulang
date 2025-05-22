"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LogOutContext = createContext();

export const LogOutProvider = ({ children }) => {
    const [isLogOut, setIsLogOut] = useState(false);

    return (
        <LogOutContext.Provider value={{ isLogOut, setIsLogOut }} >
            {children}
        </LogOutContext.Provider>
    );
}

export const useLogOut = () => useContext(LogOutContext);