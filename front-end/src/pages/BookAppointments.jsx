import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetDoctorById } from '../API/doctor'
import { message } from 'antd'

const BookAppointments = () => {
    const [doctor, setDoctor] = useState(null)
    const { id } = useParams()

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

    return (
        <div>

            <div className='w-full flex  '>

                <div href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="https://img.apmcdn.org/fe7c9c33a959d4912822dd784e3cb99988872307/uncropped/18574c-20190918-spps-settles-retaliation-benner.jpg" alt="" height={100}/>
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                </div>

            </div>


        </div>
    )
}

export default BookAppointments