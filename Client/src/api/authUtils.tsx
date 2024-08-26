import { Dispatch, SetStateAction } from "react";

export const login = (setIsLoggedin: Dispatch<SetStateAction<boolean>>, setEmail: Dispatch<SetStateAction<string>>, email: string) => {
    // Simulate a login process
    setIsLoggedin(true);
    setEmail(email);
  };
  
  // Utility function to handle logout
  export const logout = (setIsLoggedin: Dispatch<SetStateAction<boolean>>, setEmail: Dispatch<SetStateAction<string>>) => {
    // Simulate a logout process
    setIsLoggedin(false);
    setEmail("");
  };