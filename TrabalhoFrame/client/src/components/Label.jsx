import React from 'react'

const Label = ({htmlFor, text}) => {
  return (
    <label
    htmlFor={htmlFor}
    className="block text-sm/6 font-medium text-gray-900 mb-2"
  >
    {text}
  </label>
  )
}

export default Label
