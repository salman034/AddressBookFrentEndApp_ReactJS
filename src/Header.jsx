import React, { Component } from 'react'
//import { Link } from 'react-router-dom';
import './Header.css'
import Logo from '../src/components/assets/images/logo.png'

export class Header extends Component {
    render() {
      return (
        <div>
            <header className="header-content header">
              <div className="logo-content">
                  <img src={Logo} alt="" />
                  <div>
                      <span className="address-text">Address</span><br />
                      <span className="address-text address-book">Book</span>
                  </div>
              </div>
              <div>
              </div>
              </header>
          </div>
      )
    }
  }
  
  export default Header