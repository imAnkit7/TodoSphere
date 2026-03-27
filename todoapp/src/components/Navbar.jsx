import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './navbar.css'
import { CiClock1 } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [login, SetLogin] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const [menuOpen, setMenuOpen] = useState(false)


    return (
        < >
            <nav className="fixed-top">
                {/* <div className=""> */}

                <div className="nav" id="">
                    <div><Link className="logo" ><CiClock1 />Todosphere</Link></div>
                    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </div>

                    <div className={`ulList ${menuOpen ? "active" : ""}`}>
                        <li className="mx-3">
                            <a href="#home" aria-current="page" to="/mytodos">Home</a>
                        </li>
                        <li className="mx-3">
                            <a href="#history">Completed</a>
                        </li>
                        <li className="mx-3">
                            <button className='btnLogout' onClick={() => {
                                localStorage.removeItem('token')
                                SetLogin(false)
                                navigate('/')
                            }}>Logout</button>
                        </li>
                    </div>

                </div>
                {/* </div> */}
            </nav >
        </ >
    )
}
