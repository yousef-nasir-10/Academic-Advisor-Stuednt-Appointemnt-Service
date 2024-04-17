import { useEffect, useRef, useState } from 'react'
import UserView from '../components/UserView'

import AdvisorView from '../components/AdvisorView';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  return (
    <div className='student-page flex flex-col   '>
      {user && user.role === "user" ?
        <UserView>
        </UserView>
        :
        <AdvisorView>
        </AdvisorView>

      }
    </div>
  )
}
export default Home