import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from './Footer';

export default function Cart() {
  const [cart, setCartItems] = useState([]);
  const userId = localStorage.getItem('userId');
  const [noRecords, setNoRecords] = useState(false)

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  useEffect(() => {
    setNoRecords(cart.length === 0);
  }, [cart]);

  const fetchCartItems = async () => {
    if (!userId) return;
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      setCartItems(cartSnap.data().items);
    } else {
      console.log("No cart found for this user.");
    }
  };

  const handleDeleteAll = async () => {
    if (!userId) return;
    const cartRef = doc(db, 'carts', userId);
    await updateDoc(cartRef, {
      items: [],
    });
    setCartItems([]);
  };

  const handleIncrement = async (itemId) => {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        quantity: updatedCart[itemIndex].quantity + 1,
      };
      await updateCartItems(updatedCart);
    }
  };

  const updateCartItems = async (updatedCart) => {
    if (!userId) return;
    const cartRef = doc(db, 'carts', userId);
    await updateDoc(cartRef, {
      items: updatedCart,
    });
    setCartItems(updatedCart);
  };


  const handleDecrement = async (itemId) => {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1 && cart[itemIndex].quantity > 1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        quantity: updatedCart[itemIndex].quantity - 1,
      };
      await updateCartItems(updatedCart);
    }
  };

  const handleDelete = async (itemId) => {
    console.log("Attempting to delete item with ID:", itemId);

    const updatedCartItems = cart.filter(item => item.id !== itemId);

    if (!userId) {
      console.log("User ID not found. Cannot delete item.");
      return;
    }

    const cartRef = doc(db, 'carts', userId);

    try {
      await updateDoc(cartRef, {
        items: updatedCartItems,
      });

      setCartItems(updatedCartItems);
      console.log(`Item with ID ${itemId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };


  const calculateTotal = () => {
    return cart.reduce((acc, curr) => acc + (parseFloat(curr.price) * curr.quantity), 0);
  };

  const Discount = 0.10;
  const total = calculateTotal();

  return (
    <>
      <Header />
      <div className='container px-3 mt-6 bg-dark mb-5 rounded-4'>
        <div className="row">
          <div className="col-9">
            <div className="p-0 ">
              <div className="d-flex flex-wrap justify-content-between p-3 align-content-center">
                <div className="cart-heading p-2">
                  <h5 className="m-0 text-light fs-5">My Cart</h5>
                </div>
                <div>
                  <Link className='btn px-3 py-6 fs-6' onClick={handleDeleteAll} >Delete All<i class="bi bi-trash3 ms-2"></i></Link>
                </div>
              </div>
              <div className="cart-body p-3 " style={{ height: "60vh", overflowY: "scroll" }}>
                <table class="table table-bordered table-dark table-hover table-striped rounded">
                  <thead>
                    <tr className='text-light'>
                      <th className='text-center' scope="col">S.R. No.</th>
                      <th className='text-center' scope="col">PRODUCT</th>
                      <th className='text-center' scope="col">QUANTITY</th>
                      <th className='text-center' scope="col">PRICE</th>
                      <th className='text-center' scope="col">SUB TOTAL</th>
                      <th className='text-center' scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noRecords ? (
                      <>
                        <td className='text-center fw-bold text-light pe-0 py-5' colSpan={6}>Your Cart is Empty</td>
                      </>
                    ) : (
                      cart && cart.map((item, id) => {
                        return (
                          <tr key={id}>
                            <td className='text-center pt-4'>{id+1}</td>
                            <td >
                              <div className="bg-lightr d-inline-block">
                                <img src={item.image} alt="" className='img-fluid p-2 pt-0' style={{ height: '70px', width: "70px", borderRadius: "3px" }} />
                              </div>
                              <span className='ms-3'>{item.name}</span></td>
                            <td className='text-center pt-4'>
                              <button className='btn rounded-3 ' style={{ border: "1px solid #bfc8de" }} onClick={() => handleDecrement(item.id)}>-</button>
                              <span className='text-theme rounded-0 text-light border-0  px-2 py-1' style={{ border: "1px solid #bfc8de" }}>{item.quantity}</span>

                              <button className='btn rounded-3 ' style={{ border: "1px solid #bfc8de" }} onClick={() => handleIncrement(item.id)}>+</button>
                            </td>
                            <td className='text-center pt-4'>${item.price}</td>
                            <td className='text-center pt-4'>${item.price * item.quantity}</td>
                            <td className='text-center pt-4'><button className='btn' onClick={() => handleDelete(item.id)}><i class="bi bi-trash3"></i></button></td>
                          </tr>
                        )
                      })
                    )
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-3 border-start border-success-subtle">
            <div className="dark-card text-center p-0">
              <div className="cart-heading p-2 text-light">
                <h5 className="text-start ps-1 mt-3 mb-3">Price Details</h5>
              </div>
              <div className="p-3">
                <table class="table table-bordered table-dark table-hover table-striped rounded">
                  <tbody>
                    <tr className='fs-6'>
                      <td>Sub Total</td>
                      <td>{total}</td>
                    </tr>
                    <tr className='fs-6'>
                      <td>Discount</td>
                      <td>10 %</td>
                    </tr>
                    <tr className='fs-6'>
                      <td>Shipping</td>
                      <td>Free</td>
                    </tr>
                    <tr className='fw-bold fs-5'>
                      <td >Total</td>
                      <td>$ {total - (Discount * total)}</td>
                    </tr>
                  </tbody>
                </table>
                <button className='btn w-100 mt-2'>Order Now</button>
              </div>
            </div>
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
  )
}
