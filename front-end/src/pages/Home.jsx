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
import { AddDoctor } from '../API/doctor';
import { ShowlLoader } from '../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';




const Home = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  console.log(user);
  const [open, setOpen] = useState(false)
  const [dia, setDia] = useState(null)
  const [isChecked, setIsChecked] = useState(
    new Array(daysOfWeek.length).fill(false)
  )
  const [daySlots, setDaySlots] = useState([])
  const [sunVal, setSanVal] = useState([])
  const [monVal, setMonVal] = useState([])
  const [tuesVal, setTuesVal] = useState([])
  const [wensVal, setWensVal] = useState([])
  const [thursVal, setThursVal] = useState([])
  const [friVal, setFriVal] = useState([])
  const [saturVal, setSaturVal] = useState([])
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dep: "",
    address: "",
    startTime: "",
    endTime: "",
    days: [],
    officeRoom: "",
    imgProfile: ""
  })

  const [startAt, setStartAt] = useState(null)

  const handleSunPeriodsChange = (start, end, i) => {
    const inputData = [...sunVal]
    console.log(dayjs(end).diff(start));
    if (dayjs(end).diff(start) > 0) {

      inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A") }

    } else {
      console.log("invalid period ");
    }
    setSanVal(inputData)


  }
  const handleMonPeriodsChange = (start, end, i) => {
    const inputData = [...monVal]
    console.log(dayjs(end).diff(start));
    if (dayjs(end).diff(start) > 0) {

      inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A") }

    } else {
      console.log("invalid period ");
    }
    setMonVal(inputData)
  }
  const handleTuesPeriodsChange = (start, end, i) => {
    const inputData = [...tuesVal]
    console.log(dayjs(end).diff(start));
    if (dayjs(end).diff(start) > 0) {

      inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A") }

    } else {
      console.log("invalid period ");
    }
    setTuesVal(inputData)
  }
  const handleWensPeriodsChange = (start, end, i) => {
    const inputData = [...wensVal]
    console.log(dayjs(end).diff(start));
    if (dayjs(end).diff(start) > 0) {

      inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A") }

    } else {
      console.log("invalid period ");
    }
    setWensVal(inputData)
  }
  const handleThursPeriodsChange = (start, end, i) => {
    const inputData = [...thursVal]
    console.log(dayjs(end).diff(start));
    if (dayjs(end).diff(start) > 0) {

      inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A") }

    } else {
      console.log("invalid period ");
    }
    setThursVal(inputData)
  }
  const handleFriPeriodsChange = (start, end, i) => {
    const inputData = [...friVal]
    console.log(dayjs(end).diff(start));
    if (dayjs(end).diff(start) > 0) {

      inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A") }

    } else {
      console.log("invalid period ");
    }
    setFriVal(inputData)
  }
  const handleSaturPeriodsChange = (start, end, i) => {
    const inputData = [...saturVal]
    console.log(dayjs(end).diff(start));
    if (dayjs(end).diff(start) > 0) {

      inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A") }

    } else {
      console.log("invalid period ");
    }
    setSaturVal(inputData)
  }

  function handleChange(event, position) {

    const { name, value, type, checked } = event.target
    setForm(prevStat => {
      return {
        ...prevStat,
        [name]: type === "checkbox" ? checked : value,

      }

    })

    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );

    setIsChecked(updatedCheckedState)

    if (checked) {

      setForm(prevState => {
        return {
          ...prevState,
          days: [...form.days, value]
        }

      })

    } else {

      setForm(prevState => {
        return {
          ...prevState,
          days: form.days.filter(item => item !== value)
        }

      })


    }
    console.log(isChecked);
    console.log(form);



  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("here");
    isChecked.forEach((element, index) => {
      
    });




    setDaySlots([
      {
        day: "Sunday",
        slots: sunVal
      },
      {
        day: "Monday",
        slots: monVal
      },
      {
        day: "Tuesday",
        slots: tuesVal
      },
      {
        day: "Wednesday",
        slots: wensVal
      }, 
      {
        day: "Thursday",
        slots: thursVal
      },
      {
        day: "Friday",
        slots: friVal
      },
      {
        day: "Saturday",
        slots: saturVal
      },

      
    ])


    console.log(daySlots);

    // try {
    //     dispatch(ShowlLoader(true))
    //     const response = await AddDoctor({
    //         ...form,
    //         userId: JSON.parse(localStorage.getItem("user")).id,
    //         status: "pending",

    //     })

    //     if (response.success) {
    //         message.success(response.message)
    //         navigate('/profile')

    //         // console.log(form);
    //     } else {
    //         message.error(response.message)
    //     }


    // } catch (error) {
    //     dispatch(ShowlLoader(false))
    // }




  }







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
        setSaturVal(satur)
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
                  <div key={day.title} className='flex items-center '>
                    <div className="flex items-center m-2 justify-between w-[120px  " key={day.key}>
                      <input
                        id={day.shortcut}
                        type="checkbox"
                        value={day.title}
                        onChange={(e) => handleChange(e, index)}
                        className="checkbox"
                        name='days'


                      />
                      <label htmlFor={day.shortcut} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{day.title}</label>

                    </div>


                    <span

                      onClick={() => {
                        setOpen(true)
                        setDia(index)

                      }} className={` ${!isChecked[index] ? "ml-auto bg-[#ff010180] text-[#ffffff] pointer-events-none" : ""} inline-flex ml-auto cursor-pointer items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20`}>
                      Edit
                    </span>
                    {dia === index ? <DialogCom open={open} onClose={() => setOpen(false)} >
                      <h1>{dia}</h1>
                      {dia === index ? <form className="relative mt-4 flex gap-4" onSubmit={handleSubmit}>
                        <span 
                          onClick={() => {handleAdd(index)}}
                          className="inline-flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                          Add period
                        </span>

                        <button type='button' onClick={(e) => {
                          handleSubmit(e)
                        }}>submit {dia}</button>


                      </form> : ""}

                      {
                        index === 0 ?
                          sunVal.map((data, i) => (
                            <div key={i}>

                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker']}>

                                  <TimePicker
                                    label="Starts at"
                                    value={saturVal[i] && sunVal[i].startTime}
                                    onChange={(newValue) => {
                                      setStartAt(dayjs(newValue))
                                      console.log(sunVal[i].startTime);
                                      handleSunPeriodsChange(dayjs(newValue), null, i)
                                    }}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker']}>

                                  <TimePicker
                                    label="Ends at "
                                    value={saturVal[i] && sunVal[i].endTime}
                                    onChange={(newValue) => handleSunPeriodsChange(startAt, dayjs(newValue), i)}
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
                          index === 1 ? monVal.map((data, i) => (
                            <div key={i}>

                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker']}>

                                  <TimePicker
                                    label="Starts at"
                                    value={monVal[i] && monVal[i].startTime}
                                    onChange={(newValue) => {
                                      setStartAt(dayjs(newValue))

                                      handleMonPeriodsChange(dayjs(newValue), null, i)
                                    }}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker']}>

                                  <TimePicker
                                    label="Ends at "
                                    value={monVal[i] && monVal[i].endTime}
                                    onChange={(newValue) => handleMonPeriodsChange(startAt, dayjs(newValue), i)}
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
                            index === 2 ? tuesVal.map((data, i) => (
                              <div key={i}>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={['TimePicker', 'TimePicker']}>

                                    <TimePicker
                                      label="Starts at"
                                      value={tuesVal[i] && tuesVal[i].startTime}
                                      onChange={(newValue) => {
                                        setStartAt(dayjs(newValue))

                                        handleTuesPeriodsChange(dayjs(newValue), null, i)
                                      }}
                                    />
                                  </DemoContainer>
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={['TimePicker', 'TimePicker']}>

                                    <TimePicker
                                      label="Ends at "
                                      value={tuesVal[i] && tuesVal[i].endTime}
                                      onChange={(newValue) => handleTuesPeriodsChange(startAt, dayjs(newValue), i)}
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
                              index === 3 ? wensVal.map((data, i) => (
                                <div key={i}>

                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker', 'TimePicker']}>

                                      <TimePicker
                                        label="Starts at"
                                        value={wensVal[i] && wensVal[i].startTime}
                                        onChange={(newValue) => {
                                          setStartAt(dayjs(newValue))

                                          handleWensPeriodsChange(dayjs(newValue), null, i)
                                        }}
                                      />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker', 'TimePicker']}>

                                      <TimePicker
                                        label="Ends at "
                                        value={wensVal[i] && wensVal[i].endTime}
                                        onChange={(newValue) => handleWensPeriodsChange(startAt, dayjs(newValue), i)}
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
                                index === 4 ? thursVal.map((data, i) => (
                                  <div key={i}>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DemoContainer components={['TimePicker', 'TimePicker']}>

                                        <TimePicker
                                          label="Starts at"
                                          value={thursVal[i] && thursVal[i].startTime}
                                          onChange={(newValue) => {
                                            setStartAt(dayjs(newValue))

                                            handleThursPeriodsChange(dayjs(newValue), null, i)
                                          }}
                                        />
                                      </DemoContainer>
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DemoContainer components={['TimePicker', 'TimePicker']}>

                                        <TimePicker
                                          label="Ends at "
                                          value={thursVal[i] && thursVal[i].endTime}
                                          onChange={(newValue) => handleThursPeriodsChange(startAt, dayjs(newValue), i)}
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
                                  index === 5 ? friVal.map((data, i) => (
                                    <div key={i}>

                                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker', 'TimePicker']}>

                                          <TimePicker
                                            label="Starts at"
                                            value={friVal[i] && friVal[i].startTime}
                                            onChange={(newValue) => {
                                              setStartAt(dayjs(newValue))

                                              handleFriPeriodsChange(dayjs(newValue), null, i)
                                            }}
                                          />
                                        </DemoContainer>
                                      </LocalizationProvider>
                                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker', 'TimePicker']}>

                                          <TimePicker
                                            label="Ends at "
                                            value={friVal[i] && friVal[i].endTime}
                                            onChange={(newValue) => handleFriPeriodsChange(startAt, dayjs(newValue), i)}
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
                                    index === 6 ? saturVal.map((data, i) => (
                                      <div key={i}>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <DemoContainer components={['TimePicker', 'TimePicker']}>

                                            <TimePicker
                                              label="Starts at"
                                              value={saturVal[i] && saturVal[i].startTime}
                                              onChange={(newValue) => {
                                                setStartAt(dayjs(newValue))

                                                handleSaturPeriodsChange(dayjs(newValue), null, i)
                                              }}
                                            />
                                          </DemoContainer>
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <DemoContainer components={['TimePicker', 'TimePicker']}>

                                            <TimePicker
                                              label="Ends at "
                                              value={saturVal[i] && saturVal[i].endTime}
                                              onChange={(newValue) => handleSaturPeriodsChange(startAt, dayjs(newValue), i)}
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
                                      : ""

                      }
                      {/* <span
                        onClick={() => {
                          handleAdd(index)

                        }} className="inline-flex ml-auto cursor-pointer items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Add period
                      </span> */}


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