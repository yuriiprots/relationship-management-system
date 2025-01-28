import React from "react";

export default function FormInput(props) {
  const { label, type, name, value, onChange } = props;

  return (
    <div className="flex flex-col mb-2 ">
      <label>{label}</label>
      <input
        className="border border-gray-300 p-2 my-2 rounded w-full"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
