import { useEffect, useState } from 'react'
import { GetDoctorById } from '../API/doctor'
import { message } from 'antd'
import { DoctorCard } from './DoctorCard'
import DialogCom from './DialogCom'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { Box, sliderClasses } from '@mui/material'
import { BookAppointment, GetDoctorAppointments, GetDoctorAppointmentsOnDate, GetUserAppointments, UpdateAppointmentsStatus } from '../API/appointments'
import dayjs from 'dayjs'
import { isAfter, isBefore, isSameDay } from 'date-fns'


const UserView = () => {

  const [open, setOpen] = useState(false)
  const [doctor, setDoctor] = useState(null)
  const [date, setDate] = useState(null)
  const [selectedSloat, setSelectedSloat] = useState("")
  const [bookedSloats, setBookedSloats] = useState([])
  const [isSubbmit, setIsSubbmit] = useState(false)
  const [status, setStatus] = useState("")
  const [sesstion, setSesstion] = useState({
    pending: [],
    approved: [],
    canceled: []
  })

  const [formData, SetFormData] = useState({
    reason: "",
    via: ""
  })
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
  });



  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    if (date) {
      getBookedSlots()
    }

  }, [date])

  useEffect(() => {
    getSettions()


  }, [status])

  useEffect(() => {
    if (selectedSloat && formData.reason != "" && formData.via != "") {
      setIsSubbmit(true)
    } else {
      setIsSubbmit(false)
    }

  }, [selectedSloat, formData.reason, formData.via])

  const getSettions = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user);
    if (user.role === "advisor") {
      const response = await GetDoctorAppointments(user.id)
      console.log(response);
      if (response.success) {
        setSesstion(response.data)
        console.log(response);
      }
    } else {
      const response = await GetUserAppointments(user.id)
      console.log(response);
      if (response.success) {
        const pending = response.data.filter(sesstion => sesstion.status === "pending")
        const approved = response.data.filter(sesstion => sesstion.status === "approved")
        const canceled = response.data.filter(sesstion => sesstion.status === "canceled")
        console.log(approved);
        setSesstion({
          pending,
          approved,
          canceled
        })


      }
    }
  }

  function handleChange(event) {

    const { name, value, type, checked } = event.target
    SetFormData(prevStat => {
      return {
        ...prevStat,
        [name]: type === "checkbox" ? checked : value,

      }

    })
    console.log(formData);
  }
  const getData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      console.log(user);
      const response = await GetDoctorById(user.advisedBy)
      if (response.success) {
        console.log(response.data);
        console.log(response.data.days[0].slots);
        let sunSlots = response.data.days[0].slots
        let days = response.data.days
        days.forEach((day, i) => {
          day.slots.forEach(slot => {
            if (slot.enabled) {
              console.log(i, day.day, slot);

            }
          });
        });


        if (!response.data.days[0].slots.includes({ enabled: true })) {
          console.log("here");
        }
        setDoctor(response.data)

      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const getSloatData = () => {
    const day = moment(date).format("dddd")
    console.log(day);
    let days = doctor.days
    let slts = []
    let slts1 = []
    let m = false
    console.log(days);
    days.forEach((day1, i) => {
      day1.slots.forEach(slot => {

        if (slot.enabled) {
          // console.log( i,day1.day,slot);
          // console.log(day1);
          if (day == day1.day) {
            console.log(slot.startTime);
            // console.log(moment(slot.startTime, "DD")._i );
            slts.push(moment(slot.startTime, "hh:mm A").format('HH:mm'))
            slts1.push(moment(slot.endTime, "hh:mm A").format('HH:mm '))

          }
        } else {
          if (day == day1.day) {
            console.log("here");
           


          }

        }
      });
    });

    console.log(slts);
    console.log(slts1);
    // if (!doctor.days.includes(day)) {
    //   return <h3>Doctor is not available on {moment(date).format("YYYY-MM-DD")}</h3>
    // }

    if (m) {
      return <h3>Doctor is not available on {moment(date).format("YYYY-MM-DD")}</h3>

    }

    let startTime = moment(doctor.startTime, "hh:mm A")
    let endTime = moment(doctor.endTime, "hh:mm A")
    console.log(doctor);

    let sloatDuration = 15 // in minutes 
    const slots = []
    const booked = []
    const a = []



    // while (startTime < endTime) {
    //   // if (bookedSloats?.find((slot) => slot.slot === startTime.format("HH:mm"))) {
    //   //     booked.push(startTime.format("HH:mm"))

    //   // }
    //   // if (!bookedSloats?.find((slot) => slot.slot === startTime.format("HH:mm"))) {
    //   //     slots.push(startTime.format("HH:mm"))

    //   // }
    //   slots.push(startTime.format("hh:mm A "))


    //   startTime.add(sloatDuration, "minutes")


    slts.forEach((element, index) => {
      console.log(index);
      let startTime = moment(slts[index], 'hh:mm A')
      let endTime = moment(slts1[index], 'hh:mm A')
      let checkAginstToday = `${dayjs().format('YYYY-MM-DD hh:mm A ')}`
      let newDate = dayjs(date).format('YYYY-MM-DD hh:mm A')

      while (startTime < endTime) {
        
        let start = `${dayjs(startTime).format('YYYY-MM-DD hh:mm A')} `
        console.log(start,checkAginstToday, newDate);

        const result = isAfter(newDate, start)
        let result1 = isBefore(checkAginstToday, start)
        console.log(result);

        
        if (result) {
          slots.push(startTime.format("hh:mm A "))
        }else{
          console.log((isSameDay(newDate, start)));
          if((isSameDay(newDate, start))){
            if (result1) {
              slots.push(startTime.format("hh:mm A "))
            }

          }


        }




        console.log("here");


        startTime.add(sloatDuration, "minutes")
      }
      // dayjs(slts[index]).add(sloatDuration, "minutes")
    });



    console.log(slots.length);

    return (
      <>
        {slots.length> 0? slots.map((slot, index) => {
          const isBooked = bookedSloats?.find(
            (bookedSloat) => bookedSloat.slot === slot && bookedSloat.status !== 'canceled'
          )
          return (



            <div
              className={
                ` p-2 rounded-md  bg-[#19774025]
                          ${selectedSloat === slot ? "bg-[#1d7e9e6b]" : ""}
                          ${isBooked ? "pointer-events-none bg-[#77191925] " : ""}
                          `
              }
              onClick={() => {

                setSelectedSloat(slot)
              }}

            >
              <span>{moment(slot, "hh:mm A").format("hh:mm A ")}   - {moment(slot, "hh:mm A ").add(sloatDuration, "minutes").format("hh:mm A")}</span>
            </div>


          )
        }) :
        
        <p className='w-full text-red-500'>There's no sesstion.</p>
        
        }


      </>
    )
  }

  const getBookedSlots = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user);
    try {
      const response = await GetDoctorAppointmentsOnDate(user.advisedBy, date)
      console.log(response);
      if (response.success) {
        setBookedSloats(response.data)
      } else {
        message.error(response.message)
      }

    } catch (error) {
      message.error(error.message)
    }
  }
  const onBookAppointment = async () => {
    try {
      const payload = {
        doctorId: doctor.id,
        userId: JSON.parse(localStorage.getItem("user")).id,
        date,
        slot: selectedSloat,
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        userName: JSON.parse(localStorage.getItem("user")).username,
        bookedOn: dayjs().format("DD-MM-YYYY HH:mm "),
        reason: formData.reason,
        via: formData.via,
        status: "pending",
        isBefore: false
      }
      const response = await BookAppointment(payload)
      if (message.success) {
        message.success(response.message)
        // navigate('/profile')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const changeStatus = async (id, status) => {

    setStatus(status.status)
    try {
      const response = await UpdateAppointmentsStatus(id, status)
      if (response.success) {
        message.success(response.message)

      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const notificationMethods = [
    { id: 'inPerson', title: 'Face to Face ', },
    { id: 'phone', title: 'Phone call' },
    { id: 'online', title: 'Online (Zoom)' },
  ]
  const stats = [
    { name: 'Upcoming session (Approved)', stat: sesstion.approved, previousStat: '70,946', change: '12%', changeType: true },
    { name: 'Pending Session', stat: sesstion.pending, previousStat: '56.14%', change: '2.02%', changeType: true },
    { name: 'Canceled Session', stat: sesstion.canceled, previousStat: '28.62%', change: '4.05%', changeType: false },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className='student-page flex flex-col   '>
      {/* advisor info */}
      <div className='flex flex-col w-full p-4  mb-2  ' >
        <h1 className='text-xl '>Your Academic advisor: </h1>
        <DoctorCard
          firstName={doctor && doctor.firstName}
          lastName={doctor && doctor.lastName}
          dep="Informaton System "
          email="Mustafa@gmail.com"
          phone="96685798765"
          office={doctor && doctor.officeRoom}
          avtar={doctor && doctor.imgProfile}
        />
      </div>
      {/* secuduling a sesstion section  */}
      <div className='flex w-full '>
        <div className='flex w-full h-[300px] p-4 bg-[#46cc2500] items-center justify-center flex-col'>
          <div className='flex md:w-[700px] mb-4'>

            <p className=' text-black  p-4 rounded-md  font-bold text-justify  '>Do not histate to ask for help with anything in your personal or academic life, you can speak discreetly with your academic adviser. All conversations will be conducted with complete secrecy.</p>
          </div>



          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Seudule a session
          </button>

          <DialogCom open={open} onClose={() => setOpen(false)}>

            <div className='flex flex-col w-full'>
              <div className='flex flex-col w-full'>
                <div className=' mt-4'>
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          label="Today's sessions"
                          value={value}
                          minDate={dayjs()}

                          onChange={(newValue) => {
                            setDate(dayjs(newValue).format("YYYY-MM-DD"))
                            setSelectedSloat(null)
                            console.log(dayjs(newValue).format("YYYY-MM-DD"));
                          }}


                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                  <div className="grid mt-2 grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-2">

                    {doctor && getSloatData()}
                  </div>
                  <div className='mt-2'>
                    <label className="text-base font-semibold text-gray-900">meduim </label>
                    <p className="text-sm text-gray-500">How do you prefer to conduct this session?</p>
                    <fieldset className="mt-4">
                      <legend className="sr-only">Notification method</legend>
                      <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                        {notificationMethods.map((notificationMethod) => (
                          <div key={notificationMethod.id} className="flex items-center">
                            <input
                              id={notificationMethod.id}
                              name="via"
                              type="radio"
                              value={notificationMethod.id}
                              onChange={handleChange}
                              defaultChecked={notificationMethod.id === 'email'}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                              {notificationMethod.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <div className='mt-2'>
                    <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                      Write a message
                    </label>
                    <div className="mt-2">
                      <textarea
                        rows={4}
                        onChange={handleChange}
                        name="reason"
                        value={formData.reason}
                        id="comment"
                        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none max-h-20"

                        placeholder=''
                      />
                    </div>
                  </div>




                </div>


              </div>

              <div className="flex w-full items-center  bg justify-between">
                <div className=" w-full flex items-center justify-start  gap-x-6 mt-4">
                  <button type="button" onClick={() => { setOpen(false) }} className="text-sm font-semibold leading-6 mr-2 text-gray-900">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      onBookAppointment()
                      setOpen(false)
                    }}
                    className={`${!isSubbmit ? " pointer-events-none bg-[#77191925] px-4 py-2 rounded-md cursor-not-allowed opacity-50" : "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}`}
                  >
                    Seudule
                  </button>
                </div>
              </div>
            </div>

          </DialogCom>


        </div>



      </div>
      {/* second row */}


      <div className='flex w-full mt-2 '>
        <div className='flex w-full flex-col  '>
          <h3 className="text-base font-semibold leading-6 text-gray-900">Sessions</h3>
          <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
            {stats.map((item) => (
              <div key={item.name} className="px-4 py-5 sm:p-6">
                <dt className="text-base font-normal text-gray-900">{item.name}</dt>
                <dd className="mt-1 flex flex-col items-baseline justify-between md:block lg:flex">
                  {item.stat.map((sesstion, index) => (
                    <div className='mt-2 w-full'>
                      <div className="flex items-baseline text-md font-semibold text-indigo-600">

                        {sesstion.date}
                        <span className="ml-2 text-sm font-medium text-gray-500">at {sesstion.slot}</span>

                        {item.changeType && <span className="inline-flex items-center rounded-full bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10  ml-auto cursor-pointer"

                          onClick={() => {
                            if (sesstion.status === "approved" || sesstion.status === "pending") {
                              changeStatus(sesstion.id, "canceled")

                            }
                          }}
                        >
                          cancel
                        </span>}
                      </div>
                      <div className="flex items-baseline text-md font-semibold text-black/80">

                        Way of conduction:
                        <span className="ml-2 text-sm font-medium text-gray-500"> {sesstion.via}</span>

                      </div>


                    </div>

                  ))}

                </dd>



              </div>
            ))}
          </dl>
        </div>
      </div>

    </div>
  )
}

export default UserView