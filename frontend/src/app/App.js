import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Profile from "../pages/profile/profile";
import Error from  "../pages/error/error"
import { Provider } from "react-redux";
import store from "../redux/store";
import "./App.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<Error />} />
          </Routes>
          <Footer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
library.add(fas)