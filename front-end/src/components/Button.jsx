import React from 'react'

const Button = ({ label, bgColor, txtColor, addedStyles }) => {
  return (
    <button className={`${bgColor} ${txtColor} w-3/6    p-2 rounded-md hover:bg-[#0f515a] ${addedStyles}`}> {label}
    </button>
  )
}

export default Button