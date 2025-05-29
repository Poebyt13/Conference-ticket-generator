
import React from 'react'
import patternTicket from '../assets/images/pattern-ticket.svg'
import logoFull from '../assets/images/logo-full.svg'
import iconGithub from '../assets/images/icon-github.svg'

function Ticket({ formData }) {
  return (
    <div className='mt-10 w-[25rem] h-[11.8rem] relative flex justify-between max-sm:w-[20rem] max-sm:h-[10rem] z-50'>
        <div className='flex flex-col justify-between p-4.5'>
            <div className='flex flex-col gap-1.5'>
                <img src={logoFull} alt="logoFull" className='w-50 max-sm:w-30' />
                <p className='self-end text-[.8rem] text-neutral-400 font-extralight tracking-[.03rem] max-sm:text-xs'>Jan 31, 2025 / Austin, TX</p>
            </div>
            <div className='flex gap-4 items-center'>
                <img src={formData.imgUrl} alt="imgUrl" className='w-14 h-14 rounded-sm max-sm:w-10 max-sm:h-10'/>
                <div className='flex flex-col'>
                    <h3 className='text-2xl max-sm:text-lg'>{formData.fullname}</h3>
                    <div className='flex align-center justify-center gap-1 font-extralight'>
                        <img src={iconGithub} alt="iconGithub" className='w-4' />
                        <p className="text-sm max-sm:text-xs">{formData.username}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='self-center'>
            <p className='rotate-90 text-neutral-400 tracking-[.05rem] text-lg'>#01609</p>
        </div>
        <img src={patternTicket} alt="patternTicket" className='absolute object-fill' />
    </div>
  )
}

export default Ticket