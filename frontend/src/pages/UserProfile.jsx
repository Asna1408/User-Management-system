

import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateProfile } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { reset } from '../features/auth/authSlice';
// import { profileUpdate } from '../features/auth/authSlice';
import './UserProfile.css'


function UserProfile() {
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        name: user ? user.name : '',
        email: user ? user.email : '',
        image: user ? user.image : "",
    });
    // const [image, setImage] = useState(null); 
    const [imageFile, setImageFile] = useState(null); // Add this line


 

    const { name, email, image } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isLoading) {
            return <Spinner />;
        }
        if (isSuccess) {
            navigate('/profile');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);


    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    
        if (e.target.name === "image" && e.target.files.length > 0) {
          setImageFile(e.target.files[0]);
        }
      };
    // const onSubmit = (e) => {
    //     e.preventDefault();

    //     const validationErrors = validateForm();
    //     if (Object.keys(validationErrors).length > 0) {
    //         for (const key in validationErrors) {
    //             toast.error(validationErrors[key]);
    //         }
    //         return;
    //     }

    //     dispatch(updateProfile(formData));
    // };


    const onSubmit = async (e) => {
        e.preventDefault();
    
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          for (const key in validationErrors) {
            toast.error(validationErrors[key]);
          }
          return;
        }
    
        const data = new FormData();
        data.append("file", imageFile); // Use imageFile here instead of image
        data.append("upload_preset", "elellcsz");
        data.append("cloud_name", "dzkpcjjr8");
    
        try {
          const cloudinaryResponse = await fetch(
            "https://api.cloudinary.com/v1_1/dzkpcjjr8/image/upload",
            {
              method: "POST",
              body: data,
            }
          );
    
          const cloudinaryData = await cloudinaryResponse.json();
          const imageUrl = cloudinaryData.url;
    
          // Update the userData object to include name, email, and image
          const updatedUserData = {
            name: formData.name,
            email: formData.email,
            image: imageUrl,
          };
    
          // Dispatch the updateProfile action with updatedUserData
          console.log(updatedUserData);
          dispatch(updateProfile(updatedUserData));
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error);
          toast.error("Error uploading image");
        }
      };


      
    const validateForm = () => {
        let errors = {};

        if (!name.trim()) {
            errors.name = 'Name is required';
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        return errors;
    };

    return (
        <>
            <section className="heading">
                <h1>Profile</h1>
            </section>
            <div className="profile-container">
                <div className="profile-image-container">
                <img
                    src={
                    user?.profileURL
                        ? user.profileURL
                        : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
                    }
                    alt="profile"
                    className="profile-image"
                />
                </div>
            </div>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            onChange={onChange}
                            
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Update</button>
                    </div>
                </form>
            </section>

        </>
    );
}

export default UserProfile;
