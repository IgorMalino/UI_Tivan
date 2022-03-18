import React from 'react';
import BigWindow from './BigWindow'
import SmallWindow from './SmallWindow'
import useWindowDimensions from '../../utils/windowDimensions';
import BigSize from '../../assets/img/bigSize.png'
import BigSizeClose from '../../assets/img/bigSizeClose.png'
import BigSizeLoading from '../../assets/img/bigSizeLoading.png'
import SmallSize from '../../assets/img/smallSize.png'
import SmallSizeClose from '../../assets/img/smallSizeClose.png'
import SmallSizeLoading from '../../assets/img/smallSizeLoading.png'
import {Link} from 'react-router-dom'

import './contentWindow.css'

const ContentWindow = () => {

    const {width, height} = useWindowDimensions()

    

    return (
        <div
        className='mainContent'
        >   
            {width > 800 ? <><img className='bigSizeImg' src={BigSize} /><Link to="/"><img className='bigSizeImgClose' src={BigSizeClose} /></Link><img className='bigSizeImgLoading' src={BigSizeLoading} /></> : <><img className='smallSizeImg' src={SmallSize} /><Link to="/"><img className='smallSizeImgClose' src={SmallSizeClose} /></Link><img className='smallSizeImgLoading' src={SmallSizeLoading} /></>}
            
            <div className="content">
                <h1>Header 1</h1>
                <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
                    has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                    took a galley of type and scrambled it to make a type specimen book. It has survived not 
                    only five centuries, but also the leap into electronic typesetting, remaining essentially 
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                    Lorem Ipsum passages, and more recently 
                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h4>
            </div>
        </div>
    )
}

export default ContentWindow