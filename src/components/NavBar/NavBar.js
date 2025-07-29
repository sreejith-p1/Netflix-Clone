
import React from 'react';
import "./NavBar.css";

function NavBar() {
  return (
    <div className='navbar'>
      <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
      <img
        className='avatar'
        src="/logo1.png"
        alt="Profile Login"
        style={{ cursor: 'pointer', borderRadius: '50%', background: '#181818', border: '2px solid #e50914', width: '48px', height: '48px' }}
      />
    </div>
  );
}

export default NavBar;
