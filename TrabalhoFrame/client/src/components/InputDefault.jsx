import React from "react";

const InputDefault = ({ onChange, value, id, name}) => {
  return (
    <input
    id={id}
    name={name}
      type="text"
      value={value}
      onChange={onChange}
      className="block px-2 outline-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm/6"
    />
  );
};

export default InputDefault;
