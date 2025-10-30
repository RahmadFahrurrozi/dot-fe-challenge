import { useState } from "react";

export const useTogglePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    showPassword,
    togglePasswordVisibility,
    passwordType: showPassword ? "text" : "password",
  };
};
