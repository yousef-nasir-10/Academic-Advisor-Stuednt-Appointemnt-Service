import { Fragment, useState, useEffect } from 'react'
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    EllipsisHorizontalIcon,
    EllipsisVerticalIcon
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, isAfter, isBefore, isEqual, isFirstDayOfMonth, isSameDay, isSameMonth, isToday, isValid, parse, parseISO, set, startOfMonth, startOfToday, startOfWeek } from 'date-fns'
import { GetDoctorAppointments, UpdateAppointmentsIsBefore, UpdateAppointmentsStatus } from '../API/appointments'
import DialogCom from './DialogCom'
import { FcTimeline } from "react-icons/fc";
import dayjs from 'dayjs'
import moment from 'moment'
import ExportToExcel from './ExportToExcel'
import { Tab } from '@headlessui/react'
import { AtSymbolIcon, CodeBracketIcon, LinkIcon } from '@heroicons/react/20/solid'
import { message } from 'antd'












// const selectedDay1 = days.find((day) => day.isSelected)

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

let events = [
    { id: 1, name: 'Design review', time: '10AM', datetime: '2024-03-27T10:00', href: '#' },
    { id: 2, name: 'Design Metting', time: '10AM', datetime: '2024-03-27T10:00', href: '#' },
    { id: 3, name: 'Design Metting', time: '10AM', datetime: '2024-03-27T10:00', href: '#' },
    { id: 4, name: 'Sales meeting', time: '2PM', datetime: '2024-03-28T14:00', href: '#' },
]

