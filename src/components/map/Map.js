import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import json from '../../datasets/ne_110m_admin_0_countries.geojson'
import './map.css'
import { SizeMe } from 'react-sizeme';
import useWindowDimensions from '../../utils/windowDimensions'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter} from '@fortawesome/free-brands-svg-icons'

const Map = () => {
    const [countries, setCountries] = useState()
    const [selected, setSelected] = useState()
    const { height } = useWindowDimensions();

    useEffect(()=>{
        fetch(json)
            .then(res => res.json())
            .then(countries => setCountries(countries))
    }, [])
    console.log(countries)
return (
        <div className="map">
            {countries && height &&  <SizeMe >{({ size: { width } }) => (
                <Globe width={width} height={height} 
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                hexPolygonsData={countries.features}
                hexPolygonResolution={2}
                hexPolygonMargin={0.1}
                hexPolygonColor={() => { return "white" }}
                hexPolygonLabel={({ properties: d }) => `<div style="width:150px; height: 70px; background-color: gray">
                <div style="color: black">${d.ADMIN} (${d.ISO_A2})</div> <br />
                Population: <i>${d.POP_EST}</i>
                </div>`}
                />
            )}</SizeMe>}
        </div>
    )
}

export default Map