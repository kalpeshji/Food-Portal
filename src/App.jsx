import React, { useState } from 'react'
// import Header from './FoodPortal/Component/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './FoodPortal/Pages/Home';
import About from './FoodPortal/Pages/About';
import Login from './FoodPortal/Pages/Login';
import SignUp from './FoodPortal/Pages/SignUp';
import ProtectedRoute from './FoodPortal/Component/ProtectedRoute';
import UserProtect from './FoodPortal/Component/UserProtect';
import Error from './FoodPortal/Pages/Error';
import Book from './FoodPortal/Pages/Book';
// import Footer from './FoodPortal/Pages/Footer';
import Cart from './FoodPortal/Pages/Cart';  

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return JSON.parse(localStorage.getItem("loginFlag")) || false;
    });
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/error' element={<Error />}></Route>
                <Route path='/*' element={<Error />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/foods' element={<Book />}></Route>
                <Route path='/cart' element={<ProtectedRoute Component={Cart} />} ></Route>
                <Route path='/login' element={<UserProtect Component={Login} />} ></Route>
                <Route path='/signup' element={<UserProtect Component={SignUp} />} ></Route>
            </Routes>
        </Router>
    )
}

export default App;
