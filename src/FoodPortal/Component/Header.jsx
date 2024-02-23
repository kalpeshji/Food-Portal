import React, { useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth } from "../Pages/firebase"
import { onAuthStateChanged, signOut } from 'firebase/auth'
import '../Asset/css/style.css'

function Header() {
  const location = useLocation();
  const isCurrentPath = (path) => {
    return location.pathname === path;
  };
  const navigate = useNavigate();
  const loginFlag = JSON.parse(localStorage.getItem('loginFlag')) || false;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("userId", user.email);
      } else {
        localStorage.setItem("loginFlag", false);
      }
    })
  })

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('log Out')
      }).catch((err) => {
        console.log(err)
      })
    localStorage.setItem('loginFlag', false);
    navigate('/');
  }

  return (
    <Navbar bg="dark" variant="dark" className='position-fixed z-3 top20 rounded-5'>
      <Container>
        <Navbar.Brand><Link className='text-reset text-decoration-none' to={'/'}>Food <span className='te-su'>Rental</span></Link></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link><Link className='text-reset text-decoration-none navhov' to={'/'}>Home</Link></Nav.Link>
          <Nav.Link><Link className='text-reset text-decoration-none  navhov ' to={'/about'}>About</Link></Nav.Link>
          <Nav.Link><Link className='text-reset text-decoration-none  navhov ' to={'/foods'}>Foods</Link></Nav.Link>
          <Nav.Link>{loginFlag ? (<><Link className='text-reset text-decoration-none  navhov ' to={'/cart'}>My Orders</Link></>) : (<></>)}</Nav.Link>
        </Nav>
        {loginFlag ? (
          <>
            <Link className='text-reset text-decoration-none  ' to={'/'} onClick={handleLogout}><button className='btn me-3 btn-sm rounded-pill px-3'>Log Out</button></Link>
          </>
        ) : (
          <>
            <Link className='text-reset text-decoration-none  ' to={'/signup'}><button className='btn me-3 btn-sm rounded-pill px-3'>Sign Up</button></Link>
            <Link className='text-reset text-decoration-none  ' to={'/login'}><button className='btn btn-sm rounded-pill px-3'>Login</button></Link>
          </>
        )
        }
      </Container>
    </Navbar >
  )
}

export default Header