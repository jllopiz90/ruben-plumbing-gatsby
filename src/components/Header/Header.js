import React from "react";

import * as headerStyles from "./header.module.css";


const Header = () => {

  return (
    <header>
      <div className={headerStyles.innerHeader}>
        <span className={headerStyles.headerText}> Luis Ruben Plumbing</span>
        <div className={`${headerStyles.linksContainer} hide-on-mobile`}>
          <a href="#home-section">Home</a>
          <a href="#about-section">About</a>
          <a href="#services-section">Services</a>
          <a href="#contact-section">Contact</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
