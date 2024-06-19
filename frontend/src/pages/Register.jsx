import { useState, useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa"
import {register,reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner"
import './pageStyle.css';

function Register() {
    const [formData, setFormdata] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const [errors,setErrors] = useState({});

    const {name,email,password,password2} = formData
    

    const navigate= useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())
    },[user, isError, isSuccess , message, navigate,dispatch])

    const onChange = (e) => {
        setFormdata((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    //validation
    const validateForm = () => {
        let errors ={};

        if(!name.trim()){
            errors.name = 'Name is required!'
        }

        if(!email.trim()){
            errors.email = 'Email is required!'
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (!password2.trim()) {
            errors.password2 = 'Confirm Password is required';
        } else if (password !== password2) {
            errors.password2 = 'Passwords do not match';
        }

        return errors;

    }

    const onSubmit = (e) => {
        e.preventDefault()

        const validationErrors = validateForm();

        if(Object.keys(validationErrors).length>0){
            setErrors(validationErrors);
            return ;
        }

        if(password !== password2){
            toast.error('Passwords do not match')
        }else{
            const userData = {
                name,
                email,
                password,

            }

            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner/>
    }
  return (
    <>

        <section className="heading">
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please craete an account</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <input type="text" 
                 className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name" 
                name="name" 
                value={name} 
                placeholder="Enter your name"
                onChange={onChange}/>
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="form-group">
                <input type="text" 
                className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                id="email" 
                name="email" 
                value={email} 
                placeholder="Enter your email"
                onChange={onChange}/>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group">
                <input type="text" 
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password" 
                name="password" 
                value={password} 
                placeholder="Enter password"
                onChange={onChange}/>
                 {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="form-group">
                <input type="text" 
                className={`form-control ${errors.password2 ? 'is-invalid' : ''}`} 
                id="password2" 
                name="password2" 
                value={password2} 
                placeholder="Confirm Password"
                onChange={onChange}/>
                 {errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
      
    </>
  )
}

export default Register
