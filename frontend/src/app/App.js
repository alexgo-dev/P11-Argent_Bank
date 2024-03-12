import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Profile from "../pages/profile/profile";
import Error from "../pages/error/error"
import store from "../redux/store";
import "./App.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

const PrivateRoute = () => {
  const token = useSelector(state => state.user.token);
  if (token) {
    return <Profile />;
  } else {
    return <Navigate to='/login' />;
  };
};

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/*" element={<Error />} />
          </Routes>
          <Footer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
library.add(fas)