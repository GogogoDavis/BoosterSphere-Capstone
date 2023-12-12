import React from 'react'
import "./shop.css";
import { Link } from "react-router-dom";
import { Logout } from "../Logout/Logout";
import { Sidebar } from "../Sidebar/Sidebar"
import mopey from '../DaMopester.jpg'
import { userContext } from "../App";
import { useContext, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { addToCart, removeFromCart, incrementQuantity, decrementQuantity } from './CartSlice'
import { useSelector, useDispatch } from "react-redux";

export const Cart = () => {
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const addItemToCart = (item) => {
    dispatch(addToCart(item))
  }
  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item))
  }
  const incrementItemQuantity = (item) => {
    dispatch(incrementQuantity(item))
  }
  const decrementItemQuantity = (item) => {
    dispatch(decrementQuantity(item))
  }
  const total = cart.map((item) => item.price * item.quantity).reduce((curr, prev) => curr +prev,0)

  const tax = (total * 0.029).toFixed(2)
  const orderTotal = total + parseFloat(tax)

  console.log(cart);

  useEffect(() => {
    const fetchProducts = async () => {
      await fetch(`https://fakestoreapi.com/products/category/men's%20clothing`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    };
    fetchProducts();
  }, []);


  return (
  <>
    <div className='parent-container'>
      <Sidebar />
      <div className='main'>

      <div className="header">
        <img
          style={{ width: 50, height: 50 }}
          className="logo"
          src={mopey} alt='add image later'
        />
        <div>Delta Swag Shop</div>
        <div className="headerInputContainer">
          <input
            className="headerInput"
            type="text"
            placeholder="search Items or Products"
          />
          <SearchIcon style={{ color: "white" }} />
        </div>
        <div>
          <h4 className="headerText">Donate</h4>
        </div>
        <div>
          <h4 className="headerText">Custom Orders</h4>
        </div>
        <div style={{ position: "relative " }} >
        <Link to='/Cart' className='NavBar'>
          <Tooltip title='Cart'>
            <ShoppingCartIcon
              style={{
                color: "white",
                marginLeft: 4,
                marginTop: 2,
                marginRight: 15,
              }}
            />
          </Tooltip>
          </Link>
          <span
            style={{
              position: "absolute",
              left: 30,
              right: 14,
              backgroundColor: "white",
              width: 14,
              height: 14,
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 400,
              textAlign: "center",
              backgroundColor: "yellow"
            }}
          >
            {cart.length}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="cart">
        <div className="cartLeft">
          {cart.map((item, index) => (
            <div key={index} className="cartContainer">

              <div className='cartImage'>
              <img style={{height: 100, width: 100}} src={item.image}/>
              </div>

              <div className='cartDescription'>
                <p >{item.title}</p>
                <p style={{fontSize:'12px'}}>{item.description.length >80 ? item.description.substr(0,80) : item.description}</p>
                <p >${item.price}</p>
              </div>

              <div className='cartButtonContainer'>
                <div className='cartButtons'>
                  <div onClick={() => decrementItemQuantity(item)} style={{cursor:'pointer'}}>-</div>
                  <div>{item.quantity}</div>
                  <div onClick={() => incrementItemQuantity(item)} style={{cursor:'pointer'}}>+</div>
                </div>
                <button onClick={() => removeItemFromCart(item)} className='cartButton'>Remove Item</button>
                <h5 style={{marginTop:'3px'}}>{item.price * item.quantity}</h5>
              </div>
          </div>
          ))}
        </div>
        <div className="cartRight">
          <div className="checkoutContainer">
            <div className="checkout">
              <h5>Subtotal</h5>
              <h5>${total}</h5>
            </div>
            <div className="checkout">
              <h5>Tax</h5>
              <h5>${tax}</h5>
            </div>
            <div style={{borderTop:'solid'}} className="checkout">
              <h5>Order Total</h5>
              <h5>${orderTotal}</h5>
            </div>
          </div>
        </div>
      </div>

      <div>
      <Link to='/Shop' className='NavBar'>
      <Button style={{ marginLeft: '30px',backgroundColor:'rgb(188, 222, 252)'}}>Back to Shop!</Button>
      </Link>
      </div>

      </div>
      </div>
  </>
  )
}
