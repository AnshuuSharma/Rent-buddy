import React from 'react'
import { MantineProvider } from '@mantine/core';
import{Avatar, Menu} from '@mantine/core';
import './ProfileMenu.css';
import { replace } from 'lodash';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ user, logout }) => {
  const navigate=useNavigate();
  return (
    // <MantineProvider>

    <Menu shadow="md" width={200} onOpen={() => console.log('Menu opened')}>
      <Menu.Target>
        {/* Ensuring the user has a picture before rendering the Avatar */}
        {user?.picture ? (
          <Avatar className='avatar' src={user.picture} alt={user.email} radius="xl" />
        ) : (
          <Avatar alt={user.email} radius="xl">
            {user.email?.charAt(0).toUpperCase()}
          </Avatar> // Fallback to the first letter of the email if no picture
        )}
      </Menu.Target>
      <Menu.Dropdown  style={{ position: 'absolute' }}>
        <Menu.Item onClick={()=>navigate("./favourites",{replace:true})}>Favorites</Menu.Item>
        <Menu.Item onClick={()=>navigate("./bookings",{replace:true})}>Bookings</Menu.Item>
        <Menu.Item onClick={()=>{
          localStorage.clear();
          logout();
        }}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
        // </MantineProvider>
  );
};


export default ProfileMenu;