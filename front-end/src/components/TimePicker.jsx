import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { IoIosArrowDropdownCircle } from "react-icons/io";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TimePicker({ timeNaming, timeCount, onChange }) {
    return (
        <div className='flex w-full flex-col items-center justify-center ' >
            <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Identification</h3>
            <ul className="time-container">

                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                        <input 
                            id="horizontal-list-radio-id" 
                            type="radio" 
                            value="" 
                            name="list-radio" 
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
                            style="--i:0"
                        />

                        <label for="horizontal-list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">State ID
                        </label>
                    </div>
                </li>


            </ul>


        </div>

    )
}


function name() {
    <Menu as="div" className="relative inline-block text-left">
        <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 max-h-10 ">
                {timeNaming}
                <IoIosArrowDropdownCircle />

            </Menu.Button>
        </div>

        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"

        >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  "   >
                <div className="py-1 h-[200px] overflow-auto "  >
                    {timeCount.map(h => (
                        <Menu.Item value={h.time} onClick={onChange} >
                            {({ active }) => (

                                <h1



                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}

                                    value={h.time}
                                >
                                    {h.time}
                                </h1>
                            )}
                        </Menu.Item>

                    ))}



                </div>
            </Menu.Items>
        </Transition>
    </Menu>
}