import React, { useEffect, useState } from 'react';
import { db } from '../../initializeFirebase';
import Article from './Article';
import './news.css'

const News = () => {
    const [data, setData] = useState()

    const fetchBlogs= async (current) =>{
        const response = await db.collection('News').get();
        const arr = response.docs.map(el => {    
           const newEl = el.data()
           newEl.id = el.id
           return newEl
        })
        setData(arr)
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    const renderNews = ({caption, text, date, id}) => {
        return (
            <Article caption={caption} text={text} id={id} date={date} />
        )
    }

    return (
        <>
        <div></div>
        <div style={{position:"absolute", top:"0"}}>{data && data.map(renderNews)}</div>
        </>
    )
}

export default News