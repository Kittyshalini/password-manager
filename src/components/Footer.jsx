import React from 'react'

const Footer = () => {
  return (
    <div className='flex gap-10 bg-slate-800 text-white h-12 flex justify-center items-center fixed bottom-0 left-0 right-0'>
        <div className='logo font-bold text-2xl'>
            <span className='text-green-500 text-2xl'>&lt;</span>Pass<span className='text-2xl text-green-500'>Op/&gt;</span> 
        </div>
      <div className='text-sm'>Created with ❤️ Shalini Mishra</div>
    </div>
  )
}

export default Footer
