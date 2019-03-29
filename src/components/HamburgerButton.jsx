import React from 'react';

const HamburgerButton = props => (
<button className={`hamburger hamburger--spin ${props.active ? 'is-active' : 'not-active'}`} type="button" onClick={props.handleClick}>
  <span className="hamburger-box">
    <span className="hamburger-inner"></span>
  </span>
{/*  <span>{props.active ? 'CLOSE' : 'MENU'}</span>*/}
</button>
);

export default HamburgerButton;
 

