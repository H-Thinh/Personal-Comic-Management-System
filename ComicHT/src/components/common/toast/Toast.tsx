import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type Props = {
  message: string;
  type: "success" | "error";
  onClose: () => void; // Không hiện gì cả
};

const Toast: React.FC<Props> = ({ message, type, onClose }) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const Icon = type === "success" ? FaCheckCircle : FaTimesCircle;

  return (
    <div
      className={`fixed top-6 right-6 z-[9999] px-5 py-3 rounded-xl text-white shadow-lg flex items-center gap-3 animate-fade-in ${bgColor}`}
    >
      <Icon size={20} />
      <span className="text-lg font-medium">{message}</span>
      <button
        className="ml-2 text-white"
        onClick={onClose}
        style={{ width: "10px", color: "red", backgroundColor: "transparent" }}
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
