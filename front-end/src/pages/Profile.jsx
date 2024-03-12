import { Tabs } from 'antd'
import React from 'react'
import Appointments from '../components/Appointments'

const Profile = () => {
  return (
    <div>
        <Tabs>
          <Tabs.TabPane tab="Appointments" key="1">
            <Appointments/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Profile" key="2"></Tabs.TabPane>

        </Tabs>
    </div>
  )
}

export default Profile