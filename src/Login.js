import React, { useState, useEffect } from 'react';
import GoogleLogin from "react-google-login";
import { useSearchParams } from "react-router-dom";
import { setUserId } from './ApiContract';
import { baseUrl } from './Api';
import './Login.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
        <div className='center'>
           <Button variant="contained" onClick={loginRedirect}>
               LOGIN
           </Button>
        </div>
    );
}

export default Login;