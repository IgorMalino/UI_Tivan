import React from 'react';

// Importing Css styles
import './navbar.css'

// Components
import ConnectWallet from '../ConnectWallet';
import ChooseLanguage from '../chooseLanguage/ChooseLanguage';

// Font Awesome elements
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faPencilRuler} from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
 return (
     <div className='navbar'>
         <div className='left-side'>
          <FontAwesomeIcon style={{marginRight: "5px"}} icon={faPencilRuler} />End of presale in: GO BUY TVT
         </div>
         <div className='right-side'>
            <ConnectWallet className="right-side-element" />
            <a className="right-side-element" href='https://twitter.com/Tivan_art' target="_blank" rel='noreferrer' ><FontAwesomeIcon icon={faTwitter} /></a>
            <ChooseLanguage className="right-side-element" />
         </div>
     </div>
 )   
}

export default Navbar