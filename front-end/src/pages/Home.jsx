import { useEffect, useState } from 'react'
import UserView from '../components/UserView'
import { daysOfWeek } from '../constants';
import DialogCom from '../components/DialogCom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { ChatBubbleBottomCenterTextIcon, PaperClipIcon, PencilIcon, TrashIcon, PlusIcon, ExclamationCircleIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs';
import { AddDoctor } from '../API/doctor';
import { ShowlLoader } from '../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import { UpateUser } from '../API/users';
import Etable from '../components/Etable';




const Home = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  console.log(user);
  const [open, setOpen] = useState(false)
  const [dia, setDia] = useState(null)
  const [isChecked, setIsChecked] = useState(
    new Array(daysOfWeek.length).fill(false)
  )
  const [daySlots, setDaySlots] = useState([{ startTime: null, endTime: null }])
  const [sunVal, setSanVal] = useState([{ startTime: null, endTime: null }])
  const [monVal, setMonVal] = useState([{ startTime: null, endTime: null }])
  const [tuesVal, setTuesVal] = useState([{ startTime: null, endTime: null }])
  const [wensVal, setWensVal] = useState([{ startTime: null, endTime: null }])
  const [thursVal, setThursVal] = useState([{ startTime: null, endTime: null }])
  const [friVal, setFriVal] = useState([{ startTime: null, endTime: null }])
  const [saturVal, setSaturVal] = useState([{ startTime: null, endTime: null }])
  const [isSlotUpdated, setIsSlotUpdated] = useState(false)
  const [startAt, setStartAt] = useState(null)
  const [updateProfile, setUpdateProfile] = useState({
    firstName: false,
    lastName: false,
    email: false,
    office: false,
    imgProfile: false
  })
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dep: "",
    startTime: "",
    endTime: "",
    days: [],
    officeRoom: "",
    imgProfile: ""
  })


  const handleSunPeriodsChange = (start, end, i) => {
    const inputData = [...sunVal]
    console.log(dayjs(end).diff(start));
    if (dayjs(end).diff(start) > 0) {

      inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A") }
      setIsSlotUpdated(!isSlotUpdated)

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
      setIsSlotUpdated(!isSlotUpdated)

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
      setIsSlotUpdated(!isSlotUpdated)

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
      setIsSlotUpdated(!isSlotUpdated)

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
      setIsSlotUpdated(!isSlotUpdated)

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
      setIsSlotUpdated(!isSlotUpdated)

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
      setIsSlotUpdated(!isSlotUpdated)

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
  useEffect(() => {
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

    setForm(prevState => {
      return {
        ...prevState,
        days: daySlots
      }
    })
  }, [isSlotUpdated])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("here");
    console.log(form);





    // setDaySlots([
    //   {
    //     day: "Sunday",
    //     slots: sunVal
    //   },
    //   {
    //     day: "Monday",
    //     slots: monVal
    //   },
    //   {
    //     day: "Tuesday",
    //     slots: tuesVal
    //   },
    //   {
    //     day: "Wednesday",
    //     slots: wensVal
    //   }, 
    //   {
    //     day: "Thursday",
    //     slots: thursVal
    //   },
    //   {
    //     day: "Friday",
    //     slots: friVal
    //   },
    //   {
    //     day: "Saturday",
    //     slots: saturVal
    //   },


    // ])


    console.log(daySlots);

    try {
      dispatch(ShowlLoader(true))
      const response = await UpateUser(form)({
        ...form,
        id: JSON.parse(localStorage.getItem("user")).id,


      })

      if (response.success) {
        message.success(response.message)
        navigate('/profile')

        // console.log(form);
      } else {
        message.error(response.message)
      }


    } catch (error) {
      dispatch(ShowlLoader(false))
    }




  }

  const handleAdd = (index) => {
    switch (index) {
      case 0:
        const sun = [...sunVal, [{ startTime: null, endTime: null }]]
        setSanVal(sun)
        console.log(sunVal);
        break;
      case 1:
        const mon = [...monVal, [{ startTime: null, endTime: null }]]
        setMonVal(mon)
        break;
      case 2:
        const tues = [...tuesVal, [{ startTime: null, endTime: null }]]
        setTuesVal(tues)
        break;
      case 3:
        const wens = [...wensVal, [{ startTime: null, endTime: null }]]
        setWensVal(wens)
        break;
      case 4:
        const thurs = [...thursVal, [{ startTime: null, endTime: null }]]
        setThursVal(thurs)
        break;
      case 5:
        const fri = [...friVal, [{ startTime: null, endTime: null }]]
        setFriVal(fri)
        break;
      case 6:
        const satur = [...saturVal, [{ startTime: null, endTime: null }]]
        setSaturVal(satur)
    }

  }






  return (
    <div className='student-page flex flex-col   '>

      {user.role === "user" ?
        <UserView>

        </UserView>
        :
        <div className='flex flex-col w-full flex-wrap   '>
          <div className="mt-10 divide-y divide-gray-200  
           w-2/6 md:w-full max-md:w-full  bg-white/90 py-4  ">
            <div className="space-y-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
            </div>

            <div className="flex flex-col ">

              <div className="flex w-full justify-start gap-1 flex-wrap mt-2">
                <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600  w-[300px] ">
                  <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                    placeholder="e.g Yousef"
                  />
                </div>
                <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 w-[300px] ">
                  <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                    placeholder="e.g AlSueaileh"
                  />
                </div>
                <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 w-[300px]  ">
                  <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                    Office No
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                    placeholder="e.g 2000"
                  />
                </div>
                <div className="flex ml-auto items-center gap-2">
                  <div>
                    <button
                      type="button"
                      className="rounded-md bg-[#ffffffa8] px-3 py-2 text-sm font-semibold text-[#0b5a4dcc] shadow-sm hover:bg-white/20"
                    >
                      Change avatar
                    </button>

                  </div>

                  <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>

                </div>
              </div>


            </div>

          </div>
          <div className="mt-10 divide-y divide-gray-200 
            p-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900"> Office hours</h3>

            </div>
            <div className="mt-6">

              <div className='mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4'>
                {daysOfWeek.map((day, index) => (
                  <div key={day.title} className='flex items-center '>
                    {/* <div className="flex items-center m-2 justify-between w-[120px  " key={day.key}>
                      <input
                        id={day.shortcut}
                        type="checkbox"
                        value={day.title}
                        onChange={(e) => handleChange(e, index)}
                        className="checkbox"
                        name='days'


                      />
                      <label htmlFor={day.shortcut} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{day.title}</label>

                    </div> */}

                    <li key={day.key} className="col-span-1 cursor-pointer flex rounded-md shadow-sm"
                      onClick={() => {
                        setOpen(true)
                        setDia(index)

                      }}
                    >
                      <div
                        className={`${day.bgColor}  flex  w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white`}

                      >
                        {day.initials}
                      </div>
                      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                        <div className="flex-1 truncate px-4 py-2 text-sm">
                          <a  className="font-medium text-gray-900 hover:text-gray-600">
                            {day.title}
                          </a>
                          <p className="text-gray-500">17 Members</p>
                        </div>
                        <div className="flex-shrink-0 pr-2">
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>


                    {/* <span

                      onClick={() => {
                        setOpen(true)
                        setDia(index)

                      }} className={` ${!isChecked[index] ? "ml-auto bg-[#ff010180] text-[#ffffff] pointer-events-none" : ""} inline-flex ml-auto cursor-pointer items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20`}>
                      Edit
                    </span> */}
                    {dia === index ? <DialogCom open={open} onClose={() => setOpen(false)} >
                      <h1>{dia}</h1>
                      {dia === index ? <form className="relative mt-4 flex gap-4" onSubmit={handleSubmit}>
                        <span
                          onClick={() => {
                            handleAdd(index)

                          }}
                          className="inline-flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                          Add period
                        </span>

                        <button type='button' onClick={(e) => {
                          let x = 1
                          for (let index = 0; index < x; index++) {

                            handleSubmit(e)

                          }
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
           bg-slate-50 p-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900"> Office hours</h3>

            </div>
            <div className="mt-6">
              <Etable/>


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