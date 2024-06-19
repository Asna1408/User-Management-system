import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminAuthService from './adminAuthService'

//get user from localstorage
const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
    admin: admin ? admin : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    users: []
}

//Logout admin
export const logoutAdmin = createAsyncThunk('adminAuth/logout',
    async () => {
        await adminAuthService.logoutAdmin()
    })

export const loginAdmin = createAsyncThunk('adminAuth/login', async (admin, thunkAPI) => {
    try {
        console.log('slice/////', admin);
        return await adminAuthService.loginAdmin(admin)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllUsers = createAsyncThunk('adminAuth/getAllUsers', async (_, thunkAPI) => {
    try {

        const token = thunkAPI.getState().adminAuth.admin.token;
        const response = await adminAuthService.getAllUser(token)

        return response
    } catch (error) {
        const message = (error.response && error.response.data.message) || error.message
            || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

export const blockUser = createAsyncThunk('adminAuth/userBlock', async (userId, thunkAPI) => {
    try {
        console.log('//blockslice');
        const token = thunkAPI.getState().adminAuth.admin.token;
        const response = await adminAuthService.blockUser(token, userId)
        console.log(response, "Sliceeewe");
        return response
    } catch (error) {
        const message = (error.response && error.response.data.message) || error.message
            || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const editUser = createAsyncThunk('adminAuth/editUser', async ({ userId, name, email }, thunkAPI) => {
    try {
        console.log("inside slice",userId, name, email);
        const token = thunkAPI.getState().adminAuth.admin.token;
        const response = await adminAuthService.editUser(token, userId, name, email);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data.message) || error.message
            || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const AddNewUser = createAsyncThunk ('adminAuth/addUser' , async(userData , thunkAPI)=> {
    try {
      
       const token  = thunkAPI.getState().adminAuth.admin.token;
       const response = await adminAuthService.createUser(token , userData);
  
       return response.data
    } catch (error) {
      const message = (error.response && error.response.data.message) || error.message
      || error.toString();
       return thunkAPI.rejectWithValue(message)
    }
  })

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.admin = action.payload
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.admin = action.payload;
            })

            //
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.admin = null
            })
            //
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.users = action.payload
                console.log("addcase ", action.payload);
            })
            .addCase(blockUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(blockUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload.users
            })
            .addCase(blockUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //
            .addCase(editUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload.users
            })
            .addCase(editUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.users
            })
            .addCase(AddNewUser.pending,(state)=> {
                state.isLoading = true
              })

    },
})

export const { reset } = adminAuthSlice.actions
export default adminAuthSlice.reducer