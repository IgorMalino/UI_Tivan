import React, { useEffect, useState } from 'react';
import { db } from '../../initializeFirebase';

const News = () => {
    const [data, setData] = useState()

    const fetchBlogs= async (current) =>{
        const response= await db.collection('documentContent').doc(current).get();
        setData(response.data())
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div>News</div>
    )
}

export default News