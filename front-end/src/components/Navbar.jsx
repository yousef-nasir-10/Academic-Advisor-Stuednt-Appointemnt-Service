import React from 'react'
import { RiShieldUserLine } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    return (
        <nav className='p-4 justify-between font-montserrat flex    '>
            <div className='max-xl:w-3/6'><h1 className='text-xl font-extrabold primary max-md:text-sm cursor-pointer' onClick={() => {
                navigate("/")
            }} >Booking Appoitemnt</h1></div>
            {user &&
                <div className='flex justify-between items-center gap-6 max-md:3/6 max-md:flex-col max-md:gap-2 max-md:items-start '>
                    <div className='flex items-center cursor-pointer' onClick={() => {
                        navigate("/profile")
                    }}>
                        <RiShieldUserLine className='text-xl mr-2' />
                        <h1 className='uppercase text-xl font-semibold  max-md:text-sm '>{user.username}
                        </h1>
                    </div>
                    <IoLogOut className='ml-8 text-2xl cursor-pointer max-md:ml-0 max-md:self-end' onClick={() => {
                       localStorage.removeItem("user")
                       navigate("/login")
                    }} />
                </div>}

                
            
        </nav>
    )
}

export default Navbar