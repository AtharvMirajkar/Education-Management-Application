import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const UserContext = createContext();

// Custom hook to use the context
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Load user data from local storage on component mount
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : {}; // Provide a default empty object if no data in localStorage
  });

  // Update user data and store it in local storage
  const updateUser = (data) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
