import { setUser, setToken } from "./userSlice";

const API = "http://localhost:3001/api/v1";


const handleErrors = (error) => {
    if (error.response) {
        const status = error.response.status;
        let errorMessage = '';

        switch (status) {
            case 400:
                errorMessage = "Your request contains invalid data. Please check and try again.";
                break;
            case 401:
                errorMessage = "You are not authorized to access this page. Please sign in.";
                break;
            case 500:
                errorMessage = "Something went wrong on our server. Please try again later.";
                break;
            default:
                errorMessage = "An unexpected error occurred. Please try again later.";
                break;
        }

        alert(errorMessage);
    } else {
        console.error("An unexpected error occurred:", error);
    }
};

export const userLogin = (email, password, navigate) => async (dispatch) => {
    try {
        const response = await fetch(`${API}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Failed to log in');
        }

        const { body } = await response.json();

        dispatch(setUser({ email, password }));
        dispatch(setToken({ body: { token: body.token } }));
        navigate("/profile");

        return body.token;
    } catch (error) {
        handleErrors(error);
    }
};

export const userProfile = (token) => async (dispatch) => {
    try {
        const response = await fetch(`${API}/user/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ token })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();

        const { firstName, lastName, email, userName } = data.body;

        dispatch(setUser({ firstName, lastName, email, userName }));
    } catch (error) {
        handleErrors(error);
    }
};

export const changeUserName = (token, newUserName) => async (dispatch) => {
    try {
        const response = await fetch(`${API}/user/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userName: newUserName })
        });

        if (!response.ok) {
            throw new Error('Failed to change username');
        }

        const data = await response.json();

        const { firstName, lastName, email } = data.body;

        dispatch(setUser({ firstName, lastName, email, userName: newUserName }));
    } catch (error) {
        handleErrors(error);
    }
};

