import React from "react";

export default function FormInput({ name, label, ...rest }) {
  return (
    <div className="mb-2 flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        className="my-2 w-full rounded border border-gray-300 p-2"
        name={name}
        {...rest}
      />
    </div>
  );
}
