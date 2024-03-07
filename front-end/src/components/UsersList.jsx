import React, { useEffect, useState } from 'react'
import { Table, message } from 'antd'
import {  usersColumns } from '../constants'
import { GetAllUsers } from '../API/users'


const UsersList = () => {

    const [users,setUsers] = useState([])


 
    const getData = async () => {
        try {
            const response = await GetAllUsers ()
            if(response.success){
                console.log(response);
                setUsers(response.data)
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
      <Table columns={usersColumns} dataSource={users}/>
    </div>
  )
}

export default UsersList
