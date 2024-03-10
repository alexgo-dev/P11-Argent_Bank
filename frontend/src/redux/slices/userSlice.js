import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
    },
    token: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                userName: action.payload.userName,
                email: action.payload.email,
                password: action.payload.password,
            };
        },
        setToken(state, action) {
            state.token = action.payload.body.token;
        },
        logout() {
            return initialState;
        },
    },
});

export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;