export default function Etable() {
    let today = startOfToday()
    const [selectedDay, setSelectedDay] = useState(today)
    const [cureentMonth, setCureentMonth] = useState(format(today, "MMM-yyyy"))
    const [appointments, setAppointments] = useState([])
    const [status, setStatus] = useState("")
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [open, setOpen] = useState(false)
    const [openCancel, setOpenCancel] = useState(null)
    const [openApprove, setOpenApprove] = useState(null)
    const [cancelReason, setCancelReason] = useState("")
    const [linkMetting, setLinkMetting] = useState("")


    // const [hasMoreThan2events, setHasMoreThan2events ] = useState(false)
    let hasMoreThan2events = false
    let firstDayOfCurrentMonth = parse(cureentMonth, 'MMM-yyyy', new Date())
    // console.log(cureentMonth);
    // console.log(firstDayOfCurrentMonth);
    // console.log(cureentMonth);
    // console.log(selectedDay);
    // console.log(format(selectedDay, 'yyyy-MM-dd'));
    // console.log(events.filter(event => isSameDay(format(selectedDay, 'yyyy-MM-dd'), format(event.datetime, 'yyyy-MM-dd'))));
    let days = eachDayOfInterval({ start: startOfWeek(firstDayOfCurrentMonth), end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)) })
    // console.log(days);
    // console.log(days[1]);
    // console.log(parse(days, 'MMM-yyyy', new Date()));
    let selectedDayEventsNum = events.filter(event => isSameDay(format(selectedDay, 'yyyy-MM-dd'), format(event.datetime, 'yyyy-MM-dd'))).length
    // console.log(selectedDayEventsNum);




    let uniqueArray = [...new Set(days)]
    let daysEvents = []
    uniqueArray.forEach(element => {
        daysEvents.push({
            day: element,
            events: appointments.filter(event => format(event.date, 'yyyy-MM-dd') === format(element, 'yyyy-MM-dd'))


        })
    })

    const GetDocAppointments = async () => {
        // code here
        try {

            const user = JSON.parse(localStorage.getItem("user"))
            console.log(user);

            const response = await GetDoctorAppointments(user.id)
            setAppointments(response.data)
            console.log(response.data);
            let m = dayjs(`${response.data[0].date} ${response.data[0].slot} `).isBefore(new Date())
            // here
            console.log(m);
            response.data.forEach(element => {
                if (element.status === "pending" && dayjs(`${element.date} ${element.slot} `).isBefore(new Date())) {
                    // const res = UpdateAppointmentsStatus(element.id, "canceled")
                    changeStatus(element.id, "canceled", {
                        reason: "Canceled automatically because your academic advisor did not respond to this appointment.",
                        canceled_at: dayjs(new Date).format("ddd, MMM D, YYYY h:mm A"),
                        canceld_by: "System"

                    })
                    console.log(res);
                    

                }
            });
        } catch (error) {

        }






    }


    // console.log(daysEvents);
    // console.log(daysEvents.find(event => isSameDay(format(selectedDay, 'yyyy-MM-dd'), format(event.day, 'yyyy-MM-dd'))));
    let todayEvents = daysEvents.find(event => isSameDay(format(selectedDay, 'yyyy-MM-dd'), format(event.day, 'yyyy-MM-dd'))) && daysEvents.find(event => isSameDay(format(selectedDay, 'yyyy-MM-dd'), format(event.day, 'yyyy-MM-dd'))).events
    // console.log(todayEvents);


    const statuses = {
        approved: 'bg-green-600 ',
        pending: 'bg-yellow-600 ',
        canceled: 'bg-red-600 ',
    }
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const changeStatus = async (id, status, cancellation, link) => {

        setStatus(status.status)
        try {
            const response = await UpdateAppointmentsStatus(id, status, cancellation, link)
            if (response.success) {
                message.success(response.message)

            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }



    function buttonType(status, id, date, slot, via) {
        switch (status) {
            case "pending":
                // code block
                return (
                    <div className='flex justify-center gap-2 items-center'>
                        <button
                            onClick={() => {
                                // changeStatus(id, "approved")
                                if (via === "online") {
                                    setOpenApprove(id)
                                    if (linkMetting) {

                                        changeStatus(id, "approved", null, linkMetting)
                                    }
                                } else {
                                    changeStatus(id, "approved")
                                }
                            }}
                            type="button"
                            className="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 w-[80px] justify-center "
                        >

                            {via === "online" && linkMetting ? "Send" : "Approve"}
                        </button>
                        <button
                            onClick={() => {
                                // here
                                // changeStatus(id, "canceled")
                                setOpenCancel(id)
                                if (cancelReason) {
                                    changeStatus(id, "canceled", {
                                        reason: cancelReason,
                                        canceled_at: dayjs(new Date).format("ddd, MMM D, YYYY h:mm A"),
                                        canceld_by: JSON.parse(localStorage.getItem("user")).id

                                    })
                                }

                            }}
                            type="button"
                            className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 w-[80px] justify-center "
                        >


                            {cancelReason ? "Confirm" : "Cancel"}
                        </button>

                    </div>
                )
                break;
            case "approved":
                console.log(date);
                if (status === "approved" && dayjs(`${date} ${slot} `).isBefore(new Date())) {
                    // const res = UpdateAppointmentsStatus(element.id, "canceled")
                    // console.log(res);
                    console.log('Wating for completing the form');
                    const notificationMethods = [
                        { id: 'email', title: 'good' },
                        { id: 'sms', title: 'bad' },
                        { id: 'push', title: 'perefer not to answer ' },
                    ]
                    return (
                        <div className=' bg-slate-50 p-4'>
                            <label className="text-base font-semibold text-gray-900 font-montserrat">Metting form</label>
                            <div>
                                <p className="text-sm text-gray-500">How the metting has gone?</p>
                                <fieldset className="mt-2">
                                    <legend className="sr-only">Notification method</legend>
                                    <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                        {notificationMethods.map((notificationMethod) => (
                                            <div key={notificationMethod.id} className="flex items-center">
                                                <input
                                                    id={notificationMethod.id}
                                                    name="notification-method"
                                                    type="radio"
                                                    // defaultChecked={notificationMethod.id === 'email'}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                                    {notificationMethod.title}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">How the metting has gone?</p>
                                <fieldset className="mt-2">
                                    <legend className="sr-only">Notification method</legend>
                                    <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                        {notificationMethods.map((notificationMethod) => (
                                            <div key={notificationMethod.id} className="flex items-center">
                                                <input
                                                    id={notificationMethod.id}
                                                    name="notification-method1"
                                                    type="radio"
                                                    // defaultChecked={notificationMethod.id === 'email'}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                                    {notificationMethod.title}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">How the metting has gone?</p>
                                <fieldset className="mt-2">
                                    <legend className="sr-only">Notification method</legend>
                                    <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                        {notificationMethods.map((notificationMethod) => (
                                            <div key={notificationMethod.id} className="flex items-center">
                                                <input
                                                    id={notificationMethod.id}
                                                    name="notification-method2"
                                                    type="radio"
                                                    // defaultChecked={notificationMethod.id === 'email'}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                                    {notificationMethod.title}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>
                        </div>

                    )



                } else {
                    return (
                        <div>

                            <button
                                onClick={() => {
                                    setOpenCancel(id)
                                    if (cancelReason) {
                                        changeStatus(id, "canceled", {
                                            reason: cancelReason,
                                            canceled_at: dayjs(new Date).format("ddd, MMM D, YYYY h:mm A"),
                                            canceld_by: JSON.parse(localStorage.getItem("user")).id

                                        })
                                    }

                                }}
                                type="button"
                                className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 w-[80px] justify-center "
                            >

                                {cancelReason ? "Confirm" : "Cancel"}
                            </button>


                        </div>
                    )

                }
                break;
            default:
            // code block
        }
    }
    useEffect(() => {
        GetDocAppointments()
    }, [status])

    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                    <time dateTime="2022-01">{format(firstDayOfCurrentMonth, 'MMMM yyyy')}</time>
                </h1>

                <div className="flex items-center">
                    {/* next & previous month buttons */}
                    <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                        <button
                            onClick={() => {

                                let firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: -1 })

                                setCureentMonth(format(firstDayOfNextMonth, 'MMM-yyyy'))

                            }}
                            type="button"
                            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
                        >
                            {format(firstDayOfCurrentMonth, 'MMM yyyy')}
                        </button>
                        <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                        <button
                            type="button"
                            onClick={() => {

                                let firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: 1 })

                                setCureentMonth(format(firstDayOfNextMonth, 'MMM-yyyy'))

                            }}
                            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
                        >
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>

                    </div>


                    {/* menus */}
                    <div className="hidden md:ml-4 md:flex md:items-center">
                        <Menu as="div" className="relative">
                            <Menu.Button
                                type="button"
                                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Month view
                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Day view
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Week view
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Month view
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Year view
                                                </a>
                                            )}
                                        </Menu.Item>


                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <div className="ml-6 h-6 w-px bg-gray-300 " />
                        {/* <button
                            type="button"
                            className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add event
                        </button> */}

                        <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium   ml-2 text-red-600">
                            <svg className="h-1.5 w-1.5 fill-red-400" viewBox="0 0 6 6" aria-hidden="true">
                                <circle cx={3} cy={3} r={3} />
                            </svg>
                            Cnceled
                        </span>
                        <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium  ml-2 text-yellow-600">
                            <svg className="h-1.5 w-1.5 fill-yellow-400" viewBox="0 0 6 6" aria-hidden="true">
                                <circle cx={3} cy={3} r={3} />
                            </svg>
                            Pending
                        </span>
                        <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-green-600  ml-2">
                            <svg className="h-1.5 w-1.5 fill-green-400" viewBox="0 0 6 6" aria-hidden="true">
                                <circle cx={3} cy={3} r={3} />
                            </svg>
                            Approved
                        </span>
                        <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-blue-600  ml-2">
                            <svg className="h-1.5 w-1.5 fill-blue-600" viewBox="0 0 6 6" aria-hidden="true">
                                <circle cx={3} cy={3} r={3} />
                            </svg>
                            Attended
                        </span>
                    </div>
                    <Menu as="div" className="relative ml-6 md:hidden">
                        <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Open menu</span>
                            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Create event
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Go to today
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Day view
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Week view
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Month view
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Year view
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </header>
            <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
                {/* days of the week */}
                <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                    <div className="bg-white py-2">
                        S<span className="sr-only sm:not-sr-only">un</span>
                    </div>
                    <div className="bg-white py-2">
                        M<span className="sr-only sm:not-sr-only">on</span>
                    </div>
                    <div className="bg-white py-2">
                        T<span className="sr-only sm:not-sr-only">ue</span>
                    </div>
                    <div className="bg-white py-2">
                        W<span className="sr-only sm:not-sr-only">ed</span>
                    </div>
                    <div className="bg-white py-2">
                        T<span className="sr-only sm:not-sr-only">hu</span>
                    </div>
                    <div className="bg-white py-2">
                        F<span className="sr-only sm:not-sr-only">ri</span>
                    </div>
                    <div className="bg-white py-2">
                        S<span className="sr-only sm:not-sr-only">at</span>
                    </div>

                </div>
                {/* distrubtion montly days */}
                <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                    {/* lg screen */}
                    <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px ">
                        {daysEvents.map((dia, dayIdx) => (
                            <div
                                key={dia.day.toString()}
                                onClick={() => {
                                    {
                                        setSelectedDay(dia.day)
                                        console.log(dia.events);
                                    }
                                }}

                                type="button"
                                className={classNames(

                                    dayIdx === 0 && colStartClasses[getDay(dia.day)],
                                    isSameMonth(dia.day, firstDayOfCurrentMonth) ? 'bg-white' : 'bg-gray-100',

                                    (isEqual(dia.day, selectedDay) ||
                                        isToday(dia.day)) &&
                                    'font-semibold ',

                                    isEqual(dia.day, selectedDay) &&
                                    'text-[#ffffff] font-bold  //boldtext ',

                                    !isEqual(dia.day, selectedDay) &&
                                    isToday(dia.day) &&
                                    'text-white',

                                    isEqual(dia.day, selectedDay) &&
                                    isSameMonth(dia.day, today) &&
                                    !isToday(dia.day) &&
                                    'text-white',

                                    !isEqual(dia.day, selectedDay) &&
                                    !isSameMonth(dia.day, today) &&
                                    !isToday(dia.day) &&
                                    'text-gray-800',

                                    'flex  flex-col-7 px-3 py-2 hover:bg-gray-100 focus:z-10  cursor-pointer flex-col min-h-[100px] '
                                )}

                            >
                                <time
                                    dateTime={format(dia.day, 'yyyy-MM-dd')}
                                    className={classNames(
                                        selectedDay && 'flex h-6 md:h-6 w-14 items-center justify-center rounded-full  ',
                                        isEqual(selectedDay, dia.day) && 'bg-red-500',
                                        selectedDay && isToday(dia.day) && 'bg-indigo-600 text-white',
                                        selectedDay && isToday(dia.day) && 'bg-indigo-600',
                                        'ml-auto flex flex-col   '
                                    )}
                                >
                                    {format(dia.day, "d")}
                                </time>

                                {dia.events && dia.events.length > 0 && (
                                    <ol className="mt-2 ">
                                        {dia.events && dia.events.map(((event, i) =>
                                            <li key={event.id}>

                                                <a href={event.href} className="group flex" onClick={() => {

                                                    setOpen(true)
                                                    setSelectedEvent(event)
                                                    console.log(i);

                                                }}>

                                                    <p className={`flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600 
                                                    ${event.status === "pending" ?
                                                            'text-yellow-600' :
                                                            event.status === "approved" ? "text-green-600" :
                                                                "text-red-600"}`}>
                                                        {event.userName}
                                                    </p>

                                                    <time
                                                        dateTime={event.date}
                                                        className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                                                    >
                                                        {event.slot}
                                                    </time>
                                                </a>

                                                {selectedEvent === event ?
                                                    <DialogCom open={open} subText={event.slot} onClose={() => setOpen(false)} icon={<FcTimeline className="h-6 w-6 text-green-600" aria-hidden="true" />}>
                                                        <ul role="list" className="divide-y divide-gray-100 ">

                                                            {/* <li key={event.id} className="flex justify-start gap-x-6 py-5 flex-col font-montserrat">
                                                                <div className="flex min-w-0 gap-x-4">
                                                                    <div className="min-w-0 flex-auto flex justify-between">
                                                                        <p className="text-sm  leading-6 text-gray-900 font-bold">Name: <span className='text-[#359764]'>{event.userName}</span></p>
                                                                        <p className="mt-1 text-xs leading-5 text-gray-500"> way of conduction: {event.via}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="  ">
                                                                    <p className="text-sm leading-6 text-gray-900 font-montserrat text-justify font-bold"> reason: <span className='text-gray-500'>{event.reason}</span></p>
                                                                    
                                                                </div>
                                                            </li> */}
                                                            <li key={event.id} className="flex items-center justify-between gap-x-6 py-5  flex-col-reverse">


                                                                <div className="min-w-0 w-full">
                                                                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500 w-full">
                                                                        <p className="whitespace-nowrap">
                                                                            Due on <time dateTime={event.date}><span className='font-bold text-black'>{event.date}</span></time>
                                                                        </p>
                                                                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                                                            <circle cx={1} cy={1} r={1} />
                                                                        </svg>
                                                                        <p className="truncate">Way of conduction: <span className='font-bold text-black'>{event.via}</span></p>
                                                                        <p className="truncate">Student: <span className='font-bold text-black'>{event.userName}</span></p>

                                                                    </div>

                                                                    <div className="mt-1  flex items-center gap-x-2 text-xs leading-5 text-gray-500 w-full">
                                                                        <p
                                                                            className={classNames(
                                                                                statuses[event.status],
                                                                                'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-bold uppercase w-full text-white py-1 '
                                                                            )}
                                                                        >
                                                                            {event.status}
                                                                        </p>
                                                                    </div>



                                                                    {event.cancellation && event.cancellation.reason ? <div className="mt-1 flex bg-red-50 p-2 rounded-sm  gap-x-2 text-xs leading-5 text-gray-500 w-full flex-col flex-wrap  ">
                                                                        <div className='flex gap-2'>
                                                                            <p className="whitespace-nowrap">
                                                                                Canceled by: <span className='font-bold text-black'>{event.cancellation.canceld_by === JSON.parse(localStorage.getItem("user")).id ? "You" : event.cancellation.canceld_by === "system"? "Auto cancellation": "student"}</span>
                                                                            </p>
                                                                            <p className="truncate ml-auto">Cancellation time: <span className='font-bold text-black'>{event.cancellation.canceled_at}</span></p>
                                                                        </div>
                                                                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                                                            <circle cx={1} cy={1} r={1} />
                                                                        </svg>


                                                                    </div> : ""}
                                                                    {event.cancellation.reason && <p className="truncate bg-red-50 p-2 text-xs  text-gray-500">Cancellation reason: <span className='font-bold text-black text-xs text-wrap font-montserrat'>{event.cancellation.reason}</span></p>}
                                                                    <div className="flex items-start gap-x-3 mt-4 w-full flex-col ">
                                                                        <h1 className='text-sm font-montserrat'>Session message:</h1>
                                                                        <p className="text-sm font-semibold leading-6 text-gray-900 text-justify  w-full p-4 bg-slate-50  rounded-md">{event.reason}</p>
                                                                    </div>
                                                                </div>

                                                                {openCancel === event.id ?
                                                                    <div className='w-full'>

                                                                        <label htmlFor="comment" className="sr-only">
                                                                            Comment
                                                                        </label>
                                                                        <div className='gap-2'>
                                                                            <textarea
                                                                                rows={2}
                                                                                name="comment"
                                                                                id="comment"
                                                                                className={`first-letter:block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2 p-2 ${event.status === 'canceled' ? 'hidden' : ""}`}
                                                                                placeholder="Kindly explain why this session would be canceled and then click confirm. "
                                                                                defaultValue={''}
                                                                                value={cancelReason}
                                                                                onChange={(e) => {
                                                                                    setCancelReason(e.target.value)
                                                                                }}
                                                                            />

                                                                        </div>


                                                                    </div>

                                                                    : null}

                                                                {openApprove === event.id ?
                                                                    <div className='w-full'>

                                                                        <label htmlFor="comment" className="sr-only">
                                                                            Comment
                                                                        </label>
                                                                        <div className='gap-2'>
                                                                            <textarea
                                                                                rows={2}
                                                                                name="comment"
                                                                                id="comment"
                                                                                className={`first-letter:block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2 p-2 ${event.status === 'canceled' || event.status === 'approved' ? 'hidden' : ""}`}
                                                                                placeholder="Paste the metting link (teams) "
                                                                                defaultValue={''}
                                                                                value={linkMetting}
                                                                                onChange={(e) => {
                                                                                    setLinkMetting(e.target.value)
                                                                                }}
                                                                            />

                                                                        </div>


                                                                    </div>

                                                                    : null}

                                                                <div className="flex flex-none items-center gap-x-4 mb-2 flex-col">

                                                                    {buttonType(event.status, event.id, event.date, event.slot, event.via)}

                                                                </div>
                                                            </li>

                                                        </ul>

                                                    </DialogCom>
                                                    : ""}


                                            </li>
                                        ))}
                                        {/* {dia.events.length > 2 && <li className="text-gray-500">+ {dia.events.length - 2} more</li>} */}
                                    </ol>

                                )}

                            </div>
                        ))}
                    </div>
                    {/* md & sm screnns */}
                    <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
                        {daysEvents.map((dia, dayIdx) => (
                            <button
                                onClick={() => { setSelectedDay(dia.day) }}
                                key={dia.day.toString()}
                                type="button"
                                className={classNames(

                                    dayIdx === 0 && colStartClasses[getDay(dia.day)],
                                    isSameMonth(dia.day, firstDayOfCurrentMonth) ? 'bg-white' : 'bg-gray-100',

                                    (isEqual(dia.day, selectedDay) ||
                                        isToday(dia.day)) &&
                                    'font-semibold ',

                                    isEqual(dia.day, selectedDay) &&
                                    'text-[#ffffff] font-bold  //boldtext ',

                                    !isEqual(dia.day, selectedDay) &&
                                    isToday(dia.day) &&
                                    'text-white',

                                    isEqual(dia.day, selectedDay) &&
                                    isSameMonth(dia.day, today) &&
                                    !isToday(dia.day) &&
                                    'text-white',

                                    !isEqual(dia.day, selectedDay) &&
                                    !isSameMonth(dia.day, today) &&
                                    !isToday(dia.day) &&
                                    'text-gray-800',

                                    'flex h-18 flex-col-7 px-3 py-2 hover:bg-gray-100 focus:z-10 md:h-24'
                                )}
                            >

                                <time
                                    dateTime={format(dia.day, 'yyyy-MM-dd')}
                                    className={classNames(
                                        selectedDay && 'flex h-6 md:h-6 w-14 items-center justify-center rounded-full ',
                                        isEqual(selectedDay, dia.day) && 'bg-red-500',
                                        selectedDay && isToday(dia.day) && 'bg-indigo-600 text-white',
                                        selectedDay && isToday(dia.day) && 'bg-indigo-600',
                                        'ml-auto '
                                    )}
                                >
                                    {/* {day.date.split('-').pop().replace(/^0/, '')} */}
                                    {format(dia.day, "d")}
                                </time>
                                <span className="sr-only">{dia.events.length} events</span>
                                {dia.events.length > 0 && (
                                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                                        {dia.events.map((event) => (
                                            <span key={event.id} className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                                        ))}
                                    </span>
                                )}



                            </button>


                        ))}
                    </div>
                </div>
            </div>
            {daysEvents.filter(event => isSameDay(format(selectedDay, 'yyyy-MM-dd'), format(event.day, 'yyyy-MM-dd'))).length > 0 && (
                <div className="px-4 py-10 sm:px-6 lg:hidden">
                    <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
                        {todayEvents.map(event => (
                            <li key={event.id} className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
                                <div className="flex-auto">
                                    <p className="font-semibold text-gray-900">"{event.reason}" by <span className='text-[#9c8f42]'> {event.userName}</span>  </p>
                                    <time dateTime={event.date} className="mt-2 flex items-center text-gray-700">
                                        <ClockIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        {event.slot}
                                    </time>
                                </div>
                                <a
                                    href={event.href}
                                    className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                                >
                                    Edit<span className="sr-only">, {event.name}</span>
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

        </div>
    )
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
