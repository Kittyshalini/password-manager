import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/manager'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className="min-h-[110vh]">
    <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
