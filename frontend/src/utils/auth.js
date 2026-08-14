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

    console.log("decoded data is", decoded.exp * 1000 - Date.now())
    if (timeUntilExpiry <= 0) {
      localStorage.removeItem("token");
      // window.location.href = "/login";
      return;
    }

    setTimeout(() => {
      localStorage.removeItem("token");
      toast.error("Your session end please login!")
      // window.location.href = "/login";
    }, timeUntilExpiry);

  } catch (error) {
    localStorage.removeItem("token");
  }
};