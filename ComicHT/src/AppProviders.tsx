import { ReactNode } from "react";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";

// Tạo 1 "Provider tổng"
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ToastProvider>
      <AuthProvider>{children} </AuthProvider>
    </ToastProvider>
  );
};
