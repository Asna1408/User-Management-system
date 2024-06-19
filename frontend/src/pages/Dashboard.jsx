import { startTransition, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {user} = useSelector((state)=> state.auth)
  

  useEffect(()=>{
    

    if(!user){
      navigate('/login')
    }

    
  },[user,navigate])

  

  return (
    <>
     <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      
     </section>

     
    </>
  )
}

export default Dashboard
