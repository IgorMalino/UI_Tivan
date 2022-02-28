import React, { useEffect, useState } from 'react';
// import Globe from 'globe.gl';
import Globe from 'react-globe.gl';
// import mapImage from '../../assets/img/map2.png'
import json from '../../datasets/ne_110m_admin_0_countries.geojson'

const Map = () => {
    const mapEl = document.getElementById('map')
    const [countries, setCountries] = useState()

    useEffect(()=>{
        fetch(json)
            .then(res => res.json())
            .then(countries => setCountries(countries))
    }, [])

    // useEffect(()=>{
        
    //     if(countries) {
    //         console.log(countries.features, 'asdasdasd')
            
    //         const world = Globe();
    //         console.log(world, 'asda')
    //         world(mapEl)
    //     .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    //     .hexPolygonsData(countries.features)
    //     .hexPolygonResolution(3)
    //     .hexPolygonMargin(0.3)
    //     .hexPolygonColor(() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`)
    //     .hexPolygonLabel(({ properties: d }) => `
    //       <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
    //       Population: <i>${d.POP_EST}</i>
    //     `);
    //     // (document.getElementById('map'))
      
    //     }

    // }, [countries])

    console.log(countries && countries.features)

return (
        <>
        <div>Map</div>
        {countries && <Globe 
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonColor={() => `white`}
/>}
        </>
    )
}

export default Map