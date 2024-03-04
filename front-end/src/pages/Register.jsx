
import {  Form, message } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreateUser } from '../API/users'
import Button from '../components/Button'

const Register = () => {
   const navigate = useNavigate()
   const [form, setForm] = useState({
      username: '',
      email: '', 
      password: '', 
   })
   const handleSubmit = async (e) =>{
      e.preventDefault()
      console.log(`${form.username} ${form.email} ${form.password}`);

      try {
         const response = await CreateUser(form)
         if(response.success){
            message.success(response.message)
            navigate('/login')
            // console.log(form);
         }else{
            throw new Error (response.message)
         }
      } catch (error) {
         message.error(error.message)
      }
   }

   const handleChange = (e) => {
      const { name, value } = e.target
      setForm({...form, [name]: value })
    }

    
    useEffect(() => {
      const isSignedIn = JSON.parse(localStorage.getItem("user"))
      if(isSignedIn){
        navigate("/")
      }
    }, )
  return (
    <div className='flex h-lvh justify-center items-center'>
      <form 
         className='flex flex-col  bg-slate-100 p-10 rounded-xl justify-around font-montserrat  text-md  '
         onSubmit={handleSubmit} >
         <h1 className='text-3xl font-bold w-full border-b border-black p-2 '>Register </h1>
         <label className='mt-2 mb-2'   htmlFor="name">Name:</label>
         <input 
            className='rounded-md px-2 p-2 text-md border-2 border-black  outline-none   '  
            type="text" 
            name="username"   
            onChange={handleChange}
         />

         <label className='mt-2 mb-2' htmlFor="email">Email:</label>
         <input 
            className='rounded-md px-2 p-2 text-md border-2 border-black outline-none ' 
            type="email" 
            name="email"   
            onChange={handleChange}
         />

         <label className='mt-2 mb-2' htmlFor="password">Password:</label>
         <input 
            className='rounded-md px-2 p-2 text-md border-2 border-black outline-none' 
            type="password" 
            name="password"   
            onChange={handleChange}
         />

        <Button
            label="Register"
            addedStyles="bg-black text-white mt-4 "

        />

         <div>
            <p className='text-sm mt-6 '>Already hava an account? <Link to='/login' className='font-bold'> sign in</Link> </p>
         </div>
      </form>
    </div>
  )
}

export default Register