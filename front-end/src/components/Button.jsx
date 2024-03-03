import React from 'react'

const Button = ({ label, addedStyles }) => {
  return (
    <button className={` w-3/6  2xl:w-[300px]    p-2 rounded-md hover:bg-[#0f515a] focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium  text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${addedStyles}`}> {label}
    </button>
  )
}

export default Button