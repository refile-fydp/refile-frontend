import axios from 'axios';

export const instance = axios.create({
    withCredentials: true,
    baseURL: findBaseUrl()
  })

 export function findBaseUrl(){
    var baseUrl = "";
    
    switch(process.env.NODE_ENV) {
        case 'production':
            baseUrl = "https://api.refile.email"
        default:
            baseUrl = 'https://refile-dev.herokuapp.com'
        }
    
    return baseUrl;

}


