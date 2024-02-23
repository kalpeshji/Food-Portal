import React, { useEffect } from 'react'
import img1 from "../Asset/image/m-b.png"
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../Component/Header'
import Footer from './Footer'
export default function Home() {
  return (
    <>
      <Header />
      <section className='vh-100 position-relative bg-secondary-subtle d-flex align-items-center'>
        <Container>
          <div className="main-banner row">
            <div className="col-5">
              <h3 className='fs-5 fw-bolder'>Book A Order Now</h3>
              <h1 className="fw-bold display-3">Save <span className='te-su'>big</span> with our Food Rental</h1>
              <p className='text-mute'>To contribute to positive change and achieve our sustainability goals with many extraordinary Certain but she but shyness why cottage. Guy the put instrument sir entreaties affronting. Pretended exquisite see cordially the you. Weeks quiet do vexed or whose.</p>
              <Link className='text-reset text-decoration-none' to={'/foods'}><button className='btn'>Order Now</button></Link>
            </div>
            <div className="col-7">
              <div className="d-flex justify-content-end">
                <img src={img1} className='img-fluid set' alt="" />
              </div>
            </div>
          </div>
        </Container>
      </section>
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
  )
}
