import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const scheduleTokenExpiry = () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const decoded = jwtDecode(token);
    const expiryTime = decoded.exp * 1000; 
    const currentTime = Date.now();
    const timeUntilExpiry = expiryTime - currentTime;

  
    if (timeUntilExpiry <= 0) {
      localStorage.removeItem("token");
      return;
    }

    setTimeout(() => {
      localStorage.removeItem("token");
      toast.error("Your session end please login!")
    }, timeUntilExpiry);

  } catch (error) {
    localStorage.removeItem("token");
  }
};