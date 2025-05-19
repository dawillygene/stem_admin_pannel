import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 text-center">
      {message}
    </div>
  );
};

export default ErrorMessage;