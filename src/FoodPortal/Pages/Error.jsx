import React from 'react'
import Header from '../Component/Header'
import '../Asset/css/style.css'
import img1 from '../Asset/image/err.gif'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <>
            <Link className='te-su text-decoration-none ms-3' to="/"><i class="bi bi-arrow-left te-su"></i>  back</Link>
            <div className="d-flex vh-100 justify-content-center  align-items-center">
                <img src={img1} className='img-fluid err' alt="" />
            </div>
        </>
    )
}