import Button from '../components/Button'
import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { daysOfWeek } from '../constants';
import { enableRipple } from '@syncfusion/ej2-base';
import { TimePicker } from 'antd';
import Input from '../components/Input';
import TextErea from '../components/TextErea';
import { useDispatch, useSelector } from 'react-redux'
import { AddDoctor, CheckIfDoctorApplied  } from '../API/doctor';
import { ShowlLoader } from '../redux/loaderSlice'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd'
const ApplyDoc = () => {




    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [alreadyApplayed, setAlreadyApplayed] = useState(false)

    const hasDoctorApplied = async () => {
        try {
            const response = await CheckIfDoctorApplied(JSON.parse(localStorage.getItem("user")).id)
            console.log(response);
            if (response.success) {
                setAlreadyApplayed(true)
                
            }

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(()=> {
        hasDoctorApplied()
    },[])

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        website: '',
        dep: "",
        address: "",
        startTime: "",
        endTime: "",
        days: [],
        fee: ""
    })

    const onChange = (time) => {
        let startHour = ''
        let startMin = ""
        let endHour = ''
        let endMin = ""

        console.log(time);
        time.forEach((element, index) => {
            console.log(element.$H);
            if (element.$H < 10) {
                if (index === 0) {

                    console.log(` ${index}: 0${element.$H}`);
                    startHour = `0${element.$H}`
                } else {
                    console.log(` ${index}: 0${element.$H}`);
                    endHour = `0${element.$H}`
                }
            } else {
                if (index === 0) {

                    console.log(` ${index}: 0${element.$H}`);
                    startHour = `${element.$H}`
                } else {
                    console.log(` ${index}: ${element.$H}`);
                    endHour = `${element.$H}`
                }
            }
        });
        time.forEach((element, index) => {
            console.log(element.$m);
            if (element.$m < 10) {
                if (index === 0) {

                    console.log(` ${index}: 0${element.$m}`);
                    startMin = `0${element.$m}`
                } else {
                    console.log(` ${index}: 0${element.$m}`);
                    endMin = `0${element.$m}`
                }
            } else {
                if (index === 0) {

                    console.log(` ${index}: ${element.$m}`);
                    startMin = `${element.$m}`
                } else {
                    console.log(` ${index}: ${element.$m}`);
                    endMin = `${element.$m}`
                }
            }
        });
        setForm(prevState => {
            return {
                ...prevState,
                startTime: `${startHour}:${startMin}`,
                endTime: `${endHour}:${endMin}`

            }
        })




    };

    function handleChange(event) {

        const { name, value, type, checked } = event.target
        setForm(prevStat => {
            return {
                ...prevStat,
                [name]: type === "checkbox" ? checked : value,

            }

        })

        if (checked) {

            setForm(prevState => {
                return {
                    ...prevState,
                    days: [...form.days, value]
                }

            })

        } else {

            setForm(prevState => {
                return {
                    ...prevState,
                    days: form.days.filter(item => item !== value)
                }

            })


        }



    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            dispatch(ShowlLoader(true))
            const response = await AddDoctor({
                ...form,
                userId: JSON.parse(localStorage.getItem("user")).id,
                status: "pending"
            })
            if (response.success) {
                message.success(response.message)
                navigate('/profile')

                // console.log(form);
            } else {
                message.error(response.message)
            }


        } catch (error) {
            dispatch(ShowlLoader(false))
        }




    }




    return (
        <div className='w-full flex flex-col items-center justify-between'>
            <h1 className='mb-4 '>Applay as An adviaor </h1>
            {!alreadyApplayed 
            ?
            <form className="flex flex-col w-full p-4 " onSubmit={handleSubmit}>


                <div className="grid md:grid-cols-2 md:gap-6">


                </div>

                {/*personal info*/}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={handleChange}
                        label="First Name "
                    />
                    <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={handleChange}
                        label="Last Name "
                    />

                    <Input
                        type="email"
                        name="email"
                        id="floating_email"
                        onChange={handleChange}
                        label="Email address"
                    />

                    <Input
                        type="tel"
                        name="phone"
                        id="floating_phone"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        onChange={handleChange}
                        label="phone Number"
                    />
                    <Input
                        type="text"
                        name="website"
                        id="website"
                        onChange={handleChange}
                        label="website"
                    />


                    <div className='relative z-0 w-full mb-5 group'>

                        <select
                            id="countries"
                            onChange={handleChange}
                            name='dep'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="all"  >Choose a depatrment </option>
                            <option value="CS">CS</option>
                            <option value="IS">IS</option>
                            <option value="CN">CN</option>
                            <option value="CE">CE</option>
                        </select>
                    </div>

                    <TextErea
                        type="text"
                        name="address"
                        label="address"
                        onChange={handleChange}

                    />




                </div>


                {/* time picker & fee */}
                <div className='flex max-xl:flex-col    justify-center   mt-10 border-t-2 border-black  pt-10 '>
                    <div className='flex w-full xl:w-2/6      max-xl:flex-col '>
                        <div className='flex  w-6/6   items-center max-xl:w-full max-xl:mb-2     '>
                            <h1 className='w-[150px] '> Set session time </h1>
                            <div className=' '>

                                <TimePicker.RangePicker

                                    onChange={onChange}
                                    format='HH:mm'
                                    name='startTime'
                                    timeNaming="Hours"
                                    minuteStep={15}
                                />

                            </div>

                        </div>





                    </div>

                    <Input
                        type="number"
                        name="fee"
                        id="fee"
                        onChange={handleChange}
                        label="fee"
                    />




                </div>
                {/* los dias de la semana */}
                <div className='flex   items-center justify-center flex-wrap '>
                    {daysOfWeek.map(day => (
                        <div className="flex items-center m-2 justify-between w-[120px  " key={day.key}>
                            <input
                                id={day.shortcut}
                                type="checkbox"
                                value={day.title}
                                onChange={handleChange}
                                className="checkbox"
                                name='days'


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
            :
            <div className='flex items-center justify-center w-full bg-slate-100 '>
                <h1 className='text-xl font-bold w-4/6 text-center '>Your apllication has been rececived, bendening approval! </h1>
            </div>
            }
        </div>
    )
}

export default ApplyDoc