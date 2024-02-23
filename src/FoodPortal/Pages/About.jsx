import React from 'react'
import '../Asset/css/style.css'
import { Container, Row, Col } from 'react-bootstrap';
import img1 from '../Asset/image/inner_instagram_03.jpg'
import { Link } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from './Footer';
export default function About() {
  return (
    <>
      <Header />
      <section className='vh-100 position-relative bg-secondary-subtle d-flex align-items-center p-7'>
        <Container>
          <Row>
            <Col lg={6}>
              <div className="d-flex justify-content-center p-5">
                <img src={img1} className='img-fluid set' alt="" />
              </div>
            </Col>
            <Col lg={6} className='py-5'>
              <h4>About Company</h4>
              <h1 className='display-4 fw-bolder mb-4'>Awesome <span className='te-su'>service</span> and even better foods!</h1>
              <p className='text-muted'>Certain but she but shyness why cottage. Guy the put instrument sir entreaties affronting. Pretended exquisite see cordially the you. Weeks quiet do vexed or whose. Motionless if no to affronting imprudence no precaution. My indulged as disposal strongly attended. Certain but she but shyness why cottage. Guy the put instrument sir entreaties affronting. Pretended exquisite see cordially the you. Weeks quiet do vexed or whose. Motionless if no to affronting imprudence no precaution. My indulged as disposal strongly attended.Certain but she but shyness why cottage. Guy the put instrument sir entreaties affronting. Pretended exquisite see cordially the you. Weeks quiet do vexed or whose. Motionless if no to affronting imprudence no precaution. My indulged as disposal strongly attended. Certain but she but shyness why cottage. Guy the put instrument sir entreaties affronting. Pretended exquisite see cordially the you. Weeks quiet do vexed or whose. Motionless if no to affronting imprudence no precaution. My indulged as disposal strongly attended.</p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='bga mb-5'>
        <div className="p-7 bgd">
          <Container>
            <Row>
              <Col lg={6}>
                <h2 className='display-4 fw-bolder text-light'>Save <span className='te-su'>big</span> with our cheap Food rental!</h2>
              </Col>
              <Col lg={6} className='d-flex justify-content-center align-items-center'>
                <Link className="text-reset text-decoration-none " to={'/foods'}><button className='btn text-center btn-lg'>Order Now</button></Link>
              </Col>
            </Row>
          </Container>
        </div>
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
