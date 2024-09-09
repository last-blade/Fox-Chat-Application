import { createSlice } from "@reduxjs/toolkit";
const initialAuthUser = JSON.parse(localStorage.getItem('authUser'));

const userSlice = createSlice({
    name: "user",
    initialState:{
        authUser: initialAuthUser || null,
        OtherUsers: [],
        selectedUser: null,
        onlineUsers: null,
    },

    reducers:{
        SetAuthUser:(state, action) => {
            state.authUser = action.payload;
        },

        setOtherUsers:(state, action) => {
            state.OtherUsers = action.payload;
        },

        setSelectedUser:(state, action) => {
            state.selectedUser = action.payload;
        },

        setOnlineUsers:(state, action) => {
            state.onlineUsers = action.payload;
        }
    }
}); 

export const {SetAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers} = userSlice.actions;

export default userSlice.reducer;