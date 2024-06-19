import { useEffect, useState } from "react";
import { loginAdmin } from "../../features/adminAuth/adminAuthSlice";
import { FaSignInAlt, FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Spinner from "../../components/Spinner"

function AdminLogin() {
    const [adminformData, setAdminformdata] = useState({

        email: '',
        password: '',

    })

    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { email, password, } = adminformData

    const { admin, isLoading, isError, isSuccess, message } = useSelector((state) => state.adminAuth)


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || admin) {
            navigate('/admin/dashboard')
        }
        if(isLoading){
            <Spinner />
        }
    },[admin, isError, isSuccess, message , navigate, dispatch])

    const onChange = (e) => {
        setAdminformdata((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let validationErrors = {};

        //email validation
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
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


        const adminData = {
            email,
            password
        }

        dispatch(loginAdmin(adminData))
    }
    return (
        <>

            <section className="heading">
                <h1>
                    <FaUser /> Admin Login
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange} />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <input type="text"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={onChange} />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>

        </>
    )
}

export default AdminLogin
