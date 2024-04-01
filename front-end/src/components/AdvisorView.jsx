import { useEffect, useRef, useState } from 'react'
import UserView from '../components/UserView'
import { daysOfWeek } from '../constants';
import DialogCom from '../components/DialogCom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { Switch } from '@headlessui/react'
import { ChatBubbleBottomCenterTextIcon, PaperClipIcon, PencilIcon, TrashIcon, PlusIcon, ExclamationCircleIcon, EllipsisVerticalIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs';
import { AddDoctor, GetDoctorById, UpdateAvtar, UpdateDaySlots, UpdateDoctor, UpdateProfile } from '../API/doctor';
import { ShowlLoader } from '../redux/loaderSlice';
import { useDispatch } from 'react-redux';

import Etable from '../components/Etable';
import { message } from 'antd';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import { GetDoctorAppointments } from '../API/appointments';

const storage = getStorage();
function AdvisorView() {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [open, setOpen] = useState(false)
    const [dia, setDia] = useState(null)
    const [isChecked, setIsChecked] = useState(
        new Array(daysOfWeek.length).fill(false)
    )
    const [doctor, setDoctor] = useState(null)
    const [daySlots, setDaySlots] = useState([])
    const [sunVal, setSanVal] = useState(doctor && doctor.days[0].slots || [{ startTime: null, endTime: null }])
    const [monVal, setMonVal] = useState([{ startTime: null, endTime: null }])
    const [tuesVal, setTuesVal] = useState([{ startTime: null, endTime: null }])
    const [wensVal, setWensVal] = useState([{ startTime: null, endTime: null }])
    const [thursVal, setThursVal] = useState([{ startTime: null, endTime: null }])
    const [friVal, setFriVal] = useState([{ startTime: null, endTime: null }])
    const [saturVal, setSaturVal] = useState([{ startTime: null, endTime: null }])
    const [isSlotUpdated, setIsSlotUpdated] = useState(false)
    const [startAt, setStartAt] = useState(null)
    const [startAtArray, setStartAtArray] = useState([[], [], [], [], [], [], []])
    const [endAtArray, SetendAtArray] = useState([[], [], [], [], [], [], []])

    console.log(sunVal);

    const [url, setUrl] = useState(null)
    console.log(doctor);
    console.log(doctor && doctor.days[0].slots);


    const [endAt, setEndAt] = useState(null)
    const [image, setImage] = useState(null)
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

    // used with days slots 
    const handleSunPeriodsChange = (start, end, i) => {
        const inputData = [...sunVal]
        if (dayjs(end).diff(start) > 0) {
            inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A"), enabled: true }
            setIsSlotUpdated(!isSlotUpdated)
        } else {
        }
        setSanVal(inputData)
    }
    const handleMonPeriodsChange = (start, end, i) => {
        const inputData = [...monVal]
        if (dayjs(end).diff(start) > 0) {
            inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A"), enabled: true }
            setIsSlotUpdated(!isSlotUpdated)
        } else {
        }
        setMonVal(inputData)
    }
    const handleTuesPeriodsChange = (start, end, i) => {
        const inputData = [...tuesVal]
        if (dayjs(end).diff(start) > 0) {
            inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A"), enabled: true }
            setIsSlotUpdated(!isSlotUpdated)
        } else {
        }
        setTuesVal(inputData)
    }
    const handleWensPeriodsChange = (start, end, i) => {
        const inputData = [...wensVal]
        if (dayjs(end).diff(start) > 0) {
            inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A"), enabled: true }
            setIsSlotUpdated(!isSlotUpdated)
        } else {
        }
        setWensVal(inputData)
    }
    const handleThursPeriodsChange = (start, end, i) => {
        const inputData = [...thursVal]
        if (dayjs(end).diff(start) > 0) {
            inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A"), enabled: true }
            setIsSlotUpdated(!isSlotUpdated)
        } else {
        }
        setThursVal(inputData)
    }
    const handleFriPeriodsChange = (start, end, i) => {
        const inputData = [...friVal]
        if (dayjs(end).diff(start) > 0) {
            inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A"), enabled: true }
            setIsSlotUpdated(!isSlotUpdated)
        } else {
        }
        setFriVal(inputData)
    }
    const handleSaturPeriodsChange = (start, end, i) => {
        const inputData = [...saturVal]
        if (dayjs(end).diff(start) > 0) {
            inputData[i] = { startTime: dayjs(start).format("hh:mm A"), endTime: dayjs(end).format("hh:mm A"), enabled: true }
            setIsSlotUpdated(!isSlotUpdated)
        } else {
        }
        setSaturVal(inputData)
    }

    //  used with day slots
    let text = ''
    switch (dia) {
        case 0:
            text = "Establish the schedule for Sunday's office hours."
            break;
        case 1:
            text = "Establish the schedule for Monday's office hours."
            break;
        case 2:
            text = "Establish the schedule for Tuesday's office hours."
            break;
        case 3:
            text = "Establish the schedule for Wednesday's office hours."
            break;
        case 4:
            text = "Establish the schedule for Thursday's office hours."
            break;
        case 5:
            text = "Establish the schedule for Frisday's office hours."
            break;
        case 6:
            text = "Establish the schedule for Saturday's office hours."
    }


    //  used with day slots
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


    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         dispatch(ShowlLoader(true))
    //         const response = await UpateDoctor(form)({
    //             ...form,
    //             id: JSON.parse(localStorage.getItem("user")).id,
    //         })
    //         if (response.success) {
    //             message.success(response.message)
    //             // navigate('/profile')
    //         } else {
    //             message.error(response.message)
    //         }
    //     } catch (error) {
    //         dispatch(ShowlLoader(false))
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setForm(prevState => {
            return {
                ...prevState,
                days: daySlots

            }
        })

        try {
            dispatch(ShowlLoader(true))
            const response = await UpdateProfile({
                firstName: !form.firstName ? doctor && doctor.firstName : form.firstName,
                lastName: !form.lastName ? doctor && doctor.lastName : form.lastName,
                officeRoom: !form.officeRoom ? doctor && doctor.officeRoom : form.officeRoom
                // status: "pending",

            }, user.id)

            if (response.success) {
                message.success(response.message)
                // navigate('/profile')

                // console.log(form);
            } else {
                message.error(response.message)
            }


        } catch (error) {
            dispatch(ShowlLoader(false))
        }




    }


    //  used with day slots
    const handleAdd = (index) => {
        switch (index) {
            case 0:
                const sun = [...sunVal, { startTime: null, endTime: null, enabled: false }]
                setSanVal(sun)
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



    //  used with day slots
    const sunEls = useRef([])
    const monEls = useRef([])
    const tuesEls = useRef([])
    const wensEls = useRef([])
    const thursEls = useRef([])
    const friEls = useRef([])
    const satrEls = useRef([])
    const addToRefsSun = (el) => {
        if (el && !sunEls.current.includes(el)) {
            sunEls.current.push(el)
        }
    }
    sunEls.current.splice(0, sunVal.length * 2);
    const addToRefsMon = (el) => {
        if (el && !monEls.current.includes(el)) {
            monEls.current.push(el)
        }
    }
    monEls.current.splice(0, monVal.length * 2);
    const addToRefsTues = (el) => {
        if (el && !tuesEls.current.includes(el)) {
            tuesEls.current.push(el)
        }
    }
    tuesEls.current.splice(0, tuesVal.length * 2);
    const addToRefsWens = (el) => {
        if (el && !wensEls.current.includes(el)) {
            wensEls.current.push(el)
        }
    }
    wensEls.current.splice(0, wensVal.length * 2);
    const addToRefsThurs = (el) => {
        if (el && !thursEls.current.includes(el)) {
            thursEls.current.push(el)
        }
    }
    thursEls.current.splice(0, thursVal.length * 2);
    const addToRefsFri = (el) => {
        if (el && !friEls.current.includes(el)) {
            friEls.current.push(el)
        }
    }
    friEls.current.splice(0, friVal.length * 2);
    const addToRefsSatr = (el) => {
        if (el && !satrEls.current.includes(el)) {
            satrEls.current.push(el)
        }
    }
    satrEls.current.splice(0, saturVal.length * 2);
    console.log(daySlots);

    daySlots && daySlots.forEach((element, i) => {
        // console.log(element.slots[0].startTime);
        element.slots.forEach((element, j) => {
            if (element.startTime === null || element.enabled === false) {
                console.log(i);
                console.log(j);
            }

        });
    });

    function numberOfperiods(i) {
        try {
            
            switch (i) {
                case 0:
                    let SunPeriods = 0
                    daySlots[i] && daySlots[i].slots.forEach((element, j) => {
                        if (!element.startTime === null || !element.enabled === false) {
                            SunPeriods++
                        }
                    });
                    return (<h1> {SunPeriods} Period/s added for this day</h1>)
    
                    break;
                case 1:
                    let MonPeriods = 0
                    daySlots[i] && daySlots[i].slots.forEach((element, j) => {
                        if (!element.startTime === null || !element.enabled === false) {
                            MonPeriods++
                        }
                    });
                    return (<h1> {MonPeriods} Period/s added for this day</h1>)
                    break;
                case 2:
                    let tuesPeriods = 0
                    daySlots[i] && daySlots[i].slots.forEach((element, j) => {
                        if (!element.startTime === null || !element.enabled === false) {
                            tuesPeriods++
                        }
                    });
                    return (<h1> {tuesPeriods} Period/s added for this day</h1>)
                    break;
                case 3:
                    let wensPeriods = 0
                    daySlots[i] && daySlots[i].slots.forEach((element, j) => {
                        if (!element.startTime === null || !element.enabled === false) {
                            wensPeriods++
                        }
                    });
                    return (<h1> {wensPeriods} Period/s added for this day</h1>)
                    break;
                case 4:
                    let thursPeriods = 0
                    daySlots[i] && daySlots[i].slots.forEach((element, j) => {
                        if (!element.startTime === null || !element.enabled === false) {
                            thursPeriods++
                        }
                    });
                    return (<h1> {thursPeriods} Period/s added for this day</h1>)
                    break;
                case 5:
                    let friPeriods = 0
                    daySlots[i] && daySlots[i].slots.forEach((element, j) => {
                        if (!element.startTime === null || !element.enabled === false) {
                            friPeriods++
                        }
                    });
                    return (<h1> {friPeriods} Period/s added for this day</h1>)
                    break;
                case 6:
                    let saturPeriods = 0
                    daySlots[i] && daySlots[i].slots.forEach((element, j) => {
                        if (!element.startTime === null || !element.enabled === false) {
                            saturPeriods++
                        }
                    });
                    return (<h1> {saturPeriods} Period/s added for this day</h1>)
            }
        } catch (error) {
            
        }



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
    }


    const inputRef = useRef(null)
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])


        }


    }

    console.log(image);
    const handleSubmitAvtar = () => {
        const imageRef = ref(storage, `Img${user.id}`)
        uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(imageRef).then(async (urlImage) => {
                    try {
                        const response = UpdateAvtar(urlImage, user.id)
                        if (!response.success) {
                            console.log(urlImage);
                            message.success(response.message)

                        } else {
                            console.log(response.message);
                            throw new Error(response.message)
                        }
                    } catch (error) {
                        message.error(error.message)
                        console.log(error);
                    }



                    setUrl(urlImage)

                }).catch(error => {
                    console.log(error);
                }).catch(error => {
                    console.log(error);
                })
                setImage(null)
            }).catch(error => {
                console.log(error);
            })
    }
    console.log(form);

    const getData = async () => {
        try {

            const response = await GetDoctorById(user.id)
            if (response.success) {
                console.log(response);
                // setSanVal(response.data.days[0].slots)
                setDaySlots(response.data.days)
                setSanVal(response.data.days[0].slots)
                setMonVal(response.data.days[1].slots)
                setTuesVal(response.data.days[2].slots)
                setWensVal(response.data.days[3].slots)
                setThursVal(response.data.days[4].slots)
                setFriVal(response.data.days[5].slots)
                setSaturVal(response.data.days[6].slots)

                setDoctor(response.data)

            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    useEffect(() => {
        getData()

    }, [])






    console.log(url);
    




    return (
        <div className='student-page flex flex-col   '>
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
                                    id="name"
                                    className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                                    placeholder="e.g Yousef"
                                    name="firstName"
                                    value={!form.firstName ? doctor && doctor.firstName : form.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 w-[300px] ">
                                <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                    Last Name
                                </label>
                                <input
                                    type="text"

                                    id="name"
                                    className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                                    name="lastName"
                                    value={!form.lastName ? doctor && doctor.lastName : form.lastName}
                                    onChange={handleChange}
                                    placeholder="e.g AlSueaileh"

                                />
                            </div>
                            <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 w-[300px]  ">
                                <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                    Office No
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                                    name="officeRoom"
                                    value={!form.officeRoom ? doctor && doctor.officeRoom : form.officeRoom}
                                    onChange={handleChange}
                                    placeholder="e.g 2000"
                                />
                            </div>
                            <div className="flex ml-auto items-center gap-2">
                                <div className='flex justify-center items-center gap-2'>
                                    <input
                                        style={{ display: 'none' }}
                                        ref={inputRef}
                                        type="file"
                                        onChange={handleImageChange}
                                    />
                                    <button
                                        type="button"
                                        className="rounded-md bg-[#ffffffa8] px-3 py-2 text-sm font-semibold text-[#0b5a4dcc] shadow-sm hover:bg-white/20 inline-flex items-center gap-x-1.5    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                                        onClick={() => {
                                            inputRef.current.click()
                                        }}
                                    >
                                        Change avatar
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={handleSubmitAvtar}
                                    >
                                        Save <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                                {!url && doctor && !doctor.imgProfile ?

                                    <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />

                                        </svg>
                                    </span> :
                                    <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">

                                        <img src={!url ? doctor && doctor.imgProfile : url} />
                                    </span>}
                            </div>


                        </div>
                        <div className='w-[200px] mt-4'>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-10 divide-y divide-gray-200 
            p-4">
                    <div className="space-y-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900"> Office hours</h3>
                    </div>
                    <div className="mt-6">
                        <div className='mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 '>
                            {daysOfWeek.map((day, index) => (
                                <div key={day.title} className='flex items-center  '>
                                    <li key={day.key} className="col-span-1 cursor-pointer flex rounded-md shadow-sm w-[300px]"
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
                                                <a className="font-medium text-gray-900 hover:text-gray-600">
                                                    {day.title}
                                                </a>
                                                <p className="text-gray-500">{numberOfperiods(index)}</p>
                                            </div>
                                        </div>
                                    </li>
                                    {dia === index ? <DialogCom open={open} subText={text} onClose={() => setOpen(false)} >
                                        {
                                            index === 0 ?
                                                sunVal.slice(0).reverse().map((data, i) => (
                                                    <div className='flex items-center justify-between border-b-2 py-2 flex-wrap ' key={i}>
                                                        <span
                                                            onClick={() => {
                                                                let m = ((i + 1) - 1) * 2
                                                                console.log(i, m);
                                                                sunEls.current[m].click()
                                                            }}
                                                            className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset w-[150px] ring-gray-200">
                                                            <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                <circle cx={3} cy={3} r={3} />
                                                            </svg>
                                                            <h1>{i + 1}</h1> Starts at: {startAtArray[0][i] ? startAtArray[0][i] : sunVal[i].startTime}
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                let n = (2 * (i + 1)) - 1
                                                                console.log(sunEls.current[n]);
                                                                sunEls.current[n].click()
                                                            }}
                                                            className="inline-flex items-center z-10 w-[150px] gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                                                            <svg className="h-1.5 w-1.5  fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                <circle cx={3} cy={3} r={3} />
                                                            </svg>
                                                            Ends at {sunVal[i].endTime}
                                                        </span>
                                                        { }
                                                        <div className=' hidden h-0 w-0 rounded-full '>
                                                            <LocalizationProvider
                                                                dateAdapter={AdapterDayjs}
                                                            >
                                                                <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                    <MobileTimePicker
                                                                        key={i}
                                                                        ref={addToRefsSun}
                                                                        label="Starts at"
                                                                        onChange={(newValue) => {
                                                                            setStartAt(dayjs(newValue))
                                                                            setStartAtArray(prevState => [...prevState, prevState[0][i] = dayjs(newValue).format("hh:mm A")])
                                                                            handleSunPeriodsChange(dayjs(newValue), null, i)
                                                                        }}
                                                                    />
                                                                </DemoContainer>
                                                            </LocalizationProvider>
                                                        </div>
                                                        <div className='h-0 w-0'>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                    <MobileTimePicker
                                                                        key={i + 1}
                                                                        className='hidden'
                                                                        label="Ends at "
                                                                        ref={addToRefsSun}
                                                                        value={endAtArray && endAtArray[0][i]}
                                                                        onChange={(newValue) => {
                                                                            setEndAt(dayjs(newValue))
                                                                            SetendAtArray(prevState => [...prevState, prevState[0][i] = dayjs(newValue).format("hh:mm A")])
                                                                            handleSunPeriodsChange(startAt, dayjs(newValue), i)
                                                                        }}
                                                                    />
                                                                </DemoContainer>
                                                            </LocalizationProvider>
                                                        </div>
                                                        <Switch
                                                            checked={daySlots[0].slots[i] && daySlots[0].slots[i].enabled}
                                                            onChange={() => {
                                                                let m = ((i + 1) - 1) * 2
                                                                let n = (2 * (i + 1)) - 1
                                                                let daySlotsShallow = [...daySlots]
                                                                let isEnabled = daySlotsShallow[0].slots[i] && daySlotsShallow[0].slots[i].enabled
                                                                isEnabled = isEnabled ? false : true
                                                                daySlotsShallow[0].slots[i] =
                                                                {
                                                                    startTime: daySlotsShallow[0].slots[i].startTime,
                                                                    endTime: daySlotsShallow[0].slots[i].endTime,
                                                                    enabled: isEnabled
                                                                }
                                                                console.log(daySlotsShallow);
                                                                setDaySlots(daySlotsShallow)
                                                            }}
                                                            className={classNames(
                                                                daySlots[0].slots[i] && daySlots[0].slots[i].enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                                            )}
                                                        >
                                                            <span className="sr-only">Use setting</span>
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    daySlots[0].slots[i] && daySlots[0].slots[i].enabled ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                )}
                                                            />
                                                        </Switch>
                                                    </div>
                                                ))
                                                :
                                                index === 1 ? monVal.slice(0).reverse().map((data, i) => (
                                                    <div className='flex items-center justify-between border-b-2 py-2 flex-wrap ' key={i}>
                                                        <span
                                                            onClick={() => {
                                                                let m = ((i + 1) - 1) * 2
                                                                monEls.current[m].click()
                                                            }}
                                                            className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset w-[150px] ring-gray-200">
                                                            <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                <circle cx={3} cy={3} r={3} />
                                                            </svg>
                                                            <h1>{i + 1}</h1> Starts at: {startAtArray[1][i] ? startAtArray[1][i] : monVal[i].startTime}
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                let n = (2 * (i + 1)) - 1
                                                                monEls.current[n].click()
                                                            }}
                                                            className="inline-flex items-center w-[150px] gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                                                            <svg className="h-1.5 w-1.5  fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                <circle cx={3} cy={3} r={3} />
                                                            </svg>
                                                            Ends at {monVal[i].endTime}
                                                        </span>
                                                        { }
                                                        <div className=' hidden h-0 w-0 rounded-full '>
                                                            <LocalizationProvider
                                                                dateAdapter={AdapterDayjs}
                                                            >
                                                                <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                    <MobileTimePicker
                                                                        key={i}
                                                                        ref={addToRefsMon}
                                                                        label="Starts at"
                                                                        onChange={(newValue) => {
                                                                            setStartAt(dayjs(newValue))
                                                                            setStartAtArray(prevState => [...prevState, prevState[1][i] = dayjs(newValue).format("hh:mm A")])
                                                                            handleMonPeriodsChange(dayjs(newValue), null, i)
                                                                        }}
                                                                    />
                                                                </DemoContainer>
                                                            </LocalizationProvider>
                                                        </div>
                                                        <div className='h-0 w-0'>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                    <MobileTimePicker
                                                                        key={i + 1}
                                                                        className='hidden'
                                                                        label="Ends at "
                                                                        ref={addToRefsMon}
                                                                        value={endAtArray && endAtArray[1][i]}
                                                                        onChange={(newValue) => {
                                                                            setEndAt(dayjs(newValue))
                                                                            SetendAtArray(prevState => [...prevState, prevState[0][i] = dayjs(newValue).format("hh:mm A")])
                                                                            handleMonPeriodsChange(startAt, dayjs(newValue), i)
                                                                        }}
                                                                    />
                                                                </DemoContainer>
                                                            </LocalizationProvider>
                                                        </div>
                                                        <Switch
                                                            checked={daySlots[1].slots[i] && daySlots[1].slots[i].enabled}
                                                            onChange={() => {
                                                                let m = ((i + 1) - 1) * 2
                                                                let n = (2 * (i + 1)) - 1
                                                                let daySlotsShallow = [...daySlots]
                                                                let slot = daySlotsShallow[1].slots[i]
                                                                let isEnabled = slot && slot.enabled
                                                                isEnabled = isEnabled ? false : true
                                                                daySlotsShallow[1].slots[i] =
                                                                {
                                                                    startTime: slot.startTime,
                                                                    endTime: slot.endTime,
                                                                    enabled: isEnabled
                                                                }
                                                                console.log(daySlotsShallow);
                                                                setDaySlots(daySlotsShallow)
                                                            }}
                                                            className={classNames(
                                                                daySlots[1].slots[i] && daySlots[1].slots[i].enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                                            )}
                                                        >
                                                            <span className="sr-only">Use setting</span>
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    daySlots[1].slots[i] && daySlots[1].slots[i].enabled ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                )}
                                                            />
                                                        </Switch>
                                                    </div>
                                                ))
                                                    :
                                                    index === 2 ? tuesVal.slice(0).reverse().map((data, i) => (
                                                        <div className='flex items-center justify-between border-b-2 py-2 flex-wrap ' key={i}>
                                                            <span
                                                                onClick={() => {
                                                                    let m = ((i + 1) - 1) * 2
                                                                    tuesEls.current[m].click()
                                                                }}
                                                                className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset w-[150px] ring-gray-200">
                                                                <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                    <circle cx={3} cy={3} r={3} />
                                                                </svg>
                                                                <h1>{i + 1}</h1> Starts at: {startAtArray[2][i] ? startAtArray[2][i] : tuesVal[i].startTime}
                                                            </span>
                                                            <span
                                                                onClick={() => {
                                                                    let n = (2 * (i + 1)) - 1
                                                                    tuesEls.current[n].click()
                                                                }}
                                                                className="inline-flex items-center w-[150px] gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                                                                <svg className="h-1.5 w-1.5  fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                    <circle cx={3} cy={3} r={3} />
                                                                </svg>
                                                                Ends at {tuesVal[i].endTime}
                                                            </span>
                                                            { }
                                                            <div className=' hidden h-0 w-0 rounded-full '>
                                                                <LocalizationProvider
                                                                    dateAdapter={AdapterDayjs}
                                                                >
                                                                    <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                        <MobileTimePicker
                                                                            key={i}
                                                                            ref={addToRefsTues}
                                                                            label="Starts at"
                                                                            onChange={(newValue) => {
                                                                                setStartAt(dayjs(newValue))
                                                                                setStartAtArray(prevState => [...prevState, prevState[2][i] = dayjs(newValue).format("hh:mm A")])
                                                                                handleTuesPeriodsChange(dayjs(newValue), null, i)
                                                                            }}
                                                                        />
                                                                    </DemoContainer>
                                                                </LocalizationProvider>
                                                            </div>
                                                            <div className='h-0 w-0'>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                        <MobileTimePicker
                                                                            key={i + 1}
                                                                            className='hidden'
                                                                            label="Ends at "
                                                                            ref={addToRefsTues}
                                                                            value={endAtArray && endAtArray[2][i]}
                                                                            onChange={(newValue) => {
                                                                                setEndAt(dayjs(newValue))
                                                                                SetendAtArray(prevState => [...prevState, prevState[2][i] = dayjs(newValue).format("hh:mm A")])
                                                                                handleTuesPeriodsChange(startAt, dayjs(newValue), i)
                                                                            }}
                                                                        />
                                                                        { }
                                                                    </DemoContainer>
                                                                </LocalizationProvider>
                                                            </div>
                                                            <Switch
                                                                checked={daySlots[2].slots[i] && daySlots[2].slots[i].enabled}
                                                                onChange={() => {
                                                                    let daySlotsShallow = [...daySlots]
                                                                    let slot = daySlotsShallow[2].slots[i]
                                                                    let isEnabled = slot && slot.enabled
                                                                    isEnabled = isEnabled ? false : true
                                                                    daySlotsShallow[2].slots[i] =
                                                                    {
                                                                        startTime: slot.startTime,
                                                                        endTime: slot.endTime,
                                                                        enabled: isEnabled
                                                                    }
                                                                    console.log(daySlotsShallow);
                                                                    setDaySlots(daySlotsShallow)
                                                                }}
                                                                className={classNames(
                                                                    daySlots[2].slots[i] && daySlots[2].slots[i].enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                                                )}
                                                            >
                                                                <span className="sr-only">Use setting</span>
                                                                <span
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        daySlots[2].slots[i] && daySlots[2].slots[i].enabled ? 'translate-x-5' : 'translate-x-0',
                                                                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                    )}
                                                                />
                                                            </Switch>
                                                        </div>
                                                    ))
                                                        :
                                                        index === 3 ? wensVal.slice(0).reverse().map((data, i) => (
                                                            <div className='flex items-center justify-between border-b-2 py-2 flex-wrap ' key={i}>
                                                                <span
                                                                    onClick={() => {
                                                                        let m = ((i + 1) - 1) * 2
                                                                        wensEls.current[m].click()
                                                                    }}
                                                                    className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset w-[150px] ring-gray-200">
                                                                    <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                        <circle cx={3} cy={3} r={3} />
                                                                    </svg>
                                                                    <h1>{i + 1}</h1> Starts at: {startAtArray[3][i] ? startAtArray[3][i] : wensVal[i].startTime}
                                                                </span>
                                                                <span
                                                                    onClick={() => {
                                                                        let n = (2 * (i + 1)) - 1
                                                                        wensEls.current[n].click()
                                                                    }}
                                                                    className="inline-flex items-center w-[150px] gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                                                                    <svg className="h-1.5 w-1.5  fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                        <circle cx={3} cy={3} r={3} />
                                                                    </svg>
                                                                    Ends at {wensVal[i].endTime}
                                                                </span>
                                                                { }
                                                                <div className=' hidden h-0 w-0 rounded-full '>
                                                                    <LocalizationProvider
                                                                        dateAdapter={AdapterDayjs}
                                                                    >
                                                                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                            <MobileTimePicker
                                                                                key={i}
                                                                                ref={addToRefsWens}
                                                                                label="Starts at"
                                                                                onChange={(newValue) => {
                                                                                    setStartAt(dayjs(newValue))
                                                                                    setStartAtArray(prevState => [...prevState, prevState[3][i] = dayjs(newValue).format("hh:mm A")])
                                                                                    handleWensPeriodsChange(dayjs(newValue), null, i)
                                                                                }}
                                                                            />
                                                                        </DemoContainer>
                                                                    </LocalizationProvider>
                                                                </div>
                                                                <div className='h-0 w-0'>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                            <MobileTimePicker
                                                                                key={i + 1}
                                                                                className='hidden'
                                                                                label="Ends at "
                                                                                ref={addToRefsWens}
                                                                                value={endAtArray && endAtArray[3][i]}
                                                                                onChange={(newValue) => {
                                                                                    setEndAt(dayjs(newValue))
                                                                                    SetendAtArray(prevState => [...prevState, prevState[3][i] = dayjs(newValue).format("hh:mm A")])
                                                                                    handleWensPeriodsChange(startAt, dayjs(newValue), i)
                                                                                }}
                                                                            />
                                                                            { }
                                                                        </DemoContainer>
                                                                    </LocalizationProvider>
                                                                </div>
                                                                <Switch
                                                                    checked={daySlots[3].slots[i] && daySlots[3].slots[i].enabled}
                                                                    onChange={() => {
                                                                        let m = ((i + 1) - 1) * 2
                                                                        let n = (2 * (i + 1)) - 1
                                                                        let daySlotsShallow = [...daySlots]
                                                                        let slot = daySlotsShallow[3].slots[i]
                                                                        let isEnabled = slot && slot.enabled
                                                                        isEnabled = isEnabled ? false : true
                                                                        daySlotsShallow[3].slots[i] =
                                                                        {
                                                                            startTime: slot.startTime,
                                                                            endTime: slot.endTime,
                                                                            enabled: isEnabled
                                                                        }
                                                                        console.log(daySlotsShallow);
                                                                        setDaySlots(daySlotsShallow)
                                                                    }}
                                                                    className={classNames(
                                                                        daySlots[3].slots[i] && daySlots[3].slots[i].enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                                                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                                                    )}
                                                                >
                                                                    <span className="sr-only">Use setting</span>
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className={classNames(
                                                                            daySlots[3].slots[i] && daySlots[3].slots[i].enabled ? 'translate-x-5' : 'translate-x-0',
                                                                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                        )}
                                                                    />
                                                                </Switch>
                                                            </div>
                                                        ))
                                                            :
                                                            index === 4 ? thursVal.slice(0).reverse().map((data, i) => (
                                                                <div className='flex items-center justify-between border-b-2 py-2 flex-wrap ' key={i}>
                                                                    <span
                                                                        onClick={() => {
                                                                            let m = ((i + 1) - 1) * 2
                                                                            thursEls.current[m].click()
                                                                        }}
                                                                        className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset w-[150px] ring-gray-200">
                                                                        <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                            <circle cx={3} cy={3} r={3} />
                                                                        </svg>
                                                                        <h1>{i + 1}</h1> Starts at: {startAtArray[4][i] ? startAtArray[4][i] : thursVal[i].startTime}
                                                                    </span>
                                                                    <span
                                                                        onClick={() => {
                                                                            let n = (2 * (i + 1)) - 1
                                                                            thursEls.current[n].click()
                                                                        }}
                                                                        className="inline-flex items-center w-[150px] gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                                                                        <svg className="h-1.5 w-1.5  fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                            <circle cx={3} cy={3} r={3} />
                                                                        </svg>
                                                                        Ends at {thursVal[i].endTime}
                                                                    </span>
                                                                    { }
                                                                    <div className=' hidden h-0 w-0 rounded-full '>
                                                                        <LocalizationProvider
                                                                            dateAdapter={AdapterDayjs}
                                                                        >
                                                                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                                <MobileTimePicker
                                                                                    key={i}
                                                                                    ref={addToRefsThurs}
                                                                                    label="Starts at"
                                                                                    onChange={(newValue) => {
                                                                                        setStartAt(dayjs(newValue))
                                                                                        setStartAtArray(prevState => [...prevState, prevState[4][i] = dayjs(newValue).format("hh:mm A")])
                                                                                        handleThursPeriodsChange(dayjs(newValue), null, i)
                                                                                    }}
                                                                                />
                                                                            </DemoContainer>
                                                                        </LocalizationProvider>
                                                                    </div>
                                                                    <div className='h-0 w-0'>
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                                <MobileTimePicker
                                                                                    key={i + 1}
                                                                                    className='hidden'
                                                                                    label="Ends at "
                                                                                    ref={addToRefsThurs}
                                                                                    value={endAtArray && endAtArray[4][i]}
                                                                                    onChange={(newValue) => {
                                                                                        setEndAt(dayjs(newValue))
                                                                                        SetendAtArray(prevState => [...prevState, prevState[4][i] = dayjs(newValue).format("hh:mm A")])
                                                                                        handleThursPeriodsChange(startAt, dayjs(newValue), i)
                                                                                    }}
                                                                                />
                                                                                { }
                                                                            </DemoContainer>
                                                                        </LocalizationProvider>
                                                                    </div>
                                                                    <Switch
                                                                        checked={daySlots[4].slots[i] && daySlots[4].slots[i].enabled}
                                                                        onChange={() => {
                                                                            let m = ((i + 1) - 1) * 2
                                                                            let n = (2 * (i + 1)) - 1
                                                                            let daySlotsShallow = [...daySlots]
                                                                            let slot = daySlotsShallow[4].slots[i]
                                                                            let isEnabled = slot && slot.enabled
                                                                            isEnabled = isEnabled ? false : true
                                                                            daySlotsShallow[4].slots[i] =
                                                                            {
                                                                                startTime: slot.startTime,
                                                                                endTime: slot.endTime,
                                                                                enabled: isEnabled
                                                                            }
                                                                            console.log(daySlotsShallow);
                                                                            setDaySlots(daySlotsShallow)
                                                                        }}
                                                                        className={classNames(
                                                                            daySlots[4].slots[i] && daySlots[4].slots[i].enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                                                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                                                        )}
                                                                    >
                                                                        <span className="sr-only">Use setting</span>
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className={classNames(
                                                                                daySlots[4].slots[i] && daySlots[4].slots[i].enabled ? 'translate-x-5' : 'translate-x-0',
                                                                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                            )}
                                                                        />
                                                                    </Switch>
                                                                </div>
                                                            ))
                                                                :
                                                                index === 5 ? friVal.slice(0).reverse().map((data, i) => (
                                                                    <div className='flex items-center justify-between border-b-2 py-2 flex-wrap ' key={i}>
                                                                        <span
                                                                            onClick={() => {
                                                                                let m = ((i + 1) - 1) * 2
                                                                                friEls.current[m].click()
                                                                            }}
                                                                            className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset w-[150px] ring-gray-200">
                                                                            <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                                <circle cx={3} cy={3} r={3} />
                                                                            </svg>
                                                                            <h1>{i + 1}</h1> Starts at: {startAtArray[5][i] ? startAtArray[5][i] : friVal[i].startTime}
                                                                        </span>
                                                                        <span
                                                                            onClick={() => {
                                                                                let n = (2 * (i + 1)) - 1
                                                                                friEls.current[n].click()
                                                                            }}
                                                                            className="inline-flex items-center w-[150px] gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                                                                            <svg className="h-1.5 w-1.5  fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                                <circle cx={3} cy={3} r={3} />
                                                                            </svg>
                                                                            Ends at {friVal[i].endTime}
                                                                        </span>
                                                                        { }
                                                                        <div className=' hidden h-0 w-0 rounded-full '>
                                                                            <LocalizationProvider
                                                                                dateAdapter={AdapterDayjs}
                                                                            >
                                                                                <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                                    <MobileTimePicker
                                                                                        key={i}
                                                                                        ref={addToRefsFri}
                                                                                        label="Starts at"
                                                                                        onChange={(newValue) => {
                                                                                            setStartAt(dayjs(newValue))
                                                                                            setStartAtArray(prevState => [...prevState, prevState[5][i] = dayjs(newValue).format("hh:mm A")])
                                                                                            handleFriPeriodsChange(dayjs(newValue), null, i)
                                                                                        }}
                                                                                    />
                                                                                </DemoContainer>
                                                                            </LocalizationProvider>
                                                                        </div>
                                                                        <div className='h-0 w-0'>
                                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                                    <MobileTimePicker
                                                                                        key={i + 1}
                                                                                        className='hidden'
                                                                                        label="Ends at "
                                                                                        ref={addToRefsFri}
                                                                                        value={endAtArray && endAtArray[5][i]}
                                                                                        onChange={(newValue) => {
                                                                                            setEndAt(dayjs(newValue))
                                                                                            SetendAtArray(prevState => [...prevState, prevState[5][i] = dayjs(newValue).format("hh:mm A")])
                                                                                            handleFriPeriodsChange(startAt, dayjs(newValue), i)
                                                                                        }}
                                                                                    />
                                                                                    { }
                                                                                </DemoContainer>
                                                                            </LocalizationProvider>
                                                                        </div>
                                                                        <Switch
                                                                            checked={daySlots[5].slots[i] && daySlots[5].slots[i].enabled}
                                                                            onChange={() => {
                                                                                let m = ((i + 1) - 1) * 2
                                                                                let n = (2 * (i + 1)) - 1
                                                                                let daySlotsShallow = [...daySlots]
                                                                                let slot = daySlotsShallow[5].slots[i]
                                                                                let isEnabled = slot && slot.enabled
                                                                                isEnabled = isEnabled ? false : true
                                                                                daySlotsShallow[5].slots[i] =
                                                                                {
                                                                                    startTime: slot.startTime,
                                                                                    endTime: slot.endTime,
                                                                                    enabled: isEnabled
                                                                                }
                                                                                console.log(daySlotsShallow);
                                                                                setDaySlots(daySlotsShallow)
                                                                            }}
                                                                            className={classNames(
                                                                                daySlots[5].slots[i] && daySlots[5].slots[i].enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                                                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                                                            )}
                                                                        >
                                                                            <span className="sr-only">Use setting</span>
                                                                            <span
                                                                                aria-hidden="true"
                                                                                className={classNames(
                                                                                    daySlots[5].slots[i] && daySlots[5].slots[i].enabled ? 'translate-x-5' : 'translate-x-0',
                                                                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                                )}
                                                                            />
                                                                        </Switch>
                                                                    </div>
                                                                ))
                                                                    :
                                                                    index === 6 ? saturVal.map((data, i) => (
                                                                        <div className='flex items-center justify-between border-b-2 py-2 flex-wrap ' key={i}>
                                                                            <span
                                                                                onClick={() => {
                                                                                    let m = ((i + 1) - 1) * 2
                                                                                    satrEls.current[m].click()
                                                                                }}
                                                                                className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset w-[150px] ring-gray-200">
                                                                                <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                                    <circle cx={3} cy={3} r={3} />
                                                                                </svg>
                                                                                <h1>{i + 1}</h1> Starts at: {startAtArray[6][i] ? startAtArray[6][i] : saturVal[i].startTime}
                                                                            </span>
                                                                            <span
                                                                                onClick={() => {
                                                                                    let n = (2 * (i + 1)) - 1
                                                                                    satrEls.current[n].click()
                                                                                }}
                                                                                className="inline-flex items-center w-[150px] gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                                                                                <svg className="h-1.5 w-1.5  fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                                    <circle cx={3} cy={3} r={3} />
                                                                                </svg>
                                                                                Ends at {saturVal[i].endTime}
                                                                            </span>
                                                                            { }
                                                                            <div className=' hidden h-0 w-0 rounded-full '>
                                                                                <LocalizationProvider
                                                                                    dateAdapter={AdapterDayjs}
                                                                                >
                                                                                    <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                                        <MobileTimePicker
                                                                                            key={i}
                                                                                            ref={addToRefsSatr}
                                                                                            label="Starts at"
                                                                                            onChange={(newValue) => {
                                                                                                setStartAt(dayjs(newValue))
                                                                                                setStartAtArray(prevState => [...prevState, prevState[6][i] = dayjs(newValue).format("hh:mm A")])
                                                                                                handleSaturPeriodsChange(dayjs(newValue), null, i)
                                                                                            }}
                                                                                        />
                                                                                    </DemoContainer>
                                                                                </LocalizationProvider>
                                                                            </div>
                                                                            <div className='h-0 w-0'>
                                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                    <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                                        <MobileTimePicker
                                                                                            key={i + 1}
                                                                                            className='hidden'
                                                                                            label="Ends at "
                                                                                            ref={addToRefsSatr}
                                                                                            value={endAtArray && endAtArray[6][i]}
                                                                                            onChange={(newValue) => {
                                                                                                setEndAt(dayjs(newValue))
                                                                                                SetendAtArray(prevState => [...prevState, prevState[6][i] = dayjs(newValue).format("hh:mm A")])
                                                                                                handleSaturPeriodsChange(startAt, dayjs(newValue), i)
                                                                                            }}
                                                                                        />
                                                                                        { }
                                                                                    </DemoContainer>
                                                                                </LocalizationProvider>
                                                                            </div>
                                                                            <Switch
                                                                                checked={daySlots[6].slots[i] && daySlots[6].slots[i].enabled}
                                                                                onChange={() => {
                                                                                    let m = ((i + 1) - 1) * 2
                                                                                    let n = (2 * (i + 1)) - 1
                                                                                    let daySlotsShallow = [...daySlots]
                                                                                    let slot = daySlotsShallow[6].slots[i]
                                                                                    let isEnabled = slot && slot.enabled
                                                                                    isEnabled = isEnabled ? false : true
                                                                                    daySlotsShallow[6].slots[i] =
                                                                                    {
                                                                                        startTime: slot.startTime,
                                                                                        endTime: slot.endTime,
                                                                                        enabled: isEnabled
                                                                                    }
                                                                                    console.log(daySlotsShallow);
                                                                                    setDaySlots(daySlotsShallow)
                                                                                }}
                                                                                className={classNames(
                                                                                    daySlots[6].slots[i] && daySlots[6].slots[i].enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                                                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                                                                )}
                                                                            >
                                                                                <span className="sr-only">Use setting</span>
                                                                                <span
                                                                                    aria-hidden="true"
                                                                                    className={classNames(
                                                                                        daySlots[6].slots[i] && daySlots[6].slots[i].enabled ? 'translate-x-5' : 'translate-x-0',
                                                                                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                                    )}
                                                                                />
                                                                            </Switch>
                                                                        </div>
                                                                    ))
                                                                        : ""
                                        }
                                        {dia === index ?
                                            <form className="relative mt-4 flex gap-4 items-center " >
                                                <span
                                                    onClick={() => {
                                                        handleAdd(index)
                                                    }}
                                                    className="inline-flex cursor-pointer items-center rounded-full bg-green-100 px-1.5 py-2 text-xs font-medium text-green-700">
                                                    + Period
                                                </span>
                                                <button type='button' className='inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={(e) => {
                                                    let x = 1
                                                    try {
                                                        const response = UpdateDaySlots(daySlots, user.id)
                                                        if (!response.success) {
                                                            message.success(response.message)

                                                        } else {
                                                            throw new Error(response.message)
                                                        }
                                                    } catch (error) {
                                                        message.error(error.message)
                                                    }

                                                }}>save </button>
                                            </form> : ""}
                                    </DialogCom> : " "}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-10 divide-y divide-gray-200 
            p-4">
                    <div className="space-y-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900"> Sesstions</h3>
                    </div>
                    <div className="mt-6">
                        <Etable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvisorView
