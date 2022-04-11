import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import './news.css'


export default function Article({caption, text, date, id}) {

    const [show, setShow] = useState(false)



    const renderText = (text) => {
        if(text.length > 700) {
            return <>{show? text : text.slice(0, 700)} ...<span className='show_button' onClick={() =>setShow(!show)}>Show {show ? "less" : "more"}</span></>
        }
        else {
            return <>{text}</>
        }
    }   

    return (
        
        <div className='article_wrapper' key={caption}>
            <Link to={`${id}`}>
            <div className='caption'>{caption} <span className='article_date'>{date}</span></div>
            </Link>
            <div>{renderText(text)}</div>
        </div>
        
    )
}