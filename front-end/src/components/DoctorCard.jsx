import React from 'react'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'


export const DoctorCard = ({ firstName, lastName, office, dep, email, phone, handleClick }) => {

    return (
        <div className="flex flex-row justify-between items-start flex-wrap">
            <div className="flex-shrink-0 mt-2 flex justify-center items-center flex-row-reverse ">
                <h1 className='ml-2 font-semibold'>Dr. {firstName} {lastName}</h1>
                <img
                    className="h-16 w-16 rounded-md"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
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
