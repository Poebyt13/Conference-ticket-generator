
import { useState } from 'react'

import CustomForm from './components/CustomForm'
import Ticket from './components/Ticket'

import logo from './assets/images/logo-full.svg'
import patternLines from './assets/images/pattern-lines.svg'
import patternLineBottomDesktop from './assets/images/pattern-squiggly-line-bottom-desktop.svg'
import patternLineTop from './assets/images/pattern-squiggly-line-top.svg'
import patternCircle from './assets/images/pattern-circle.svg'

function App() {

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    imgUrl: '',
  })
  const [submitted, setSubmitted] = useState(false)

  return (
    <>

      <section>
        <img src={logo} alt="logo" />
      </section>
      <section className='text-center'>
        {
          !submitted ? (
            <>
              <h1 className='text-4xl font-bold tracking-[.2rem] max-sm:text-2xl max-sm:tracking-normal max-sm:font-extrabold'>Your Journey to Coding Conf <span className='responsive-break' />2025 Starts Here!</h1>
              <p className='text-sm mt-3 text-neutral-400 tracking-[.09rem]'>Secure your spot at next year's biggest coding conference.</p>
            </>
          ) : (
            <>
              <h1 className='text-4xl font-bold tracking-[.2rem] max-sm:text-3xl max-sm:tracking-normal max-sm:font-extrabold'>Congrats <span className='gradient-text'>{formData.fullname}</span> <span className='responsive-break' />Your ticket is ready.</h1>
              <p className='text-sm mt-3 text-neutral-400 tracking-[.09rem] max-sm:text-base'>We've emailed your ticket to <span className='responsive-break' /><span className='text-orange-500'>{formData.email}</span> and will send updates in <span className='responsive-break' />the run up to the event</p>
            </>

          )
        }
      </section>

      {
        !submitted ? (
          <>
            <CustomForm setFormData={setFormData} setSubmitted={setSubmitted} />
          </>
        ) : (
          <>
            <Ticket formData={formData} />
          </>
        )
      }

      <img src={patternLines} alt="patternLine" className='absolute top-0' />
      <img src={patternLineBottomDesktop} alt="patternLine" className='absolute bottom-0 left-0 z-10' />
      <img src={patternLineTop} alt="patternLine" className='absolute top-0 right-0 z-10' />
      <img src={patternCircle} alt='patternCircle' className='absolute w-40 right-0 mt-40 mr-40' />
    </>
  )
}

export default App