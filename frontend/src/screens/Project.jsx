import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Project = () => {

    const location = useLocation();
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
    return (

        <main
            className='h-screen w-screen flex'>
            <section className='left relative flex flex-col h-screen min-w-72 bg-slate-300 ' >
                <header
                    className='flex justify-end p-2 px-4 width-full bg-slate-100 '>
                    <button
                        onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                        className='p-2 ' >
                        <i className="ri-group-fill" ></i>
                    </button>

                </header>

                <div className="conversation-area flex-grow flex flex-col relative ">
                    <div className="message-box flex-grow flex p-1 flex-col gap-1">
                        <div className=" message max-w-56 flex flex-col p-2 bg-slate-50 rounded-md w-fit ">
                            <small className='opacity-65 text-xs' >example@gmail.com</small>
                            <p className='text-sm' >Lorem ipsum dolor sit amet. lorem45</p>
                        </div>
                        <div className="ml-auto message max-w-56 flex flex-col p-2 bg-slate-50 rounded-md w-fit ">
                            <small className='opacity-65 text-xs' >example@gmail.com</small>
                            <p className='text-sm' >Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                    <div className="inputField w-full flex  ">
                        <input className='p-2 px-4 border-none outline-none' type="text " placeholder='Enter message' />
                        <button className='flex-grow' >
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </div>

                <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
                    <header className='flex justify-between items-center px-4 p-2 bg-slate-200'>

                        <h1
                            className='font-semibold text-lg'
                        >Collaborators</h1>

                        <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                            <i className="ri-close-fill"></i>
                        </button>
                    </header>
                </div>
            </section>
        </main>
    )
}

export default Project