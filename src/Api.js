import axios from 'axios';

export const instance = axios.create({
    withCredentials: true,
    baseURL: findBaseUrl()
})

function findBaseUrl(){
    var baseUrl = "";

    if (process.env.NODE_ENV == "development") {
        console.log("hi");
        baseUrl = 'https://refile-dev.herokuapp.com';
    }

    if (process.env.NODE_ENV == "production") {
        console.log("bye");
        baseUrl = "https://api.refile.email"
    }
    return baseUrl;
}

export const baseUrl = findBaseUrl();
