import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetDoctorById } from '../API/doctor'
import { message } from 'antd'
import Button from '../components/Button'
import moment from 'moment';
import { BookAppointment, GetDoctorAppointmentsOnDate } from '../API/appointments'
import Datepicker from "react-tailwindcss-datepicker";


const BookAppointments = () => {

    const [doctor, setDoctor] = useState(null)
    const { id } = useParams()
    const [date, setDate] = useState('')

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const [selectedSloat, setSelectedSloat] = useState("")
    const [bookedSloats, setBookedSloats] = useState([])
    const [reason, setReason] = useState("")
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const response = await GetDoctorById(id)
            if (response.success) {
                console.log(response);
                setDoctor(response.data)

            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue.startDate);
        setDate(newValue.startDate);
        setValue(newValue)
    }

    useEffect(() => {
        getData()

    }, [])
    useEffect(() => {
        if (date) {
            getBookedSlots()
        }

    }, [date])

    const getSloatData = () => {
        const day = moment(date).format("dddd")
        if (!doctor.days.includes(day)) {
            return <h3>Doctor is not available on {moment(date).format("YYYY-MM-DD")}</h3>
        }

        let startTime = moment(doctor.startTime, "HH:mm")
        let endTime = moment(doctor.endTime, "HH:mm")

        let sloatDuration = 30 // in minutes 
        const slots = []
        const booked = []
        const a = []



        while (startTime < endTime) {
            // if (bookedSloats?.find((slot) => slot.slot === startTime.format("HH:mm"))) {
            //     booked.push(startTime.format("HH:mm"))

            // }
            // if (!bookedSloats?.find((slot) => slot.slot === startTime.format("HH:mm"))) {
            //     slots.push(startTime.format("HH:mm"))

            // }
            slots.push(startTime.format("HH:mm"))


            startTime.add(sloatDuration, "minutes")
        }


        console.log(a);
        return (
            <>
                {slots.map((slot, index) => {
                    const isBooked = bookedSloats?.find(
                        (bookedSloat) => bookedSloat.slot === slot && bookedSloat.status !== 'cancelled'
                    )
                    return (

                        <div
                            className={
                                `flex border-spacing-2  bg-[#19774025] p-2 rounded-md cursor-pointer   
                                ${selectedSloat === slot ? "bg-[#1d7e9e6b]" : ""}
                                ${isBooked? "pointer-events-none bg-[#77191925] " : ""}
                                
                                `
                            }
                            onClick={() => {

                                setSelectedSloat(slot)
                            }}

                        >
                            <span>{moment(slot, "HH:mm ").format("HH:mm ")}   - {moment(slot, "HH:mm").add(sloatDuration, "minutes").format("HH:mm ")}</span>
                        </div>
                    )
                })}


            </>
        )
    }

    const getBookedSlots = async () => {
        try {
            const response = await GetDoctorAppointmentsOnDate(id, date)
            console.log(response);
            if (response.success) {
                setBookedSloats(response.data)
            } else {
                message.error(response.message)
            }

        } catch (error) {
            message.error(error.message)
        }
    }

    const onBookAppointment = async () => {
        try {
            const payload = {
                doctorId: doctor.id,
                userId: JSON.parse(localStorage.getItem("user")).id,
                date,
                slot: selectedSloat,
                doctorName: `${doctor.firstName} ${doctor.lastName}`,
                userName: JSON.parse(localStorage.getItem("user")).username,
                bookedOn: moment().format("DD-MM-YYYY HH:mm "),
                reason: reason,
                status: "pending"
            }
            const response = await BookAppointment(payload)
            if (message.success) {
                message.success(response.message)
                navigate('/profile')
            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <div>

            <div className='w-full flex bg-slate-50 p-2  '>

                {doctor && <div class="max-w-lg mx-auto  bg-white rounded-lg shadow-md p-5 w-full ">
                    {/* <img class="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture" /> */}
                    <h2 class="text-center text-2xl font-semibold mt-3">Mr. {doctor.firstName} {doctor.lastName}</h2>
                    <p class="text-center text-gray-600 mt-1">{doctor.email}</p>
                    <p class="text-center text-gray-600 mt-1">{doctor.phone}</p>
                    {/* <div className="flex flex-col bg-slate-50 rounded-md p-2 justify-center  flex-wrap ">
                    <p class="text-center text-gray-900 mt-1">Days avaliable</p>


                        <p class="text-center flex w-3/6 text-wrap text-gray-600 mt-1">{doctor.days.join(',')}</p>
                    </div> */}

                </div>}
            </div>

            {/* slotes here */}

            <div className=' flex flex-col gap-4 '>
                <div className='flex items-center justify-center w-full mt-10 max-md:flex-col gap-2   ' >
                    <div className=' flex max-md:flex-col items-center justify-around gap-4 '>

                        <span className='font-bold'>Select Date:</span>
                        {/* <input
                            type='date'
                            value={date}
                            className='mx-2 bottom-2 bg-[#1070778e] rounded-md text-white text-center p-1 cursor-pointer'
                            onChange={(e) =>{
                                setDate(e.target.value)
                                console.log(date);
                            } }
                            min={moment().format("YYYY-MM-DD")}

                        /> */}
                        <div>

                            <Datepicker
                                value={value}
                                onChange={handleValueChange}
                                asSingle={true}
                                minDate={moment().format("YYYY-MM-DD")}
                                classNames="outline-none "
                                showShortcuts={true}
                                primaryColor={"sky"} 

                                configs={{
                                    shortcuts: {
                                        today: "Today",
                                    },
                                  
                                }}

                            />
                        </div>
                    </div>
                    {/* 
                    <Button
                        label="Serach"
                        addedStyles="bg-black text-white  w-[150px]"
                    /> */}


                </div>


                <div className="flex mt-4 gap-6 flex-wrap max-md:justify-start justify-center
                 ">
                    {date && getSloatData()}
                </div>

                {selectedSloat && 
                    <div className='flex mt-4 gap-6 flex-wrap max-md:justify-start justify-center '>
                        <textarea
                             name="reason" 
                             value={reason}
                             onChange={(e) => setReason(e.target.value)}
                             placeholder='It would be more beneficial to state the reasons behind the appointments.  '
                             className='w-4/6 max-md:w-full p-2 border-2  max-h-16 rounded-xl '
                         >
                            
                            </textarea>
                    </div>
                }

                {selectedSloat &&
                    <div className='flex justify-center mt-10 gap-2 '>
                        <Button
                            label="Book now"
                            addedStyles="bg-black text-white w-[300px] "
                            handleClick={onBookAppointment}
                        />
                        <Button
                            label="Cancel"
                            addedStyles="bg-black text-white w-[300px] "
                            handleClick={() => { navigate("/") }}
                        />
                    </div>

                }



            </div>


        </div>
    )
}

export default BookAppointments