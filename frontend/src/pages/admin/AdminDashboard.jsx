import { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserLists from '../../components/admin/UserLists';




function AdminDashboard() {


  const { admin } = useSelector((state) => state.adminAuth)
  
  const navigate = useNavigate()


  useEffect(() => {
    if (!admin) {
      navigate('/admin/login')
    }
  }, [admin, navigate])


  return (
    <>
     {admin && ( 
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card bg-light shadow">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Welcome,{admin.name} </h1>

                <p className="card-text">Name:{admin.name}</p>
                <div className="text-center">
                  <button className="btn" onClick={()=>navigate('/admin/addUser')}>Add User</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
         )}
      <UserLists/>

    </>
  )
}

export default AdminDashboard
