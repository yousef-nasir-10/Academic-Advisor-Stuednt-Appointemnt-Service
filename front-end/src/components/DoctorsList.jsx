import React, { useEffect, useState } from 'react'
import { GetAllDoctors, UpateDoctor } from '../API/doctor'
import { Table, message } from 'antd'
import { doctorColumns } from '../constants'


const DoctorsList = () => {
    const [status, setStatus] = useState("")
    const action = {title: "Action", dataIndex: "actions", render: (text,record) => {
        if (record.status === "pending") {
            return(
                <div className='flex   gap-2'>
                    <span className='underline cursor-pointer text-[#ff3535] ' onClick={()=> 
                    changeStatus({
                        ...record,
                        status: "rejected"
                    })
                    }>Reject</span>
                    <span className='underline cursor-pointer text-cyan-600' onClick={()=> 
                    changeStatus({
                        ...record,
                        status: "approved"

                    })} >Confirm</span>
                </div>
            )
            
        }

        if (record.status === "approved") {
            return (
                <div>
                    <span className='underline cursor-pointer text-[#ff3535]' onClick={()=>
                        changeStatus({
                            ...record,
                            status: "blocked"
                        })}>Block</span>
                </div>
            )
            
        }

        if (record.status === "blocked") {
            return (
                <div>
                    <span className='underline cursor-pointer text-cyan-600' onClick={()=> 
                    changeStatus({
                        ...record,
                        status: "approved"

                    })}>Unblock</span>
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

    const changeStatus = async (status) => {

        setStatus(status.status)
        try {
            const response = await UpateDoctor(status)
            if (response.success) {
                message.success(response.message)
                
            }else{
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(()=>{
        getData()
    }, [status])
  return (
    <div className=''>
      <Table columns={doctorColumns} dataSource={doctors}/>
    </div>
  )
}

export default DoctorsList
