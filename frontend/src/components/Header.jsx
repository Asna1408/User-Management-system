import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import { Link , useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout,reset } from '../features/auth/authSlice'
function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation();
  const {user} = useSelector((state)=>state.auth)

  const onLogout = ()=>{
    dispatch(logout())
    dispatch(reset())
    
    navigate('/')
  }

  
  return (
    <div>
      <header className='header'>
        <div className="logo">
            <Link to='/'>User Management System</Link>
        </div>
        <ul>
          {user ? (
            <>
             <li>
             <button className="btn" onClick={onLogout}>
                 <FaSignOutAlt/> Logout
                 </button>
             
         </li>
         {location.pathname !== '/profile' && (
                <li>
                  <Link to='/profile'>
                    <FaUser /> Profile
                  </Link>
                </li>
              )}
         </>
        
          ) : (
          <>
           <li>
            <Link to='/login'>
                <FaUser/>Login
            </Link>
        </li>
        <li>
            <Link to='/register'>
                <FaUser/> Register
            </Link>
        </li>
          </>)}
            
        </ul>
      </header>
    </div>
  )
}

export default Header
