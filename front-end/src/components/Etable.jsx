import { Fragment, useState } from 'react'
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    EllipsisHorizontalIcon,
    EllipsisVerticalIcon
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, isEqual, isFirstDayOfMonth, isSameDay, isSameMonth, isToday, parse, parseISO, startOfMonth, startOfToday, startOfWeek } from 'date-fns'



let events = [
    { id: 1, name: 'Design review', time: '10AM', datetime: '2024-03-27T10:00', href: '#' },
    { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
]

// const selectedDay1 = days.find((day) => day.isSelected)

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Etable() {
    let today = startOfToday()
    const [selectedDay, setSelectedDay] = useState(today)
    const [cureentMonth, setCureentMonth] = useState(format(today, "MMM-yyyy"))
    let firstDayOfCurrentMonth = parse(cureentMonth, 'MMM-yyyy', new Date())
    console.log(cureentMonth);
    console.log(selectedDay);
    console.log(format(selectedDay, 'yyyy-MM-dd'));
    console.log(format(events[0].datetime, 'yyyy-MM-dd'));
    console.log(events.filter(event => isSameDay(format(selectedDay, 'yyyy-MM-dd'), format(event.datetime, 'yyyy-MM-dd'))));
    let days = eachDayOfInterval({ start: startOfWeek(firstDayOfCurrentMonth), end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)) })
    console.log(days);
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
                        <div className="ml-6 h-6 w-px bg-gray-300" />
                        <button
                            type="button"
                            className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add event
                        </button>
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
                    <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                        {days.map((day, dayIdx) => (
                            <div
                                key={day.toString()}
                                onClick={() => { setSelectedDay(day) }}

                                type="button"
                                className={classNames(

                                    dayIdx === 0 && colStartClasses[getDay(day)],
                                    isSameMonth(day, firstDayOfCurrentMonth) ? 'bg-white' : 'bg-gray-100',

                                    (isEqual(day, selectedDay) ||
                                        isToday(day)) &&
                                    'font-semibold ',

                                    isEqual(day, selectedDay) &&
                                    'text-[#ffffff] font-bold  //boldtext ',

                                    !isEqual(day, selectedDay) &&
                                    isToday(day) &&
                                    'text-white',

                                    isEqual(day, selectedDay) &&
                                    isSameMonth(day, today) &&
                                    !isToday(day) &&
                                    'text-white',

                                    !isEqual(day, selectedDay) &&
                                    !isSameMonth(day, today) &&
                                    !isToday(day) &&
                                    'text-gray-800',

                                    'flex h-18 flex-col-7 px-3 py-2 hover:bg-gray-100 focus:z-10 md:h-24 cursor-pointer flex-col'
                                )}
                                
                            >
                                                                <time
                                    dateTime={format(day, 'yyyy-MM-dd')}
                                    className={classNames(
                                        selectedDay && 'flex h-6 md:h-6 w-14 items-center justify-center rounded-full  ',
                                        isEqual(selectedDay, day) && 'bg-red-500',
                                        selectedDay && isToday(day) && 'bg-indigo-600 text-white',
                                        selectedDay && isToday(day) && 'bg-indigo-600',
                                        'ml-auto flex flex-col   '
                                    )}
                                >
                                    {format(day, "d")}
                                </time>


                                {/* needs fix */}
                                {events.filter(event => isSameDay(format(selectedDay, 'yyyy-MM-dd'), format(event.datetime, 'yyyy-MM-dd'))).length > 0 && (
                                    <ol className="mt-2">
                                        {events.filter(event => isSameDay(format(selectedDay, 'yyyy-MM-dd'), format(event.datetime, 'yyyy-MM-dd'))).map(event => (
                                            <>
                                                {isSameDay(format(day, 'yyyy-MM-dd'), format(event.datetime, 'yyyy-MM-dd')) ? <li key={event.id}>
                                                    <a href={event.href} className="group flex">
                                                        <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                                            {event.name}
                                                        </p>
                                                        <time
                                                            dateTime={event.datetime}
                                                            className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                                                        >
                                                            {event.time}
                                                        </time>
                                                    </a>
                                                </li> : ""}
                                            </>
                                        ))}

                                    </ol>
                                )}


                            </div>
                        ))}
                    </div>
                    {/* md & sm screnns */}
                    <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
                        {days.map((day, dayIdx) => (
                            <button
                                onClick={() => { setSelectedDay(day) }}
                                key={day.toString()}
                                type="button"
                                className={classNames(

                                    dayIdx === 0 && colStartClasses[getDay(day)],
                                    isSameMonth(day, firstDayOfCurrentMonth) ? 'bg-white' : 'bg-gray-100',

                                    (isEqual(day, selectedDay) ||
                                        isToday(day)) &&
                                    'font-semibold ',

                                    isEqual(day, selectedDay) &&
                                    'text-[#ffffff] font-bold  //boldtext ',

                                    !isEqual(day, selectedDay) &&
                                    isToday(day) &&
                                    'text-white',

                                    isEqual(day, selectedDay) &&
                                    isSameMonth(day, today) &&
                                    !isToday(day) &&
                                    'text-white',

                                    !isEqual(day, selectedDay) &&
                                    !isSameMonth(day, today) &&
                                    !isToday(day) &&
                                    'text-gray-800',

                                    'flex h-18 flex-col-7 px-3 py-2 hover:bg-gray-100 focus:z-10 md:h-24'
                                )}
                            >
                                <time
                                    dateTime={format(day, 'yyyy-MM-dd')}
                                    className={classNames(
                                        selectedDay && 'flex h-6 md:h-6 w-14 items-center justify-center rounded-full ',
                                        isEqual(selectedDay, day) && 'bg-red-500',
                                        selectedDay && isToday(day) && 'bg-indigo-600 text-white',
                                        selectedDay && isToday(day) && 'bg-indigo-600',
                                        'ml-auto '
                                    )}
                                >
                                    {/* {day.date.split('-').pop().replace(/^0/, '')} */}
                                    {format(day, "d")}
                                </time>
                                {/* no need  */}
                                {/* {events.length > 0 && (
                                    <ol className="mt-2  ">
                                        {events.filter(event => isSameDay(format(selectedDay, 'yyyy-MM-dd'), format(event.datetime, 'yyyy-MM-dd'))).map((event) => (


                                            <>
                                                {isSameDay(format(day, 'yyyy-MM-dd'), format(event.datetime, 'yyyy-MM-dd')) ?
                                                    <li key={event.id}>
                                                        <a href={event.href} className="group flex">
                                                            <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                                                {event.name}
                                                            </p>
                                                            <time
                                                                dateTime={event.datetime}
                                                                className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                                                            >
                                                                {event.time}
                                                            </time>

                                                        </a>
                                                    </li> : ""}
                                            </>

                                        ))}

                                    </ol>

                                )} */}

                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {events.filter(event => isSameDay(format(selectedDay, 'yyyy-MM-dd'), format(event.datetime, 'yyyy-MM-dd'))).length > 0 && (
                <div className="px-4 py-10 sm:px-6 lg:hidden">
                    <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
                        {events.filter(event => isSameDay(format(selectedDay, 'yyyy-MM-dd'), format(event.datetime, 'yyyy-MM-dd'))).map((event) => (
                            <li key={event.id} className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
                                <div className="flex-auto">
                                    <p className="font-semibold text-gray-900">{event.name}</p>
                                    <time dateTime={event.datetime} className="mt-2 flex items-center text-gray-700">
                                        <ClockIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        {event.time}
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
