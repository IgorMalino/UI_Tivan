import React from 'react';
import { useTranslation } from 'react-i18next';
import {Link} from 'react-router-dom'
// import CSS styles
import "./innerNav.css"

const content_item_cont = {
    about: "About",
    buyit: "Buy it"
}

const isMobile = window.innerWidth <= 500

const InnerNav = () => {
  const {t} = useTranslation()
  
  
  function unHideWord(e, logoTitle, direction) {
    if (e.view.innerWidth < 768) return
    const width = e.target.offsetWidth
    
    const getRandomSybmol = () => {
      const symbols = "$%{&^+(=*$)}"
      return symbols[Math.floor(Math.random() * symbols.length)]
    }
    e.target.style.width = `${width}px`
    e.target.style.opacity = "0.5"
    let showWord = []
    let index = direction === "right" ? logoTitle.length : 0
    e.target.innerText = showWord.join('')
    
    function putSymbol(counter=0) {
      if(direction === "right" ? index < 0 : index > logoTitle.length-1) return   //
      if(counter < 2){
        setTimeout(()=>{
         const char = getRandomSybmol()
         showWord[index] = char
         e.target.innerText = showWord.join('')
         counter++
         putSymbol(counter)
        }, 10 )
      } else {
        setTimeout(()=>{
          showWord[index] = logoTitle[index]
          e.target.innerText = showWord.join('')
          direction === "right" ? index-- : index++
          if(index === logoTitle.length-3) {
            e.target.style.opacity = "0.75"
          }
          if(index === logoTitle.length-2) {
            e.target.style.opacity = "0.85"
          }
          if(index === logoTitle.length-1) {
            e.target.style.opacity = "1"
          }
          putSymbol()
        }, 30)
        }
      }
    putSymbol()
      
  }


 

    return (
        <div id="nav">
            <div id="nav-inner">
              <div id="nav-left" className="noSelect" onMouseOver={(e) => unHideWord(e, t("About"), "left")}>
                <Link to='about' data-id="About">{t("About")}</Link>
              </div>
              <div id="nav-right" className="noSelect" onMouseOver={(e) => unHideWord(e, t("Presale"), "right")}>
              <div id="nav-left" className="noSelect" onMouseOver={(e) => !isMobile && unHideWord(e, t("About"), "left")}>
                <Link to='about' data-id="About">{t("About")}</Link>
              </div>
              <div id="nav-right" className="noSelect" onMouseOver={(e) => !isMobile && unHideWord(e, t("Presale"), "right")}>
                <Link to='presale' data-id="Buy it">{t("Presale")}</Link>
              </div>
            </div>
          </div>
        </div>
    )
}

export default InnerNav