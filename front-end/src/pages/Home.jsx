import { useEffect, useState } from 'react'
import UserView from '../components/UserView'
import { daysOfWeek } from '../constants';
import DialogCom from '../components/DialogCom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { ChatBubbleBottomCenterTextIcon, PaperClipIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs';




const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  console.log(user);
  const [open, setOpen] = useState(false)
  const [dia, setDia] = useState(null)

  const [sunVal, setSanVal] = useState([])
  const [monVal, setMonVal] = useState([])
  const [tuesVal, setTuesVal] = useState([])
  const [wensVal, setWensVal] = useState([])
  const [thursVal, setThursVal] = useState([])
  const [friVal, setFriVal] = useState([])
  const [saturVal, seSaturVal] = useState([])

  const handleSunPeriodsChange = (start ,end ,i) => {
    const inputData = [...sunVal]
    inputData[i] = {startTime: start, endTime: end }
    setSanVal(inputData)
  }
  console.log(sunVal);

  const handleAdd = (index) => {
    switch (index) {
      case 0:
        const sun = [...sunVal, []]
        setSanVal(sun)
        console.log(sunVal);
        break;
      case 1:
        const mon = [...monVal, []]
        setMonVal(mon)
        break;
      case 2:
        const tues = [...tuesVal, []]
        setTuesVal(tues)
        break;
      case 3:
        const wens = [...wensVal, []]
        setWensVal(wens)
        break;
      case 4:
        const thurs = [...thursVal, []]
        setThursVal(thurs)
        break;
      case 5:
        const fri = [...friVal, []]
        setFriVal(fri)
        break;
      case 6:
        const satur = [...saturVal, []]
        seSaturVal(satur)
    }

  }




  return (
    <div className='student-page flex flex-col   '>

      {user.role === "user" ?
        <UserView>

        </UserView>
        :
        <div className='flex flex-row w-full flex-wrap   '>
          <div className="mt-10 divide-y divide-gray-200  
           w-2/6 md:w-3/6 max-md:w-full  bg-white/90 p-4  ">
            <div className="space-y-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>

            </div>
            <div className="mt-6  ">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow">Chelsea Hagon</span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-[#25705a] hover:text-purple-500  "
                      >
                        Update
                      </button>
                    </span>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                  <dt className="text-sm font-medium text-gray-500">Photo</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </span>
                    <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-[#25705a] hover:text-purple-500  "
                      >
                        Update
                      </button>
                      <span className="text-gray-300" aria-hidden="true">
                        |
                      </span>
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-[#702535] hover:text-purple-500  "
                      >
                        Remove
                      </button>
                    </span>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow">chelsea.hagon@example.com</span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-[#25705a] hover:text-purple-500  "
                      >
                        Update
                      </button>
                    </span>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">Job title</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow">Human Resources Manager</span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-[#25705a] hover:text-purple-500  "
                      >
                        Update
                      </button>
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="mt-10 divide-y divide-gray-200 
          w-2/6 md:w-3/6 max-md:w-full bg-slate-50 p-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900"> Office hours</h3>

            </div>
            <div className="mt-6">

              <div className='flex flex-col  justify-center flex-wrap '>
                {daysOfWeek.map((day, index) => (
                  <div className='flex items-center '>
                    <div className="flex items-center m-2 justify-between w-[120px  " key={day.key}>
                      <input
                        id={day.shortcut}
                        type="checkbox"
                        value={day.title}
                        // onChange={handleChange}
                        className="checkbox"
                        name='days'


                      />
                      <label htmlFor={day.shortcut} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{day.title}</label>

                    </div>


                    <span
                      onClick={() => {
                        setOpen(true)
                        setDia(index)

                      }} className="inline-flex ml-auto cursor-pointer items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Edit
                    </span>
                    {dia === index ? <DialogCom open={open} onClose={() => setOpen(false)} >
                      <h1>{dia}</h1>

                      {
                        index === 0 ?
                          sunVal.map((data, i) => (
                            <div>

                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker']}>

                                  <TimePicker
                                    label="Controlled picker"
                                    value={sunVal[i]}
                                    onChange={(newValue) => handleSunPeriodsChange(dayjs(newValue).format("hh:mm A"), null, i)}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker']}>

                                  <TimePicker
                                    label="Controlled picker"
                                    value={sunVal[i]}
                                    onChange={(newValue) => handleSunPeriodsChange(dayjs(newValue).format("hh:mm A"), null, i)}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>

                              <div className="relative mt-2">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                  <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center">
                                  <span className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    <button
                                      type="button"
                                      className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                    >
                                      <span className="sr-only">Edit</span>
                                      <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                      type="button"
                                      className="relative inline-flex items-center bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                    >
                                      <span className="sr-only">Attachment</span>
                                      <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                      type="button"
                                      className="relative inline-flex items-center bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                    >
                                      <span className="sr-only">Annotate</span>
                                      <ChatBubbleBottomCenterTextIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                      type="button"
                                      className="relative inline-flex items-center rounded-r-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                    >
                                      <span className="sr-only">Delete</span>
                                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                  </span>
                                </div>
                              </div>


                            </div>
                          ))
                          :
                          index === 1 ? monVal.map(data => (
                            <div>m</div>
                          ))
                            :
                            index === 2 ? tuesVal.map(data => (
                              <div>m</div>
                            ))
                              :
                              index === 3 ? wensVal.map(data => (
                                <div>m</div>
                              ))
                                :
                                index === 4 ? thursVal.map(data => (
                                  <div>m</div>
                                ))
                                  :
                                  index === 5 ? friVal.map(data => (
                                    <div>m</div>
                                  ))
                                    :
                                    index === 6 ? saturVal.map(data => (
                                      <div>m</div>
                                    ))
                                      : ""

                      }
                      {/* <span
                        onClick={() => {
                          handleAdd(index)

                        }} className="inline-flex ml-auto cursor-pointer items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Add period
                      </span> */}
                      <div className="relative mt-4">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              handleAdd(index)

                            }}
                            className="inline-flex items-center gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            <PlusIcon className="-ml-1 -mr-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            Add period
                          </button>
                        </div>
                      </div>

                    </DialogCom> : " "}
                  </div>
                ))}









              </div>




            </div>
          </div>
          <div className="mt-10 divide-y divide-gray-200 
          w-2/6 md:w-3/6 max-md:w-full bg-slate-50 p-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900"> Office hours</h3>

            </div>
            <div className="mt-6">

            </div>
          </div>
          <div className="mt-10 divide-y divide-gray-200 
          w-2/6 md:w-3/6 max-md:w-full bg-slate-50 p-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900"> Office hours</h3>

            </div>
            <div className="mt-6">

            </div>
          </div>


        </div>

      }


    </div>
  )
}

export default Home