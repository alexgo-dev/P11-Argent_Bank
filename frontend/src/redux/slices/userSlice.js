import { createSlice } from "@reduxjs/toolkit";

export const loadState = () => {
    const storedState = localStorage.getItem('state');
    return storedState ? JSON.parse(storedState) : undefined;
};

export const saveState = (state) => {
    const storedState = JSON.stringify(state);
    localStorage.setItem('state', storedState);
};

const initialState = loadState() || {
    user: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
    },
    token: null,
    rememberMe: false,
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
        setRememberMe(state, action) {
            state.rememberMe = action.payload;
        },
        logout(state) {
            state.user = {
                firstName: "",
                lastName: "",
                userName: "",
                email: "",
                password: "",
            };
            state.token = null;
            state.rememberMe = false;
        },
    },
});

export const { setUser, setToken, setRememberMe, logout } = userSlice.actions;

export default userSlice.reducer;