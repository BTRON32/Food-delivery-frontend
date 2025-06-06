import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from "../../assets/assets"
import {Link, useNavigate} from "react-router-dom"
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'

const Navbar = ({setShowLogin}) => {

  // const [search,setSearch]=useState("")

  const [menu,setMenu]=useState('home')

  const {getTotalCartAmount,token,setToken}=useContext(StoreContext)

  const navigate=useNavigate()
  
  const logout=()=>{
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
    toast.success("Logged out successfully!")
  }

  return (
    <div className='navbar'>
      {/* <img src={assets.logo} alt="" className="logo" /> */}
      <Link to="/"><h1 style={{color:'tomato', cursor:"pointer"}} className='logo'>GrubHub</h1></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
        <a href="#explore-menu" onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href="#app-download" onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href="#footer" onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img style={{cursor:"pointer"}} src={assets.search_icon} alt="" />
        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} /> */}
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token? <button onClick={()=>setShowLogin(true)}>sign in</button>:<div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>}
       
      </div>
    </div>
  )
}

export default Navbar
