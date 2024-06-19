import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { UseSelector, useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner"
import './pageStyle.css';

function Login() {
    const [formData, setFormdata] = useState({
        email: '',
        password: '',

    })

    const [errors,setErrors] = useState({})

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormdata((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        let validationErrors = {};

        //email validation
        if(!email || !/^\S+@\S+\.\S+$/.test(email)){
            validationErrors.email = 'Please enter a valid email address';
        }

        //password validation
        if (!password || password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters long';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>

            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login User</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>

                    <div className="form-group">
                        <input type="email" className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange} />
                            {errors.email&& <div className="error-message">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={onChange} />
                            {errors.password&&<div className="error-message">{errors.password}</div>}
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>

        </>
    )
}

export default Login
