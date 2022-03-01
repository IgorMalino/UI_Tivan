import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import json from '../../datasets/ne_110m_admin_0_countries.geojson'
import './map.css'
import { SizeMe } from 'react-sizeme';
import useWindowDimensions from '../../utils/windowDimensions'

const Map = () => {
    const [countries, setCountries] = useState()
    const { height } = useWindowDimensions();

    useEffect(()=>{
        fetch(json)
            .then(res => res.json())
            .then(countries => setCountries(countries))
    }, [])


return (
        <div className="map">
            {countries && height &&  <SizeMe >{({ size: { width } }) => (
                
                <Globe width={width} height={height} 
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                hexPolygonsData={countries.features}
                hexPolygonResolution={3}
                hexPolygonMargin={0.3}
                hexPolygonColor={() => `white`}
        />
            )}</SizeMe>}
        </div>
    )
}

export default Map