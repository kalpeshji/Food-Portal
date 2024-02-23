import React, { useState, useEffect } from 'react';
import { Col, Container, Offcanvas, Row } from 'react-bootstrap';
import Header from '../Component/Header';
import Footer from './Footer';
import { db } from './firebase';
import { collection, doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import '../Asset/css/style.css';
import { useNavigate } from 'react-router-dom';
import img1 from '../Asset/image/f1.png';
import img2 from '../Asset/image/f2.png';
import img3 from '../Asset/image/shop-03-img-01-768x744.png';
import img4 from '../Asset/image/f4.png';
import img5 from '../Asset/image/f5.png';
import img6 from '../Asset/image/f6.png';
import img7 from '../Asset/image/f7.png';
import img8 from '../Asset/image/f8.png';
import img9 from '../Asset/image/f9.png';
import img10 from '../Asset/image/f10.png';
import img11 from '../Asset/image/f11.png';
import img12 from '../Asset/image/f12.png';
export default function Book() {
  const [cart, setCart] = useState([]);
  const loginFlag = JSON.parse(localStorage.getItem('loginFlag')) || false;
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [searchText, setSearchText] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedAdd, setselectedAdd] = useState([])


  const food = [
    { id: 1, image: img1, name: 'Double Burger', dsc: 'Voluptatem ea rerum nisi. Ullam debitis optio.', price: 12 },
    { id: 2, image: img2, name: 'Cheese Fries', dsc: 'Voluptatem ea rerum nisi. Ullam debitis optio.', price: 20 },
    { id: 3, image: img3, name: 'Fish Burger', dsc: 'Voluptatem ea rerum nisi. Ullam debitis optio.', price: 24 },
    { id: 4, image: img4, name: 'Taco Max', dsc: 'Voluptatem ea rerum nisi. Ullam debitis optio.', price: 19 },
    { id: 5, image: img5, name: 'Onion Rings', dsc: 'Voluptatem ea rerum nisi. Ullam debitis optio.', price: 40 },
    { id: 6, image: img6, name: 'Burger Menu', dsc: 'Voluptatem ea rerum nisi. Ullam debitis optio.', price: 21 },
    { id: 7, image: img7, name: 'Taco Dip', dsc: 'Voluptatem ea rerum nisi. Ullam debitis optio.', price: 69 },
    { id: 8, image: img8, name: 'Fast Wrap', dsc: 'Voluptatem ea rerum nisi. Ullam debitis optio.', price: 45 },
    { id: 9, image: img9, name: 'Duo Taco', dsc: 'Voluptatem ea rerum nisi. Ullam debitis optio.', price: 55 },
    { id: 10, image: img10, name: 'Burrrito', dsc: 'Voluptatem ea rerum nisi. Ullam debitis optio.', price: 21 },
    { id: 11, image: img11, name: 'Veggie Pizza', dsc: 'Voluptatem ea rerum nisi. Ullam debitis optio.', price: 60 },
    { id: 12, image: img12, name: 'Margherita Pizza', dsc: 'Voluptatem ea rerum nisi. Ullam debitis optio.', price: 58 }
  ];
  const [categories, setCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Math.max(...food.map(item => item.price)) });
  const [filteredFood, setFilteredFood] = useState(food);

  useEffect(() => {
    if (loginFlag && userId) {
      fetchCart();
    }
  }, [loginFlag, userId]);
  useEffect(() => {
    setFilteredFood(food);
  }, []);
  useEffect(() => {
    let result = food.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

    if (priceRange === 'Low to High') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (priceRange === 'High to Low') {
      result = result.sort((a, b) => b.price - a.price);
    }

    setFilteredFood(result);
  }, [searchText, priceRange]);
  useEffect(() => {
    let result = food.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

    if (categories.length > 0) {
      result = result.filter(item => categories.some(category => item.name.includes(category)));
    }
    result = result.filter(item => item.price >= priceFilter.min && item.price <= priceFilter.max);

    if (priceRange === 'Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (priceRange === 'High to Low') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredFood(result);
  }, [searchText, priceRange, categories, priceFilter]);


  const fetchCart = async () => {
    if (!userId) return;
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      setCart(cartSnap.data().items);
    } else {
      console.log('No cart document! Creating one...');
      await setDoc(cartRef, { items: [] });
    }
  };

  const addToCart = async (item) => {
    if (!loginFlag) {
      navigate('/login');
      return;
    }

    let updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex(cartItem => cartItem.name === item.name);

    if (itemIndex >= 0) {
      updatedCart[itemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCart(updatedCart);

    const cartRef = doc(db, 'carts', userId);
    await updateDoc(cartRef, {
      items: updatedCart
    });
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handleResetFilter = () => {
    setSearchText('');
    setPriceRange('');
    setCategories([]);
    setselectedAdd([])
    setPriceFilter({ min: 0, max: Math.max(...food.map(item => item.price)) });
    handleClose()
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setCategories([...categories, name]);
      setselectedAdd([...selectedAdd, name]);
    } else {
      setCategories(categories.filter(category => category !== name));
      setselectedAdd(selectedAdd.filter(item => item !== name));
    }
  }
  const handleApplyFilter = () => {
    handleClose();
  };
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} backdrop="static" className="p-3 overflow-hidden bg-dark" data-bs-theme="dark">
        <Offcanvas.Header>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h5>Category</h5>
          <ul className='m-0 p-0'>
            <li className='list-unstyled ps-0 pt-2 pb-2 pe-3 ms-0'>
              <input className='me-2' type="checkbox" name="Burger" onChange={handleCheckboxChange} checked={selectedAdd.includes('Burger')}
              />Burger
            </li>
            <li className='list-unstyled ps-0 pt-2 pb-2 pe-3 ms-0'>
              <input className='me-2' type="checkbox" name="Fries" onChange={handleCheckboxChange} checked={selectedAdd.includes('Fries')}
              />Fries
            </li>
            <li className='list-unstyled ps-0 pt-2 pb-2 pe-3 ms-0'>
              <input className='me-2' type="checkbox" name="Taco" onChange={handleCheckboxChange} checked={selectedAdd.includes('Taco')}
              />Taco
            </li>
            <li className='list-unstyled ps-0 pt-2 pb-2 pe-3 ms-0'>
              <input className='me-2' type="checkbox" name="Onion Ring" onChange={handleCheckboxChange} checked={selectedAdd.includes('Onion Ring')}
              />Onion Ring
            </li>
            <li className='list-unstyled ps-0 pt-2 pb-2 pe-3 ms-0'>
              <input className='me-2' type="checkbox" name="Burrrito" onChange={handleCheckboxChange} checked={selectedAdd.includes('Burrrito')}
              />Burrrito
            </li>
            <li className='list-unstyled ps-0 pt-2 pb-2 pe-3 ms-0'>
              <input className='me-2' type="checkbox" name="Pizza" onChange={handleCheckboxChange} checked={selectedAdd.includes('Pizza')}
              />Pizza
            </li>
          </ul>
          <div>
            <h5 className='mt-3'>Price Range</h5>
            <input type="range" min="0" max={Math.max(...food.map(item => item.price))} value={priceFilter.min} onChange={(e) => setPriceFilter({ ...priceFilter, min: Number(e.target.value) })} />
            <span>Min: ${priceFilter.min}</span><br />
            <input type="range" min="0" max={Math.max(...food.map(item => item.price))} value={priceFilter.max} onChange={(e) => setPriceFilter({ ...priceFilter, max: Number(e.target.value) })} />
            <span>Max: ${priceFilter.max}</span>
          </div>
          <div className='d-flex mt-5'>
            <button onClick={handleResetFilter} className='btn w-50'>Reset</button>
            <button onClick={handleApplyFilter} className='btn w-50 ms-2'>Apply</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Header />
      <section className='p-7 bg-secondary-subtle'>
        <Container>
          <h2 className='mb-5'>Foods</h2>
          <div className="sea mb-5 bg-dark p-3 rounded-4 m-0">
            <div className="d-flex justify-content-between align-items-center">
              <button className='btn w-25' variant="primary" onClick={handleShow}><i class="bi bi-funnel me-1"></i>Filter</button>
              <input onChange={handleChange} className='form-control mx-3' type="text" placeholder='Search..' />
              <select onChange={handlePriceRangeChange} className='btn w-25'>
                <option value="">Select Price Range</option>
                <option value="High to Low">High to Low</option>
                <option value="Low to High">Low to High</option>
              </select>
            </div>
          </div>
          <div className='grid'>
            {
              filteredFood.length > 0 ? (
                filteredFood.map((item, index) => (
                  <Col lg={3} md={6} key={index} className="bg-dark rounded-4 p-3 hov w-100">
                    <div className="d-flex justify-content-center">
                      <img src={item.image} alt={item.name} className='img-fluid w-100 p-5' />
                    </div>
                    <div className="des d-flex flex-wrap mt-3 justify-content-between text-white">
                      <h6 className='mb-3 text-center fs-5'>{item.name}</h6>
                      <p>{item.dsc}</p>
                      <p>Price: ${item.price}</p>
                      <button className='btn btn-light w-100 border-0' onClick={() => addToCart(item)}>
                        {loginFlag ? 'Add to Cart' : 'Login to Order'}
                        <i className="fa-solid fa-cart-shopping ms-2"></i>
                      </button>
                    </div>
                  </Col>
                ))
              ) : (
                <h3 className='text-center my-5 '>No match found</h3>
              )}
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
  );
}
