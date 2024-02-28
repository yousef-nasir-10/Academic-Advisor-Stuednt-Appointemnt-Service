
import { Button, Form, message } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../API/users'

const Login = () => {
  const navigate = useNavigate()
   const [form, setForm] = useState({
      name: '',
      email: '', 
      password: '', 
   })
   const handleSubmit = async (e) =>{
      e.preventDefault()
      console.log(`${form.name} ${form.email} ${form.password}`);

      try {
        const response = await LoginUser(form)
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
        message.error(error.message)
      }
   }

   const handleChange = (e) => {
      const { name, value } = e.target
      setForm({...form, [name]: value })
    }
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

         <button className='bg-black w-3/6 mt-4 text-white p-2 rounded-md hover:bg-[#0f515a]'> submit</button>

         <div>
            <p className='text-sm mt-6 '>You don't have an account? <Link to='/Register' className='font-bold'> Register now!</Link> </p>
         </div>
      </form>
    </div>
  )
}

export default Login