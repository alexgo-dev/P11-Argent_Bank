import { configureStore } from '@reduxjs/toolkit';
import userReducer, { saveState, loadState } from './slices/userSlice';

const preloadedState = {
    user: loadState(),
};

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    if (store.getState().user.rememberMe) {
        saveState(store.getState().user);
    } else {
        localStorage.removeItem('state');
    }
});

export default store;