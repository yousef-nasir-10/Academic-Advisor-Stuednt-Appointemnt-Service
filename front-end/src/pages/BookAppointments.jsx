import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetDoctorById } from '../API/doctor'
import { message } from 'antd'
import Button from '../components/Button'
import moment from 'moment';
import { BookAppointment } from '../API/appointments'


const BookAppointments = () => {
    
    const [doctor, setDoctor] = useState(null)
    const { id } = useParams()
    const [date, setDate] = useState('')
    const [selectedSloat, setSelectedSloat] = useState("")
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

    useEffect(() => {
        getData()

    }, [])

    const getSloatData = () => {
        const day = moment(date).format("dddd")
        if (!doctor.days.includes(day)) {
            return <h3>Doctor is not available on {moment().format("YYYY-MM-DD")}</h3>
        }

        let startTime = moment(doctor.startTime, "HH:mm")
        let endTime = moment(doctor.endTime, "HH:mm")

        let sloatDuration = 30 // in minutes 
        const slots = []
        while (startTime < endTime) {
            slots.push(startTime.format("HH:mm"))
            startTime.add(sloatDuration, "minutes")
        }
        return (
            <>
                {slots.map(slot => (
                    <div
                        className={`flex bg-[#19774025] p-2 rounded-md cursor-pointer ${selectedSloat === slot ? "bg-[#1d7e9e6b]" : ""}`}
                        onClick={() => {

                            setSelectedSloat(slot)
                        }}
                    >
                        <span>{moment(slot, "HH:mm A").format("HH:mm A")}   - {moment(slot, "HH:mm").add(sloatDuration, "minutes").format("HH:mm A")}</span>
                    </div>
                ))}
            </>
        )
    }

    const onBookAppointment = async () => {
        try {
            const payload = {
                doctorId: doctor.id,
                userId: JSON.parse(localStorage.getItem("user")).id,
                date,
                slot : selectedSloat,
                doctorName: `${doctor.firstName} ${doctor.lastName}`,
                userName: JSON.parse(localStorage.getItem("user")).username,
                bookedOn: moment().format("DD-MM-YYYY HH:mm A")
            }
            const response = await BookAppointment(payload)
            if(message.success){
                message.success(response.message)
                navigate('/profile')
            }else{
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
                    <div className=' flex max-md:flex-col items-center justify-around '>

                        <span className='font-bold'>Select Date:</span>
                        <input
                            type='date'
                            value={date}
                            className='mx-2 bottom-2 bg-[#1070778e] rounded-md text-white text-center p-1 cursor-pointer'
                            onChange={(e) => setDate(e.target.value)}
                            min={moment().format("YYYY-MM-DD")}

                        />
                    </div>
                    {/* 
                    <Button
                        label="Serach"
                        addedStyles="bg-black text-white  w-[150px]"
                    /> */}


                </div>


                <div className="flex mt-4 gap-6 flex-wrap justify-center ">
                    {date && getSloatData()}
                </div>

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
                            handleClick={()=>{navigate("/")}}
                        />
                    </div>

                }



            </div>


        </div>
    )
}

export default BookAppointments