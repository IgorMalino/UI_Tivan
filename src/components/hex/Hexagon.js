import React, {useCallback, useEffect, useState, useRef} from 'react'
import * as THREE from 'three'
// import Hexasphere from '../../../public/hexasphere'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import map from '../../assets/img/map_inverted.png'
import json from '../../datasets/hexasphere.json'

const Hexagon = () => {
            
    var renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("black", 1);
    
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
            new THREE.CylinderGeometry(0.3, 0.3, 0.1, 6),
            new THREE.MeshBasicMaterial({ color: `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}` })
        )

        let normal = new THREE.Vector3().copy(el.centerPoint);
        normal.sub(cube.position);
        mesh.lookAt(normal);

        scene.add(mesh);

        mesh.position.copy(el.centerPoint);
        mesh.rotateOnAxis(new THREE.Vector3().copy({ x: 1, y: 0, z: 0 }), Math.PI / 2);
    })
            

    function render() {
        requestAnimationFrame(render);
        // cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      render();
      
      
     
      const controls = new OrbitControls(camera, renderer.domElement)
 
      controls.enablePan = true;
      controls.maxPolarAngle = Math.PI;
     
      controls.enableDamping = true;

    return <></>
}


export default React.memo(Hexagon);