import React from 'react'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'


export const DoctorCard = ({ firstName, lastName, office, dep, email, phone, handleClick, avtar }) => {

  return (
    <div className="flex flex-row justify-between items-start flex-wrap">
      <div className="flex-shrink-0 mt-2 flex justify-center items-center flex-row-reverse ">
        <h1 className='ml-2 font-semibold'>Dr. {firstName} {lastName}</h1>
        {!avtar ?

          <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />

            </svg>
          </span> :
          <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">

            <img src={avtar ? avtar : ""} />
          </span>}
      </div>
      <div className="mt-4">

        <p className="text-md text-gray-500">
          <a href="#">{email}</a>
        </p>
        <p className="text-md text-gray-500">
          office: {office}
        </p>
      </div>

    </div>
  )
}
