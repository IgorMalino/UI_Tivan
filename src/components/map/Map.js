import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import json from '../../datasets/custom.geojson'
import './map.css'
import { SizeMe } from 'react-sizeme';
import useWindowDimensions from '../../utils/windowDimensions'
import building from '../../assets/img/rock_col.png'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
import Hexagon from '../hex/Hexagon';

const Map = () => {
    
return (
        <div className="map">
            {/* {<SizeMe >{({ size: { width } }) => ( */}
                <Hexagon  />
            {/* )}</SizeMe>} */}
        </div>
    )
}

export default Map