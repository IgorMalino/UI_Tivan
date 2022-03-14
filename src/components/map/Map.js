import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import json from '../../datasets/custom.geojson'
import './map.css'
import { SizeMe } from 'react-sizeme';
import useWindowDimensions from '../../utils/windowDimensions'
import building from '../../assets/img/rock_col.png'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter} from '@fortawesome/free-brands-svg-icons'

const Map = () => {
    const [countries, setCountries] = useState()
    const [selected, setSelected] = useState()
    const { height } = useWindowDimensions();

    let arr
    useEffect(()=>{
        fetch(json)
            .then(res => res.json())
            .then(countries => {
       

            console.log(arr)
              setCountries(countries)
            })
    }, [])
    console.log(countries)
    
    const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

//   const buildingImg = `<img src={${building}} />`

  // Gen random data
  const N = 30;
  const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: 7 + Math.random() * 30,
    color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
  }));
window.obj = []

return (
        <div className="map">
            {countries && height && <SizeMe >{({ size: { width } }) => (
                <Globe width={width} height={height} 
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                hexPolygonsData={countries.features}
                hexPolygonResolution={2}
                hexPolygonMargin={0.1}
                hexPolygonColor={(e) => {
                  window.obj.push(e)
                  return `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`
                }}
                // hexPolygonLabel={({ properties: d }) => `<div style="width:150px; height: 70px; background-color: gray">
                // <div style="color: black">${d.ADMIN} (${d.ISO_A2})</div> <br />
                // Population: <i>${d.POP_EST}</i>
                // </div>`}
                onHexPolygonClick={(polygon) => {return console.log(polygon)}}
                // htmlElementsData={gData}
                // htmlElement={d => {
                //   const el = document.createElement('div');
                //   el.innerHTML = markerSvg;
                //   el.style.color = d.color;
                //   el.style.width = `${d.size}px`;
          
                //   el.style['pointer-events'] = 'auto';
                //   el.style.cursor = 'pointer';
                //   el.onclick = () => console.info(d);
                //   return el;
                // }}
                // hexPolygonGeoJsonGeometry={}
                />
            )}</SizeMe>}
        </div>
    )
}

export default Map