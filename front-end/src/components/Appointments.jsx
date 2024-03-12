import { Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetDoctorAppointments, GetUserAppointments, UpdateAppointmentsStatus } from '../API/appointments'

const Appointments = () => {
    const [appointments, setAppointments] = useState([])
    const [status, setStatus] = useState("")
    const changeStatus = async (id, status) => {

        setStatus(status.status)
        try {
            const response = await UpdateAppointmentsStatus(id, status)
            if (response.success) {
                message.success(response.message)
                
            }else{
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    
    const action = {title: "Action", dataIndex: "actions", render: (text,record) => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (record.status === "pending" && user.role === "advisor" ) {
            return(
                <div className='flex   gap-2'>
                    <span className='underline cursor-pointer text-[#ff3535] ' onClick={()=> 
                    changeStatus(record.id, "cancelled")
                    }>Reject</span>
                    <span className='underline cursor-pointer text-cyan-600' onClick={()=> 
                    changeStatus(record.id, "approved")} >Confirm</span>
                </div>
            )
            
        }

        if (record.status === "approved" && user.role === "advisor") {
            return (
                <div>
                    <span className='underline cursor-pointer text-[#ff3535]' onClick={()=>
                        changeStatus(record.id, "cancelled")}>Cancel</span>
                </div>
            )
            
        }

        
    }}


    const getData = async () => {
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user);
        if (user.role === "advisor") {
            const response = await GetDoctorAppointments(user.id)
            console.log(response);
            if (response.success) {
                setAppointments(response.data)
            }
        }else{
            const response = await GetUserAppointments(user.id)
            console.log(response);
            if (response.success) {
                setAppointments(response.data)
            }
        }
    }
    useEffect(() => {
        getData()
    }, [status])
    
    const columns = [
        {title:"Date", dataIndex: "date"},
        {title:"Time", dataIndex: "slot"},
        {title:"Doctor", dataIndex: "doctorName"},
        {title:"User", dataIndex: "userName"},
        {title:"Booked On", dataIndex: "bookedOn"},
        {title:"Reason", dataIndex: "reason"},
        {title:"Status", dataIndex: "status"},
        action
    ]
  return (
    <div>
        <Table columns={columns} dataSource={appointments || [] }/>
    </div>
  )
}

export default Appointments