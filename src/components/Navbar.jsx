import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex justify-around px-5 h-16 items-center text-white'>
        <div className='logo font-bold text-2xl'>
            <span className='text-green-500 text-2xl'>&lt;</span>Pass<span className='text-2xl text-green-500'>Op/&gt;</span> 
        </div>
    </nav>
  )
}

export default Navbar
