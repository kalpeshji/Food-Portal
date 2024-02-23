import React from 'react'
import '../Asset/css/style.css'
import { Container, Row } from 'react-bootstrap'

export default function Footer() {
    return (
        <footer className="p-6 bg-dark">
            <Container>
                <Row>
                    <div className="col-3 px-3">
                        <h4 className='mb-4 text-light'>FOOD <span className='te-su'>Rental</span></h4>
                        <p className='fs-6 mb-4 text-light'>Use securing confined his shutters. Delightful as he it acceptance an solicitude discretion.</p>
                        <p className='text-light'><i class="bi bi-telephone-fill me-3 text-light"></i>(123) 596-3210</p>
                        <p className='text-light'><i class="bi bi-envelope-at-fill me-3 text-light"></i>guptakalpeshji@gmail.com</p>
                    </div>
                    <div className="col-3 ps-3">
                        <h4 className='mb-4 fw-bolder text-light '>COMPANY</h4>
                        <p className='fw-semibold mb-2 text-light'>Careers</p>
                        <p className='fw-semibold mb-2 text-light'>Mobile</p>
                        <p className='fw-semibold mb-2 text-light'>Blog</p>
                        <p className='fw-semibold mb-2 text-light'>How we work</p>
                    </div>
                    <div className="col-3">
                        <h4 className='mb-4 fw-bolder text-light '>OPENING HOURS</h4>
                        <p className='fw-semibold mb-2 text-light'><span className='text-light fw-light'>Mon-Fri : </span>07:00AM - 11:00PM</p>
                        <p className='fw-semibold mb-2 text-light'><span className='text-light fw-light'>Sat : </span>07:00AM - 07:00PM</p>
                        <p className='fw-semibold mb-2 text-light'><span className='text-light fw-light'>Sun : </span>07:00AM - 11:30PM</p>
                    </div>
                    <div className="col-3 pe-3">
                        <h4 className='mb-4 fw-bolder text-light'>SUBSCRIPTION</h4>
                        <p className='text-light'>Subscribe your Email address for latest news & updates.</p>
                    </div>
                </Row>
            </Container>
        </footer>
    )
}
