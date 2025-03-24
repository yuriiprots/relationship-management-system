import React from "react";

export default function Logo() {
  return (
    <div className="flex justify-center">
      <img
        src={import.meta.env.BASE_URL + "/assets/logo_dark.png"}
        alt="Logo"
      />
    </div>
  );
}
