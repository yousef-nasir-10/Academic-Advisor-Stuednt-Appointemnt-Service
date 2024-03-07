import { Tabs } from 'antd'
import React from 'react'
import UsersList from '../components/UsersList'
import DoctorsList from '../components/DoctorsList'

function Admin() {
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
