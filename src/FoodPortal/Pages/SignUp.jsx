import React, { useState } from 'react';
import { auth } from './firebase';
import '../Asset/css/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Header from '../Component/Header';
import Footer from './Footer';

export default function SignUp() {
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

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) {
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Success SignUp');
        navigate('/login')
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  return (
    <>
      <Header />
      <div className="v-100 d-flex align-items-center justify-content-center">
        <div>
          <div className="signup-container border border-2 rounded-3 bg-dark">
            <form>
              <h3 className='text-center fs-5 mb-4 text-light'>Sign Up</h3>
              {error && <p className="error-message text-danger text-center mb-4 fw-semibold">{error}</p>}
              <input type="email" className='form-control mb-3' onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" value={email}
              />
              <input type="password" className='form-control mb-3' onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' value={password}
              />
              <p className='text-center fs-6 my-4 text-light'>
                Already have an account?
                <Link to={'/login'} className=" text-success text-decoration-none"> Log in</Link>
              </p>
              <button onClick={handleSignUp} className='btn w-100'>SIGN UP</button>
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
