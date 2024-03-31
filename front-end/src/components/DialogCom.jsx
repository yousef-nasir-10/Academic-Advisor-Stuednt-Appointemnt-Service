import React from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { MdSchedule } from "react-icons/md";

function DialogCom({ open, onClose, mainText ,subText, icon, children }) {
  const cancelButtonRef = useRef(null)
  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-2 pt-2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6  ">
                <div className=' '>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    {/* <MdSchedule className="h-6 w-6 text-green-600" aria-hidden="true" /> */}
                    {icon}
                  </div>
                  <div className="mt-2 text-center sm:mt-2">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {mainText}
                      {/* Schedule your sesstion with Dr. mustafa */}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {subText}
                        {/* Remeber being on time increase your benfetits from sessions.  */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 sm:mt-2 ">
                  {children}

                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default DialogCom