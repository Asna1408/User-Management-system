import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {  AddNewUser } from '../../features/adminAuth/adminAuthSlice'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify' 

function AddUser() {
    const [formData, setFormData] = useState({
        name:'' ,
        email:'' ,
        password:'' ,
        password2:'' ,
    
      })
    
      const { name , email , password , password2} = formData
      
      const dispatch = useDispatch()
      const navigate = useNavigate()
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value,
        }))
      }
    
      const onSubmit =(e) => {
        e.preventDefault()
    
        
        // Form validation
        if (!name || !email || !password || !password2) {
          toast.error('All fields are required');
          return;
      }
    
      if (!isValidEmail(email)) {
          toast.error('Please enter a valid email address');
          return;
      }
    
      if (password.length < 6) {
          toast.error('Password must be at least 6 characters long');
          return;
      }
    
        if (password !== password2) {
          toast.error('password do not match')
        }else{
          const userData = {
            name,
            email,
            password
          }
          
          dispatch(AddNewUser(userData));
          
          navigate('/admin/dashboard');
          toast.success('New user added sucessfully');
        }
      }
    
      const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    
    
    
      return (
        <>
          <section>
            <h1>
              <FaUser /> Add User
            </h1>
            <p > create an User Account </p>
          </section>
    
          <section className="form">
            <form onSubmit={onSubmit}>
              <div className="form-group">
              <input
                 type="text"
                 className="form-control"
                 id='name'
                 name='name'
                 placeholder='enter your name'
                 value={name}
                 onChange={onChange}
                 
                />
              </div>
    
              <div className="form-group">
              <input
                 type="text"
                 className="form-control"
                 id='email'
                 name='email'
                 placeholder='enter your email'
                 onChange={onChange}
                 value={email}
    
                />
              </div>
    
              <div className="form-group">
              <input
                 type="text"
                 className="form-control"
                 id='password'
                 name='password'
                 placeholder='enter your password'
                 onChange={onChange}
                 value={password}
    
                />
              </div>
    
              <div className="form-group">
              <input
                 type="text"
                 className="form-control"
                 id='password2'
                 name='password2'
                 placeholder='Confirm  password'
                 onChange={onChange}
                 value={password2}
    
                />
              </div>
    
              <div className="from-group">
                <button type="submit" className='btn btn-block'> Submit</button>
              </div>
              
            </form>
          </section>
        </>
      )
}

export default AddUser
