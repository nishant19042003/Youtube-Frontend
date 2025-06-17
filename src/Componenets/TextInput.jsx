import React from "react";

export function TextInput({ label = "Your Name", placeholder = "Enter your name...", ...props }) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
}
