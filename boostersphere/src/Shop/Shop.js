import "./shop.css";
import { Link } from "react-router-dom";
import { Logout } from "../Logout/Logout";
import { Sidebar } from "../Sidebar/Sidebar"
import mopey from '../DaMopester.jpg'
import { userContext } from "../App";
import { useContext, useState, useEffect } from "react";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { addToCart, removeFromCart } from './CartSlice'
import { useSelector, useDispatch } from "react-redux";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const addItemToCart = (item) => {
    dispatch(addToCart(item))
  }
  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item))
  }
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

      <div className="header">
        <img
          style={{ width: 50, height: 50 }}
          className="logo"
          src={mopey} alt='add image later'
        />
        <MenuIcon style={{ color: "white" }} />
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

{/*Body */}
      <div className="shopBody">
        <div className="bodyItem">
          {products.map((item, index) => (
            <div key={index} className="productItem">
              <img
                style={{
                  height: 200,
                  width: 200,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={item.image}
              />
              <p className="itemTitle">
                {item.title}
              </p>
              <p>{item.price}</p>

              {cart.some((x) => x.id === item.id) ? (
                <Button onClick={()=> removeItemFromCart(item)} style={{backgroundColor:'lightpink'}}>Remove From Cart</Button>
              ) : (
                <Button onClick={()=> addItemToCart(item)} style={{backgroundColor:'cyan'}}>Add to Cart</Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="headerBottom">
        <MenuIcon style={{ color: "white" }} />
      </div>
    </>
  );
};
