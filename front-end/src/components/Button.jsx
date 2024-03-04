import React from 'react'

const Button = ({ label,  addedStyles, handleClick  }) => {
  return (
    <button className={` w-3/6 p-2 rounded-md hover:bg-[#0f515a] ${addedStyles}`} onClick={handleClick}> 
      {label}
    </button>
  )
}

export default Button