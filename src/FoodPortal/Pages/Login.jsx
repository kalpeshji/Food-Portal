import React, { useState } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import '../Asset/css/style.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from './Footer';

export default function Login() {
  const provider = new GoogleAuthProvider()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const validate = () => {
    if (!email) {
      setError("Email is required.");
      return false;
    }
    else if (!password) {
      setError("Password is required.");
      return false;
    }
    else if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) {
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("loginFlag", "true");
        navigate('/foods');
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };


  const handleLoginWithGoogle = (e) => {
    e.preventDefault()
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Login Email : ' + result.user.email)
        localStorage.setItem("loginFlag", "true");
        setTimeout(() => {
          navigate('/foods');
        }, 500);
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Header />
      <div className="v-100 d-flex align-items-center justify-content-center">
        <div>
          <div className="signup-container border border-2 rounded-3 bg-dark">
            <form>
              <h3 className='text-center fs-5 mb-4 text-light'>Log In</h3>
              {error && <p className="error-message text-danger text-center fs-6 fw-semibold mb-4">{error}</p>}
              <input type="email" className='form-control mb-3' onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" value={email}
              />
              <input type="password" className='form-control mb-3' onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' value={password}
              />
              <p className='text-center fs-6 my-4 text-light'>
                Don't have an account?
                <Link to={'/signup'} className=" text-success text-decoration-none"> Sign up</Link>
              </p>
              <button onClick={handleLogin} className='btn w-100'>Log In</button>
              <p className='text-center my-4 text-light'>OR</p>
              <button className='btn w-100' onClick={handleLoginWithGoogle}><i class="bi bi-google fs-6 me-3"></i> Log In With Google</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <div className="bg-dark">
        <div className="container">
          <div className="d-flex justify-content-between border-top border-success-subtle py-3">
            <p className='text-light'><span className='te-su'>©2024</span> Food Rental. All Rights Reserved</p>
            <p className='text-light'>Created By <span className='te-su'>Kalpesh</span></p>
          </div>
        </div>
      </div>
    </>
  );
}


