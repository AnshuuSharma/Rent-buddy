import React, { useState } from 'react';
import './Header.css';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal';
import useAuthCheck from '../hooks/useAuthCheck';

const Header = () => {
  const [menuOpend, setMenuOpened] = useState(false);
  const [modalOpened, setModalOpened]=useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  
  const {validateLogin}=useAuthCheck()
  const handleAddPropertyClick=()=>{
     if(validateLogin()){
      setModalOpened(true);
     }
  }
  
  const getMenuStyles = (menuOpend) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: menuOpend ? '0' : '-100%' }; 
    }
    return {};
  };

  return (
    <section className="h-wrapper">
      <div className="paddings innerWidth h-container">
        <Link to="/">
          <img src="./navimg.png" alt="logo" width={200} />
        </Link>

        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="h-menu flexCenter" style={getMenuStyles(menuOpend)}>
            <NavLink to="/properties">Rooms</NavLink>
            <a href="mailto:asa771252@gmail.com">Contact</a>


{/* add property */}
 <div onClick={handleAddPropertyClick}>Add property</div>
 <AddPropertyModal 
 opened={modalOpened} 
 setOpened={setModalOpened}/>

            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>

        <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;

// import React, { useState } from 'react'
// import './Header.css'
// import { BiMenuAltRight } from 'react-icons/bi';
// import OutsideClickHandler from 'react-outside-click-handler';
// import { Link, NavLink } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
// import ProfileMenu from '../ProfileMenu/ProfileMenu';
// import { MantineProvider } from '@mantine/core';

// const Header = () => {
//   const[menuOpend, setMenuOpened]=useState(false);
//   const {loginWithRedirect,isAuthenticated, user,logout}=useAuth0()
//   console.log(user);
//   const getMenuStyles=(menuOpend)=>{
//     if(document.documentElement.clientWidth<=800){
//       return {right:!menuOpend && "-100%"}
//     }
//   }
//   return (
//     // <MantineProvider>
//    <section className="h-wrapper">
//     <div className="paddings innerWidth h-container">
//       <Link to="/">
//       <img src="./navimg.png" alt="logo" width={200}/>
//       </Link>

//       <OutsideClickHandler 
//       onOutsideClick={()=>{
//         setMenuOpened(false)
//       }}
//       >
//       <div className="h-menu flexCenter "
//       style={getMenuStyles(menuOpend)}
//       >
//        <NavLink to="/properties">Rooms</NavLink>
//        <a href="mailto:asa771252@gmail.com">Contact</a>
//        {
//         !isAuthenticated?
//         <button className="button" onClick={loginWithRedirect}>
//         Login
//         </button>:
//         <ProfileMenu user={user} logout={logout}/>
//         }
//       </div>
//       </OutsideClickHandler>
      

//       <div className="menu-icon" onClick={()=>setMenuOpened((prev)=>!prev)}>
//       <BiMenuAltRight size={30}/>
//     </div>
//     </div>
   
//    </section>
//   //  </MantineProvider>
//   )
// }

// export default Header;