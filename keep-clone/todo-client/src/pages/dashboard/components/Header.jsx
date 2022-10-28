import React from "react";
import { useHistory } from 'react-router-dom';

function Header({name}) {
  const history=useHistory();
  const logo = (
    <img
      src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
      alt="logo"
    />
  );
  const logout=()=>{
    localStorage.removeItem("user");
    history.push('/');
  }
  return (
    <div className="header">
      {logo}
      <h1>Keep for {name}</h1>
      <button onClick={logout}> Logout</button>
      </div>
  );
}

export default Header;
