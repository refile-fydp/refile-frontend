import React, { useState, useEffect } from 'react';
import GoogleLogin from "react-google-login";
import { useSearchParams } from "react-router-dom";
import { setUserId } from './ApiContract';
import { baseUrl } from './Api';
function Login({setActiveCard}) {

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        console.log("component mount vibes");
        searchParams.get("userId")
        setUserId(searchParams.get("userId"));
        console.log("User id is: " + searchParams.get("userId"));
        if (searchParams.get("userId") != null) {
            console.log("switch");
            setActiveCard('SecondCard');
        }

      });

    function loginRedirect() {
        window.location.href = baseUrl + "/login";
    }

    return (
        <div>
           <button onClick={loginRedirect}>
               LOGIN
           </button>
        </div>
    );
}

export default Login;