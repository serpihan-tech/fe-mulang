"use client";
import { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext({
  showBreadcrumb: false,
  setShowBreadcrumb: () => {},
});

export const BreadcrumbProvider = ({ children }) => {
  const [showBreadcrumb, setShowBreadcrumb] = useState(false);
  
  return (
    <BreadcrumbContext.Provider value={{ showBreadcrumb, setShowBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => useContext(BreadcrumbContext);