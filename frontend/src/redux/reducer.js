import {createSlice } from '@reduxjs/toolkit';


const initialState = {
    userActive: {},
    loggedIn: false
};

export const userSlice = createSlice({
    name: 'userData',
    initialState: initialState,
    reducers: {
        setUserActive: (state, action) => {
            state.userActive = action.payload;
        },
        logout(state) {
            state.userActive = '';
            state.loggedIn = false;
        },
    }
});

export const { setUserActive, logout } = userSlice.actions;