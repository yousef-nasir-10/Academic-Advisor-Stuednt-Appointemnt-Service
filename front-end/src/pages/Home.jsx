import { useEffect, useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { GetAllDoctors } from '../API/doctor'
import { message } from 'antd'
import { DoctorCard } from '../components/DoctorCard'

const Home = () => {

  const [doctors, setDoctors] = useState([])

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
  useEffect(() => {
    getData()
  }, [])

  const navigate = useNavigate()
  return (
    <div className=''>
      <div className='flex justify-around mx-4  max-md:flex-col-reverse'>
        <div className="w-3/6 max-md:w-full  rounded-lg max-md:mt-4">
          <input
            type="search"
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            id="exampleSearch"
            placeholder="Search Advisor" />
        </div>
        {/* <div className='w-[300px] justify-end flex  ' >
          <Button
            label="Applay Advisor"
            addedStyles="bg-black text-white "
            handleClick={() => navigate('/ApplayDoc')}


          />

        </div> */}


      </div>

      <div className='flex mt-4 w-full justify-center flex-wrap gap-4'>

        {doctors.map((doctor) => (
          <DoctorCard
            {...doctor}
            handleClick = {()=> navigate(`/book-appointment/${doctor.id}`) }
          />
        ))}
      </div>

    </div>
  )
}

export default Home