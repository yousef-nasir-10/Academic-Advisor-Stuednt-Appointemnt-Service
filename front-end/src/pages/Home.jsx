import React from 'react'
import Button from '../components/Button'

const Home = () => {
  return (
    <div className='flex justify-center flex-row-reverse max-md:flex-col   '>
      <div className='min-w-[280px] max-md:mb-2 flex justify-end rounded-sm '>
        <Button label="Applay Advisor " bgColor="bg-black" txtColor="text-white"  />

      </div>
      <input type='text' placeholder='search ' className=' outline-none bg-[#0808080c] border-b-4 border-black  p-2 rounded-md w-3/6 max-md:w-full   h-10'/>
    </div>
  )
}

export default Home