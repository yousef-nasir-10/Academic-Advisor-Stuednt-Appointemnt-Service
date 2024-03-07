import React, { useEffect, useState } from 'react'
import { GetAllDoctors } from '../API/doctor'
import { Table, message } from 'antd'
import { doctorColumns } from '../constants'


const DoctorsList = () => {
    const action = {title: "Action", dataIndex: "actions", render: (text,record) => {
        if (record.status === "pending") {
            return(
                <div className='flex   gap-2'>
                    <span className='underline cursor-pointer text-[#ff3535] '>Reject</span>
                    <span className='underline cursor-pointer text-cyan-600'>Confirm</span>
                </div>
            )
            
        }
    }}

    doctorColumns.push(action)

    const [doctors,setDoctors] = useState([])
    const getData = async () => {
        try {
            const response = await GetAllDoctors()
            if(response.success){
                console.log(response);
                setDoctors(response.data)
            }else{
                throw new Error(response.message)
            }
        } catch (error) {
            console.log(error);
            message.error(error.message)
        }
    }

    useEffect(()=>{
        getData()
    }, [])
  return (
    <div className=''>
      <Table columns={doctorColumns} dataSource={doctors}/>
    </div>
  )
}

export default DoctorsList
