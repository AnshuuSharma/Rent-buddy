import React, { useEffect,useContext } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { createHashRouter, Outlet } from 'react-router-dom'
import UserDetailContext from '../../context/UserDetailContext'
import { useMutation } from 'react-query'
import { createUser } from '../../utils/api'
import { useAuth0 } from '@auth0/auth0-react'; 
import useFavourites from '../hooks/useFavourites'
import useBookings from '../hooks/useBookings'

const Layout = () => {
  useFavourites();
  useBookings();

  const {isAuthenticated,user,getAccessTokenWithPopup}=useAuth0();
  const {setUserDetails}=useContext(UserDetailContext)

  const {mutate}=useMutation({
    mutationKey:[user?.email],
    mutationFn: (token) => {
      if (user) {
        return createUser(user.email, token);
      }
    }
  })

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "https://dev-p4ihja24zlmgfy8p.us.auth0.com/api/v2/",
            // audience:"http://localhost:8000",
            scope: "openid profile email",
          },
        });
        // const token = res.access_token; 
        const token=res;
        console.log("response "+ res);
        // if(token){console.log(token)} else{console.log("no token found")}
        localStorage.setItem("access_token", token);
        setUserDetails((prev) => ({ ...prev, token }));
        mutate(token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
  
    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated]);
  
  return (
    <> 
    <div style={{overflow:'hidden'}}>
        <Header/>
        <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default Layout;