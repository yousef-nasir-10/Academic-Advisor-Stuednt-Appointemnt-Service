import { useEffect, useState, Fragment, useRef } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { GetAllDoctors } from '../API/doctor'
import { message } from 'antd'
import { DoctorCard } from '../components/DoctorCard'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import DialogCom from '../components/DialogCom'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import moment from 'moment';
import Datepicker from "react-tailwindcss-datepicker";

const Home = () => {

  const [doctors, setDoctors] = useState([])
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
});


  const getData = async () => {
    try {
      const response = await GetAllDoctors()
      if (response.success) {
        console.log(response.data);
        setDoctors(response.data)
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  }
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue.startDate);
    setDate(newValue.startDate);
    setValue(newValue)
}

  useEffect(() => {
    getData()
  }, [])

  const navigate = useNavigate()
  return (
    <div className='student-page flex flex-col   '>

      <div className='flex flex-col w-full p-4  mb-2  ' >
        <h1 className='text-xl '>Your Academic advisor:</h1>
        <DoctorCard
          firstName="Mustafa"
          lastName="Ahamad"
          dep="Informaton System "
          email="Mustafa@gmail.com"
          phone="96685798765"
          office="2050"


        />




      </div>
      <div className='flex w-full '>

        <div className='flex w-full h-[300px] p-4 bg-[#46cc2500] items-center justify-center flex-col'>
          <div className='flex md:w-[700px] mb-4'>

            <p className=' text-black  p-4 rounded-md  font-bold text-justify  '>Do not histate to ask for help with anything in your personal or academic life, you can speak discreetly with your academic adviser. All conversations will be conducted with complete secrecy.</p>
          </div>



          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Seudule a sesstion
          </button>

          <DialogCom open={open} onClose={() => setOpen(false)}>

            <div className='flex flex-col w-full'>
              <div>
                <div>

                  <Datepicker
                    value={value}
                    onChange={handleValueChange}
                    asSingle={true}
                    minDate={moment().format("YYYY-MM-DD")}
                    classNames="outline-none "
                    showShortcuts={true}
                    primaryColor={"sky"}

                    configs={{
                      shortcuts: {
                        today: "Today",
                      },

                    }}

                  />
                </div>
              </div>
              <div className="flex w-full items-center  bg-slate-50 justify-between">
                <div className=" w-full flex items-center justify-start  gap-x-6 bg-slate-500">
                  <button type="button" onClick={() => { setOpen(false) }} className="text-sm font-semibold leading-6 mr-2 text-gray-900">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => { setOpen(false) }}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

          </DialogCom>


        </div>



      </div>

      {/* second row */}
      <div className='flex w-full mt-2 '>
        <div className='flex w-3/6 bg-slate-50 p-4 h-[300px] bg-[#cc842515] mr-2' >
          <h1>Upcoming Sesstions </h1>

        </div>
        <div className='flex w-3/6 bg-slate-100 p-4 bg-[#cc25250c] h-auto'>
          <h1>Canceled sesstions </h1>

        </div>

      </div>


    </div>
  )
}

export default Home