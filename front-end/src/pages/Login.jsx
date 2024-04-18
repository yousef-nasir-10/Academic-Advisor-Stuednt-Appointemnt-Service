
import {  Form, message } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../API/users'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShowlLoader } from '../redux/loaderSlice'
import { ImSpinner9 } from "react-icons/im";
import Button from '../components/Button'



const Login = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.loader)
   const [form, setForm] = useState({
      name: '',
      email: '', 
      password: '', 
   })
   const handleSubmit = async (e) =>{
      e.preventDefault()
      dispatch(ShowlLoader(true))
      console.log(`${form.name} ${form.email} ${form.password}`);

      try {
        const response = await LoginUser(form)
        dispatch(ShowlLoader(false))
        if (response.success) {
          message.success(response.message)
          localStorage.setItem("user", JSON.stringify({
            ...response.data,
            password: ""
          }))
          navigate("/")
        }else{
          throw new Error(response.message)
        }
      } catch (error) {
        dispatch(ShowlLoader(false))
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
        // navigate("/")
      }

   
    }, )
    
    return (
        <div className='flex h-lvh justify-center items-center'>
      <form 
         className='flex flex-col  max-md:w-5/6  bg-slate-100 p-10 rounded-xl justify-around font-montserrat  text-md  '
         onSubmit={handleSubmit} >
         <h1 className='text-3xl font-bold w-full border-b border-black p-2 '>Login </h1>


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
            label="Login"
            addedStyles="bg-black text-white mt-4"
        />

         <div>
            <p className='text-sm mt-6 '>You don't have an account? <Link to='/Register' className='font-bold'> Register now!</Link> </p>
         </div>
         <ImSpinner9  className={`${loading? 'motion-safe:animate-spin' : "hidden"} text-3xl text-black self-center mt-4 text-[#237a083f]`}/>
      </form>

  
    </div>
  )
}

export default Login