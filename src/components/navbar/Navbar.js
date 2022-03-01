import React from 'react';
import ConnectWallet from '../ConnectWallet';
import './navbar.css'

const Navbar = () => {
 return (
     <div className='navbar'>
         <div className='left-side'>
         End of presale in: GO BUY TVT
         </div>
         <div className='right-side'>
            <ConnectWallet />
            <div>Twitter</div>
            <div>Telegram</div>
         </div>
     </div>
 )   
}

export default Navbar