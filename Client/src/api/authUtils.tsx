import { Dispatch, SetStateAction } from "react";

export const login = async (
  setIsLoggedin: Dispatch<SetStateAction<boolean>>
) => {
  try {
    // Simulate an API call for login
    await new Promise((resolve) => setTimeout(resolve, 100)); // Optional simulate network delay
    setIsLoggedin(true);

    // Optional handle errors if needed
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// Utility function to handle logout
export const logout = (
  setIsLoggedin: Dispatch<SetStateAction<boolean>>
) => {
  // Simulate a logout process
  setIsLoggedin(false);
};
