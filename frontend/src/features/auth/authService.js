import axios from 'axios';
const API_URL = 'http://localhost:5000/api/user/'



//Register user
const register = async (userData) => {
    console.log(userData);
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login user
const login = async (userData) => {
    console.log(userData);
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}




//Logout user
const logout = () => {
    localStorage.removeItem('user')
}

//profile upload
// const profileUpload = async(token,imgUrl)=>{
//     const config = {
//         headers:{
//             Authorization: `Bearer ${token}`
//         }
//     }
//     const currentUser = JSON.parse(localStorage.getItem('user'))
//     console.log("call 3", token, imgUrl, currentUser);
//     const response = await axios.post(API_URL+ 'upload', {imgUrl,currentUser}, config)

//     const localuser = localStorage.getItem('user')

//     if(localuser){
//         const user = JSON.parse(localuser)
//         user.profileUrl = response.data.profileURL;
//         localStorage.setItem('user',JSON.stringify(user))
//     }
//     return response.data
// }

//Update user
// const updateProfile = async(userData,token)=>{
//     console.log('inside auth service')
//     const config = {
//         headers:{
//             Authorization: `Bearer ${token}`
//         }
//     }
//     // console.log("002",userId,userData,token);
//     const response = await axios.put(API_URL + 'me/',userData, config)

//     if(response.data){
//         const updatedData = {...response.data,token}
//         console.log(updatedData)
//         localStorage.setItem('user', JSON.stringify(updatedData))
//     }
//     console.log(response)
//     return response.data
// }
const updateProfile = async(userData,token)=>{
    console.log('inside auth service', userData)
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    // console.log("002",userId,userData,token);
    const response = await axios.put(API_URL + 'me/',userData, config)

    if(response.data){
        const updatedData = {...response.data,token}
        console.log(updatedData)
        localStorage.setItem('user', JSON.stringify(updatedData))
    }
    console.log(response)
    return response.data
}
const authService = {
    register,
    logout,
    login,
    updateProfile,
    // profileUpload
}

export default authService