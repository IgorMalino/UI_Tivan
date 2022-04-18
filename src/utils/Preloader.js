import React, {useState, useEffect} from 'react';
import '../index.css'
import TivanLogo from '../assets/img/tivan_logo.png';
import {getQuote} from './getQuote'
import 'animate.css';

const Preloader = () => {

    const [classAnimation, setClassAnimation] = useState(false);
    const [animateText, setAnimateTex] = useState(false)
    const [num, setNum] = useState(0)
    const [unmount, setUnmount] = useState(false)
    const [quoteText, setQuoteText] = useState()
    
    
    useEffect(()=>{
        const quotes = getQuote()
        setQuoteText(quotes)
    }, [])

    useEffect(() => {
            setTimeout(() => {
            setClassAnimation(true)
            setTimeout(()=>{
                setAnimateTex(true)
                setTimeout(() => {
                    setNum(70);
                    setTimeout(()=>{
                        setNum(0)
                        setTimeout(()=>{
                            setUnmount(true)
                        }, 3500)
                    }, 8000)
                }, 2000)
            }, 2000)
        }, 4000);
    }, [quoteText])


    const renderQuote = (quote) => {
        const tmp = quote.split(' ').map((item, index) => {
            const a = Math.floor(Math.random()*120);
            const delay = Math.floor(Math.random()*2)
            return (
                <div key={index} style={{display: 'inline-block', transitionDelay: `${delay}s`, transform: `translate3d(0px, 0px, ${num || -a}px)`, opacity: `${num? 1 : 0}`, animationDelay: `${num ? index*0.2 : 0}s`}} className={animateText && "active"}>{item}</div>
            )
        });

        return tmp
    }
    return (
        <div style={{display: unmount && "none"}} className='preloader_wrapper'>
            <div style={{width: '150px', position:"absolute"}} className={`animate__animated animate__slower ${!classAnimation ? "animate__fadeIn" : "fadeOutAndZoomOut"}`}>
                <img src={TivanLogo} alt="Logo" width="100%"/>
            </div>
            <div  className='preloader_quote'>
                <h3 >
                    {animateText && renderQuote("#"+quoteText[0])}
                </h3>
                <h1 className='preloader_quoteText' >
                    {animateText && renderQuote(quoteText[1])}
                </h1>
                <span className={`progressBar ${num ? 'progressBarAnim' : ''}`}>
                    <span className={`progressBarLine ${num ? 'progressBarLineAnim' : ''}`}></span>
                </span>
            </div>
        </div>
    )
}

export default Preloader