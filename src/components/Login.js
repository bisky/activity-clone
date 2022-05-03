import React, { useState } from "react";
import '../styles/login.css'
import { useRef } from 'react';

export default function Login({Logins, error}){

    const [details, setDetails] = useState({email:"", password:""});

    const signIn = (e) => {
        e.preventDefault();
        
        Logins(details);
    }


    return(
        <>
        
            <div className="containter-login" 
                style={{backgroundImage: `url('${process.env.PUBLIC_URL}/assets/bg.jpg')` }} >
                     {/* <img className="netflixLogoLogin" src={process.env.PUBLIC_URL + '/assets/netflixLogo.png'} /> */}
                <div className="login-logo">
                   
                </div>
                
                <div className="login-form">
                {(error != "") ? (<div className="error">{error}</div>) : ""}
                    <form onSubmit={signIn} >
                        <h1 style={{"paddingBottom":20}}>Sign In</h1>
                       
                        <input  type="email" placeholder="Email" 
                            onChange={e => setDetails({...details, email:e.target.value})} value={details.email} />
                        <input  type="password" placeholder="Password" 
                            onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>
                        <button className="btnLogin" type="submit">Sign In</button>
                    </form>
                </div>
   
            </div>
          
        </>
    )
}