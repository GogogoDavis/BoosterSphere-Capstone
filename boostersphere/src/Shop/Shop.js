import "./shop.css";
import { Link } from "react-router-dom";
import { Logout } from "../Logout/Logout";
import { userContext } from "../App";
import { useContext } from "react";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const Shop = () => {
  //   const userContextValue = useContext(userContext);
  //   console.log(userContextValue);

  //   const { userdata } = useContext(userContext);
  //   console.log(userdata);

  //   const { thisuser } = useContext(userContext);
  // console.log(thisuser);

  return (
    <>
      <div className="nav">
        <div className="links">
          <Link to="/Home" className="NavBar">
            Home
          </Link>
          <Link to="/Events" className="NavBar">
            Events
          </Link>
        </div>
        <Logout />
      </div>

      <div className="header">
        <img
          style={{ width: 120, height: 40, marginTop: 10 }}
          className="logo"
          src="../DaMopester.jpg"
        />

        <div className='headerInputContainer'>
          <input className='headerInput' type="text" placeholder="search Items or Products" />
          <SearchIcon style={{color:'white'}}/>
        </div>

        <div>
          <h4 className='headerText'>Donate</h4>
        </div>

        <div>
        <h4 className='headerText'>Custom Orders</h4>
        </div>


        <div style={{ position: "relative " }}>
          <ShoppingCartIcon style={{ color: "white",marginLeft:4,marginTop:2,marginRight:15}} />
          <span
            style={{
              position: "absolute",
              left: 14,
              right: 14,
              backgroundColor: "white",
              width: 14,
              height: 14,
              borderRadius: 7,
              fontSize: 12,
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            0
          </span>
        </div>
      </div>
    </>
  );
};
