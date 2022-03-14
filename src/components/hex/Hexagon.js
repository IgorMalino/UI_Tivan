import React, {useEffect, useState} from 'react'
import * as THREE from 'three'
// import Hexasphere from '../../../public/hexasphere'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import map from '../../assets/img/map_inverted.png'
import json from '../../datasets/hexasphere.json'

const Hexagon = () => {
    const [data, setData] = useState()

    console.log(json)

    var renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xDDDDDD, 1);
    document.body.appendChild(renderer.domElement);
        
    const scene = new THREE.Scene();
    

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight);
    camera.position.z = 20;
    scene.add(camera);

    const geometry = new THREE.SphereBufferGeometry( 10, 50, 50 );
    var material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(map),
        color: "blue"
    });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    json.tiles.forEach((el) => {
        var mesh = new THREE.Mesh(
            new THREE.CylinderGeometry( 0.4, 0.4, 0.1, 6 ),
            new THREE.MeshBasicMaterial({color: "white"})
        )


        mesh.rotation.z = Math.PI /2
            
        cube.add(mesh)
    
        mesh.position.set( el.centerPoint.x,el.centerPoint.y,el.centerPoint.z)
    })

    // for(let i =0; i < 3; i++) {
    //     var mesh = new THREE.Mesh(
    //         new THREE.CylinderGeometry( 1, 1, 0.1, 6 ),
    //         new THREE.MeshBasicMaterial({color: "white"})
    //     )
    //     mesh.rotation.z = (Math.PI /2) 
    
    //     cube.add(mesh)
    
    //     mesh.position.set(10,0,0)    
    // }

            

    function render() {
        requestAnimationFrame(render);
        // cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      render();
     
      const controls = new OrbitControls(camera, renderer.domElement)
    //   controls.target.set(4.5, 0, 4.5);
 
      controls.enablePan = true;
      controls.maxPolarAngle = Math.PI;
     
      controls.enableDamping = true;
    

    return <></>
}


export default Hexagon
;