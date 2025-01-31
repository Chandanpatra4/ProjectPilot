import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../config/axios'

const Project = () => {

    const location = useLocation();
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState([]);
const [project, setPoject] = useState(location.state.project)


    const [users, setUsers] = useState([])

    const handleUserClick = (id) => {
        setSelectedUserId(prevSelectedUserId => {
            const newSelectedUserId = new Set(prevSelectedUserId);
            if (newSelectedUserId.has(id)) {
                newSelectedUserId.delete(id);
            } else {
                newSelectedUserId.add(id);
            }

            return newSelectedUserId;
        });


    }

    function addCollaborators() {
        axios.put('/projects/add-user', {
            projectId: location.state.project._id,
            users: Array.from(selectedUserId)
        }).then(res => {

            console.log(res)
            setIsModalOpen(false)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {
    setPoject(res.data.project)
})


        axios.get('/users/all').then(res => {
            setUsers(res.data.users)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (

        <main
            className='h-screen w-screen flex'>
            <section className='left relative flex flex-col h-screen min-w-96 bg-slate-300 ' >
                <header
                    className='flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute z-10 top-0'>
                    <button className='flex gap-2' onClick={() => setIsModalOpen(true)}>
                        <i className="ri-add-fill mr-1"></i>
                        <p>Add collaborator</p>
                    </button>
                    <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                        <i className="ri-group-fill"></i>
                    </button>
                </header>

                <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col relative ">
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
                        <input className='p-2 px-4 border-none outline-none flex-grow' type="text " placeholder='Enter message' />
                        <button className='px-5 bg-slate-950 text-white' >
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </div>

                <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
                    <header className='flex justify-end  px-4 p-2 bg-slate-200'>



                        <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                            <i className="ri-close-fill"></i>
                        </button>
                    </header>

                    <div className='users flex flex-col gap-2'>
                        <div key={users.id} className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center ">
                            <div className='aspect-square rounded-full w-16 h-16 flex items-center justify-center text-white bg-slate-700'>
                                <i className="ri-user-fill text-2xl"></i>
                            </div>

                            <h1 className='font-semibold text-lg'
                            >Username</h1>

                        </div>

                    </div>
                </div>

            </section>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2'>
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>


                        <div className='users flex flex-col gap-2 mb-16 max-h-96 overflow-auto'>
                            {users.map(user => (
                                <div key={user.id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? ' bg-slate-200' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
                                    <div className='aspect-square rounded-full w-16 h-16 flex items-center justify-center text-white bg-slate-700'>
                                        <i className="ri-user-fill text-2xl"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button
                        onClick={addCollaborators}
                            className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Project