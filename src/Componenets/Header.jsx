// components/Header.jsx
import React, { use } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Header() {
  const user = useSelector((state) => state.user.authStatus);
  const  id = useSelector((state) => state.user.userdata?._id);
  
  const navigate = useNavigate();
  const links= [
    { to: '/home', label: 'Home', isProtected: user },
    { to: '/login', label: 'Login', isProtected: !user }
    ,{ to: '/signup', label: 'Signup', isProtected: !user },
    
    { to: id ? `/channel/${id}` : '', label: 'Channel', isProtected: user }
    
  ];
  return (
    <header style={{ background: '#333', color: '#fff', padding: '1rem' }}>
      <h1>My App</h1>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          {links.map((link) => (
            link.isProtected && (
              <li key={link.to}>
                <button onClick={()=>navigate(link.to)}>{link.label}</button>
              </li>
            )
          ))}
        </ul>
        </nav>
    </header>
  )
}

export default Header;
