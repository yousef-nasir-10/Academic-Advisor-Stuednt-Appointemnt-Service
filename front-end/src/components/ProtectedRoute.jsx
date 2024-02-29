import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (!user) {
            navigate("/login")
        }


    },)

    return (
        <div className='p-6'>
            <div>
                <Navbar />
                <div className='flex'>
                    <div className='bg-gradient-to-r fbg-gradient-to-b from-white to-black  dark:to-black h-3 w-3/6' />
                    <div className='bg-gradient-to-r fbg-gradient-to-b from-black to-white  dark:to-black h-3 w-3/6 '  />

                </div>
            </div>


            <div className='mt-10 font-montserrat'>
                {children}
            </div>
        </div>
    )
}

export default ProtectedRoute