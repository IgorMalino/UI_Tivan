import React, { useState, useEffect, useRef, useCallback } from "react";
import Globe from "react-globe.gl";
// import geo from "./dataset/countries.geojson";
import geo from '../../datasets/countries.geojson'
import { Color, MeshPhongMaterial, PointLight, RingGeometry, MeshBasicMaterial, Mesh, DoubleSide, BufferGeometry, LineDashedMaterial, Path, LineSegments } from "three";

export const World = ({ }) => {
  const globeEl = useRef();
  const [color, setColor] = useState("rgb(255,255,255)");
  const [bg_color, setBg_color] = useState("rgba(255,255,255,0.05)");
  const [colorMaterial, setColorMaterial] = useState("rgb(42,109,140)");
  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    fetch(geo)
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  const randomBetween = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1));

  const get_color = () => {

    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`;

    setColor(rgb);
    setBg_color(`rgba(${r},${g},${b}, 0.05)`)
    setColorMaterial(rgb);
  };

  useEffect(() => {
    const globe = globeEl.current;
    globe.scene().children.map((el, i, arr) => {
      if (el.type == 'LineSegments' || el.type == 'Mesh' || el.type == 'PointLight' || el.type == 'DirectionalLight') {
        globe.scene().remove(el)
      }
    })
    const light = new PointLight(color);
    light.power = 280;
    light.decay = 4;
    light.distance = 420;
    light.position.set(0, 201, 10);

    globe.scene().add(light);

    setTimeout(() => {
      const directionalLight = globeEl.current
        .scene()
        .children.find((obj3d) => obj3d.type === "DirectionalLight");

      directionalLight.position.set(0, 0, 0)

    });

    globe.controls().minDistance = 200;
    const camera = globeEl.current.camera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    globe.scene().add(camera);

    let to;
    (function check() {
      if (globeEl.current) {
        globeEl.current.controls().autoRotate = false;
        globeEl.current.controls().autoRotateSpeed = 0.7;
        // globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 2 }); //start coordinate
      } else {
        to = setTimeout(check, 1000);
      }
    })();
    return () => {
      if (to) {
        clearTimeout(to);
      }
    };
  }, [color]);

  useEffect(() => {
    const globe = globeEl.current;

    globe.scene().children.map((el, i, arr) => {
      if (el.type == 'LineSegments' || el.type == 'Mesh') {
        globe.scene().remove(el)
      }
    })


    const geometry = new RingGeometry(130, 130.5, 60, 60, 7, 3.5);
    const material = new MeshBasicMaterial({
      color: colorMaterial,
      side: DoubleSide,
    });
    material.transparent = true;
    material.opacity = 0.5;
    const mesh = new Mesh(geometry, material);

    mesh.rotateX(-80);
    globe.scene().add(mesh);

    const m = new LineDashedMaterial({
      color: colorMaterial,
      linewidth: 5,
      dashSize: 1,
      gapSize: 5,
    });
    m.transparent = true;
    m.opacity = 0.8;
    const pts = new Path().absarc(0, 0, 120, 0, Math.PI * 2).getPoints(100);
    const g = new BufferGeometry().setFromPoints(pts);
    const line = new LineSegments(g, m);
    line.computeLineDistances();
    line.rotateX(-80);
    globe.scene().add(line);

    const m2 = new LineDashedMaterial({
      color: colorMaterial,
      linewidth: 2,
      dashSize: 0.05,
      gapSize: 100,
    });
    m2.transparent = true;
    m2.opacity = 0.6;
    const pts2 = new Path().absarc(0, 0, 140, 0, Math.PI * 2).getPoints(100);
    const g2 = new BufferGeometry().setFromPoints(pts2);
    const line2 = new LineSegments(g2, m2);
    line.computeLineDistances();
    line2.rotateX(-80);

    globe.scene().add(line2);

    function render() {
      requestAnimationFrame(render);
      mesh.rotation.z += 0.01;
      line.rotation.z += 0.001;
      line2.rotation.z -= 0.001;
    }
    render();
  }, [color]);

  const onMouseWheel = (event) => {
    const globe = globeEl.current;
    if (event.altitude > 4) {
      globe.controls().enableZoom = false;
      globeEl.current.pointOfView({
        lat: event.lat,
        lng: event.lng,
        altitude: 4,
      });
    }
    // setTimeout(() => {
    //   globe.controls().enableZoom = true;
    //   event.altitude = 4;
    // }, 1000);
  };

  const globeMaterial = new MeshPhongMaterial();
  globeMaterial.color = new Color("#000");
  globeMaterial.opacity = 0.8;
  globeMaterial.transparent = true;

  return (
    <>
      <Globe
        ref={useCallback(globeEl, [])}
        backgroundColor={bg_color}
        hexPolygonsData={countries.features}
        globeMaterial={useCallback(globeMaterial, [])}
        hexPolygonResolution={2}
        hexPolygonMargin={0.2}
        onZoom={onMouseWheel}
        hexPolygonColor={(el) => (el.color ? el.color : "#2a6d8c")}
        pathsData={countries.features}
        atmosphereAltitude={0.1}
        showAtmosphere={true}
        atmosphereColor={color}
      // hexPolygonLabel={({ properties: d }) => `
      //   <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
      //   Population: <i>${d.POP_EST}</i>
      // `}
      />
      <button onClick={get_color}>change color</button>
    </>
  );
};
