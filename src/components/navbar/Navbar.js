import React from 'react';
import ConnectWallet from '../ConnectWallet';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fatwitter } from "@fortawesome/free-solid-svg-icons"
import './navbar.css'

const Navbar = () => {
 return (
     <div className='navbar'>
         <div className='left-side'>
         End of presale in: GO BUY TVT
         </div>
         <div className='right-side'>
            <ConnectWallet />
            <Link to="https://twitter.com/Tivan_art">Twitter</Link>
            <div>Telegram</div>
         </div>
     </div>
 )   
}

export default Navbar