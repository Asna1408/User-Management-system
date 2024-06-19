import axios from 'axios';
import { useId } from 'react';
const API_URL = 'http://localhost:5000/api/admin/'

//login admin
const loginAdmin = async(adminData)=>{
    const response = await axios.post(API_URL + 'login',adminData);

    if(response.data){
        console.log(response.data,'admindata service');
        localStorage.setItem('admin',JSON.stringify(response.data))
    }
    return response.data
}

//Logout admin
export const logoutAdmin = () => {
    localStorage.removeItem('admin')
}

export const getAllUser = async(token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'getUserData', config)
    console.log("dtata from the auth service",response.data);
    return response.data
}

export const blockUser = async(token , userId) => {
    console.log('blockservice',userId);
    const config = {
        headers: {
            Authorization : `bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + 'userBlock' , {userId},config)
    return response.data
}

export const editUser = async(token, userId, name, email)=>{
    console.log("inside servioce", userId, name, email);
    const config = {
        headers: {
            Authorization : `bearer ${token}`
        }
    }
    return await axios.post(API_URL + 'editUser' , {userId,name,email}, config)
   
}

export const createUser = async (token, userData) => {
    const config = {
      headers: {
        Athorization: `bearer ${token}`
      }
    }
    return await axios.post(API_URL + 'addUser', userData, config);
  
  }

const adminAuthService = {
    loginAdmin,
    logoutAdmin,
    getAllUser,
    blockUser,
    editUser,
    createUser
}

export default adminAuthService