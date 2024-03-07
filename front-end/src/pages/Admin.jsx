import { Tabs, message } from 'antd'
import { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import DoctorsList from '../components/DoctorsList'
import { useNavigate } from 'react-router-dom'
import { GetUserById } from '../API/users'

function Admin() {
    const user = JSON.parse(localStorage.getItem("user"))
    const  [isAdmin, setIsAdmin] = useState(false)
    const navgate = useNavigate()

    const checkIsAdmin = async () => {
        try {
            const response = await GetUserById(user.id)
            console.log(response);
            if (response.success && response.data.role === "admin") {
                setIsAdmin(true)
            }else{
                navgate('/')
            }
        } catch (error) {
            message(error(error.message))
        }
    }
    useEffect(() => {
        checkIsAdmin()
    }, [])
    
    return (
        <div className='p-4'>
            <Tabs card>
                <Tabs.TabPane tab="Users" key="1">
                    <UsersList />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Doctors" key="2">
                    <DoctorsList />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Admin
