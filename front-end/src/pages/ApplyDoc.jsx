import Button from '../components/Button'
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { TimePicker } from 'antd';
import { daysOfWeek } from '../constants';

const ApplyDoc = () => {

    const [value, setValue] = useState(null)
    const [daysChecked, setDays] = useState([])

    const onChange = (time) => {
        setValue(time);
        
    };

    

    function handleChange(event) {

        const { name, value, type, checked } = event.target
        setForm(prevStat => {
            return {
                ...prevStat,
                [name]: type === "checkbox" ? checked : value,
                
            }

        })

        console.log(checked);


    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setForm(prevStat => {
            return {
                ...prevStat,
                days: daysChecked
            }
        })

        console.log(form);
  

     }



    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        website: '',
        dep: "",
        address: "",
        startTime: "" ,
        endTime: "" ,
        days: []
    })



    return (
        <div className='w-full flex flex-col items-center justify-between'>
            <h1 className='mb-4 '>Applay as An adviaor </h1>
            <form className="flex flex-col w-full p-4 " onSubmit={handleSubmit}>


                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="text" 
                            name="firstName" 
                            onChange={handleChange}
                            id="floating_first_name" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            // required 
                        />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="text" 
                            name="lastName" 
                            id="floating_last_name" 
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            // required 
                        />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="tel" 
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                            onChange={handleChange}
                            name="phone" 
                            id="floating_phone" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            // required 
                            />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="email" 
                            name="email" 
                            id="floating_email" 
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            // required 
                        />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>


                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="text" 
                            name="website" 
                            id="website" 
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            // required
                        />
                        <label htmlFor="website" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">website</label>
                    </div>
                    <div className='relative z-0 w-full mb-5 group'>

                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="all"  >Choose a depatrment </option>
                            <option value="CS">CS</option>
                            <option value="IS">IS</option>
                            <option value="CN">CN</option>
                            <option value="CE">CE</option>
                        </select>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <textarea type="text" name="address" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">address </label>
                    </div>



                </div>

                <div className='flex   items-center justify-center   mt-10 border-t-2 border-black max-xl:flex-col pt-10 '>
                    <div className='flex w-2/6  justify-start max-xl:w-full  '>
                        <div className='flex justify-center items-center    mx-2 max-xl:flex-col'>
                            <h1 className='mr-3'>start at:</h1>
                            <TimePicker 
                                value={value}  
                                onChange={onChange} 
                                format='HH:mm' 
                                name='startTime'
                            />
                        </div>
                        <div className='flex justify-center items-center  max-xl:flex-col '>
                            <h1 className='mr-3'>end at:</h1>
                            <TimePicker 
                                value={value} 
                                name='endTime'
                                onChange={onChange} 
                                format='HH:mm' 

                            />
                        </div>

                    </div>

                    <div className="relative z-0 w-3/6 max-xl:w-full  mb-5 group">
                        <input 
                            type="number" 
                            name="fee" 
                            id="fee" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                             
                        />
                        <label htmlFor="fee" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">fee</label>
                    </div>


                </div>

                <div className='flex   items-center justify-center flex-wrap '>
                    {daysOfWeek.map(day => (
                        <div className="flex items-center m-2 justify-between w-[120px  " key={day.key}>
                            <input 
                                id={day.shortcut}
                                type="checkbox"
                                value={day.title}

                                className="checkbox"


                            />
                            <label htmlFor={day.shortcut} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{day.title}</label>
                        </div>
                    ))}

                </div>


                <Button
                    label="Submit"
                    addedStyles="bg-black text-white mt-10 w-[200px]"
                />
            </form>
        </div>
    )
}

export default ApplyDoc