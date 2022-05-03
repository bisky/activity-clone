import React, { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import '../styles/nav.css'

export default function Navbar({Logout}){

    const [show, handleShow] = useState(false);

    const [detailsLogout, setDetailsLogout] = useState({email:"", password:""})

    useEffect(() => {
        window.addEventListener("scroll", () =>{
            if(window.scrollY > 100){
                handleShow(true);
            }else handleShow(false);
        });
        // return () => {
        //     // window.removeEventListener("scroll");
        // }
    }, []);


    const LogoutHandler = () =>{
        Logout(detailsLogout);
    }

    return(
        <div className={`navbar ${show && "black"}`}>
            <img className="netflixLogo" src={process.env.PUBLIC_URL + '/assets/netflixLogo.png'} /> 
            <img className="netflixAvatar" src={process.env.PUBLIC_URL + '/assets/NetFlixAvatar.png'} />
            <button className="logout" onClick={LogoutHandler}>Logout</button>
           
        </div>
    )
}