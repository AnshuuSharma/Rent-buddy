import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Auth0Provider
        domain="dev-p4ihja24zlmgfy8p.us.auth0.com"
        clientId="PPoVDe1pnaOM7ssgpYse8H5ZpydMtpIv"
        authorizationParams={{
          redirect_uri: "http://localhost:5173",
          audience: "https://dev-p4ihja24zlmgfy8p.us.auth0.com/api/v2/",
        }}
        scope="openid profile email"
      >
        <App />
      </Auth0Provider>
    </MantineProvider>
  </StrictMode>
);

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import {Auth0Provider} from "@auth0/auth0-react"
// // import { redirect } from 'react-router-dom'
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Auth0Provider
//     domain="dev-p4ihja24zlmgfy8p.us.auth0.com"
//     clientId='PPoVDe1pnaOM7ssgpYse8H5ZpydMtpIv'
//     authorizationParams={{
//       redirect_uri: "http://localhost:5173",
//       audience: "https://dev-p4ihja24zlmgfy8p.us.auth0.com/api/v2/" ,
//       // audience:"http://localhost:8000"
//       } }
    
//     scope="openid profile email"
//     >
      
//     <App />
//     </Auth0Provider>
//   </StrictMode>,
// )
