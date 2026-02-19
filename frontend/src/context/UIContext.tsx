"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface UIContextType {
  darkMode: boolean;
  nodeSync: boolean;
  identityMasking: boolean;
  activeHandshake: boolean;
  toggleDarkMode: () => void;
  toggleNodeSync: () => void;
  toggleIdentityMasking: () => void;
  setHandshake: (status: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [nodeSync, setNodeSync] = useState(true);
  const [identityMasking, setIdentityMasking] = useState(false);
  const [activeHandshake, setActiveHandshake] = useState(true);

  // Persistence
  useEffect(() => {
    const stored = localStorage.getItem("bhoomi_ui_settings");
    if (stored) {
      const parsed = JSON.parse(stored);
      setDarkMode(parsed.darkMode);
      setNodeSync(parsed.nodeSync);
      setIdentityMasking(parsed.identityMasking);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bhoomi_ui_settings", JSON.stringify({ darkMode, nodeSync, identityMasking }));
    
    // Apply theme
    if (darkMode) {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  }, [darkMode, nodeSync, identityMasking]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNodeSync = () => setNodeSync(!nodeSync);
  const toggleIdentityMasking = () => setIdentityMasking(!identityMasking);
  const setHandshake = (status: boolean) => setActiveHandshake(status);

  return (
    <UIContext.Provider value={{ 
      darkMode, 
      nodeSync, 
      identityMasking, 
      activeHandshake, 
      toggleDarkMode, 
      toggleNodeSync, 
      toggleIdentityMasking,
      setHandshake
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};
