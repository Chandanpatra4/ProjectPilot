import { useContext, useState, useEffect } from 'react';
import React from 'react'
import { UserContext } from '../context/user.context.jsx';
import axios from "../config/axios.jsx"
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [project, setProject] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('/projects/all')
      .then((res) => {
        console.log('Response data:', res.data);
        if (res.data && Array.isArray(res.data.projects)) {
          setProject(res.data.projects); // Ensure this matches the response structure
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function createProject(e) {
    e.preventDefault();
    console.log(projectName);
    axios.post('/projects/create', { name: projectName })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
        setProject([...project, newProject]);

      }).catch((error) => {
        console.log(error);
      })
  }
  console.log("project: ", project)
  return (
    <main
      className='p-4'>
      <div className='projects flex-wrap gap-3 ' >
        <button
          onClick={() => setIsModalOpen(true)}
          className='project flex-wrap gap-3 p-4 border border-slate-300 rounded-md' >New Project
          <i className="ri-link ml-2"></i>
        </button>
        {Array.isArray(project) && project.map((project) => (
          <div key={project._id} 
          onClick={()=>{navigate(`/project`, {
            state: { project }
          })}}
          className=' project flex-col gap-2  cursor-pointer  p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-300 ' >
            <span className='font-semibold' >{project.name}</span>
            <div className='flex gap-2' >
             <p> <i className='ri-user-line' ><small>Collaborators</small></i></p>
              {project.users.length}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl mb-4">Create Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  )
}

export default Home