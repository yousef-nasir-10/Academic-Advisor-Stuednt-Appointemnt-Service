import React from 'react'

export const DoctorCard = ({firstName, lastName, website, dep, email, phone, handleClick}) => {
    
    return (
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">

            <div class="flex flex-col items-center justify-center w-full p-2">
                {/* <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" /> */}
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{firstName} {lastName}</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">{email}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{dep} - {phone} - {website}</span>
                <div class="flex mt-4 md:mt-6 justify-center w-full items-center self-center">
                    <b href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer" onClick={handleClick}>Verify appointment availability  </b>
                    {/* <a class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a> */}
                </div>
            </div>
        </div>
    )
}
