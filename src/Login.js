import React, { useState, useEffect } from 'react';
import GoogleLogin from "react-google-login";
import { useSearchParams } from "react-router-dom";

function Login({setActiveCard}) {

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        console.log("component mount vibes");
        searchParams.get("userId")
        console.log("User id is: " + searchParams.get("userId"));
        if (searchParams.get("userId") != null) {
            setActiveCard('SecondCard');
        }

      });

    const responseGoogleSuccess = response => {
        console.log(response);
        console.log("success");
    };

    const responseGoogleError = response => {
        console.log(response);
        setActiveCard('FirstCard');
    };

    function loginRedirect() {
        window.location.href = "https://refile.herokuapp.com/login";
        setActiveCard("SecondCard");
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