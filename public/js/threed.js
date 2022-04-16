var container,
  camera,
  scene,
  renderer,
  i,
  x,
  y,
  b,
  initMouseX,
  lastTouchX,
  lastTouchY,
  intersects,
  mouse = new THREE.Vector2(),
  mouseX = 0,
  mouseY = 0,
  mouseXOnMouseDown = 0,
  mouseYOnMouseDown = 0,
  clientMouseX = 0,
  clientMouseY = 0,
  openingCameraZ = 1e3,
  targetCameraZ = 250,
  windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2,
  toRAD = Math.PI / 180,
  radianLoop = 6.28319,
  openingRotationX = 0.45,
  targetRotationX = 0.45,
  targetRotationXOnMouseDown = 0.45,
  openingRotationY = 65 * toRAD,
  targetRotationY = 65 * toRAD,
  targetRotationYOnMouseDown = 90 * toRAD,
  isMouseDown = !1,
  isMouseMoved = !1,
  isGlobeRotated = !1,
  isGlobeEventsEnabled = !1,
  globeRaycaster = new THREE.Raycaster(),
  intersection = null,
  isParticleHit = !1,
  isMediaHit = !1;
globeRaycaster.params.Points.threshold = 0.4;
var colorPrimary_Base = "#33CCFF",
  colorSecondary_Base = "#FF1313",
  colorPrimary = "#33CCFF",
  colorSecondary = colorSecondary_Base,
  colorDarken = "#000000",
  colorBrighten = "#FFFFFF",
  colorBase = new THREE.Color(colorPrimary),
  colorBase50 = new THREE.Color(shadeBlend(0.5, colorPrimary, colorDarken)),
  colorBase75 = new THREE.Color(shadeBlend(0.75, colorPrimary, colorDarken)),
  colorBase85 = new THREE.Color(shadeBlend(0.85, colorPrimary, colorDarken)),
  colorHighlight = new THREE.Color(colorSecondary);

function initWebgl() {
  container = document.getElementById("interactive1");

  var e = window.innerWidth,
    a = window.innerHeight;
  (scene = new THREE.Scene()),
    (scene.fog = new THREE.Fog(0, 0, 400)),
    (camera = new THREE.PerspectiveCamera(45, e / a, 1, 2e3)),
    (camera.position.x = 0),
    (camera.position.y = 0),
    (camera.position.z = openingCameraZ),
    (camera.rotation.x = 0),
    (camera.rotation.y = 0),
    (camera.rotation.z = 0);
  arrayExecuter.execute([
    {
      fn: createGroup,
      vars: [stepComplete],
    },
    {
      fn: createLights,
      vars: [stepComplete],
    },
    {
      fn: createUniverse,
      vars: [stepComplete],
    },
    {
      fn: createGlobe,
      vars: [stepComplete],
    },
    {
      fn: createDots,
      vars: [stepComplete],
    },
    {
      fn: createArcsSnake,
      vars: [stepComplete],
    },
    {
      fn: createArcsRocket,
      vars: [stepComplete],
    },
    {
      fn: createArcsAll,
      vars: [stepComplete],
    },
    {
      fn: createRings,
      vars: [stepComplete],
    },
    {
      fn: createSpikes,
      vars: [stepComplete],
    },
    {
      fn: createRingPulse,
      vars: [stepComplete],
    },
    {
      fn: createRain,
      vars: [stepComplete],
    },
    {
      fn: createPreloader,
      vars: [stepComplete],
    },
    {
      fn: createStars,
      vars: null,
    },
  ]),
    (renderer = new THREE.WebGLRenderer({
      antialias: !0,
      alpha: !1,
    })),
    initExperience(),
    renderer.setSize(e, a),
    renderer.setClearColor(0, 1),
    container.appendChild(renderer.domElement),
    animate();
}

function createPreloader(e) {
  preloaderAnimationIn = new TimelineMax({
    paused: !0,
    delay: 0.25,
    onComplete: function () {
      playIntro();
    },
  });

  preloaderAnimationIn.timeScale(1), preloaderAnimationIn.play(0), e && e();
}

var arrayExecuter = new ArrayExecuter(),
  stepComplete = arrayExecuter.stepComplete_instant.bind(arrayExecuter);

function initExperience() {
  document
    .getElementById("interactive1")
    .addEventListener("mousedown", onDocumentMouseDown, !1),
    document
      .getElementById("interactive1")
      .addEventListener("mousemove", onDocumentMouseMove, !1),
    document
      .getElementById("interactive1")
      .addEventListener("mouseup", onDocumentMouseUp, !1),
    document
      .getElementById("interactive1")
      .addEventListener("mouseleave", onDocumentMouseLeave, !1),
    document
      .getElementById("interactive1")
      .addEventListener("touchstart", onDocumentTouchStart, !1),
    document
      .getElementById("interactive1")
      .addEventListener("touchmove", onDocumentTouchMove, !1),
    document
      .getElementById("interactive1")
      .addEventListener("touchend", onDocumentTouchEnd, !1),
    document
      .getElementById("interactive1")
      .addEventListener("mousewheel", onMouseWheel, !1),
    document.addEventListener("gesturestart", function (a) {
      a.preventDefault();
    }),
    window.addEventListener("resize", onWindowResize, !1),
    onWindowResize();
}

function playIntro() {
  (isGlobeRotated = !0), (isGlobeEventsEnabled = !0);

  setArcAnimation("snake"), showGlobe();
}
var rotationObject, earthObject;

function createGroup(e) {
  (rotationObject = new THREE.Group()),
    (rotationObject.name = "rotationObject"),
    (rotationObject.rotation.x = openingRotationX),
    (rotationObject.rotation.y = openingRotationY),
    scene.add(rotationObject),
    (earthObject = new THREE.Group()),
    (earthObject.name = "earthObject"),
    (earthObject.rotation.y = -90 * toRAD),
    rotationObject.add(earthObject),
    e && e();
}
var lightShield1,
  lightShield2,
  lightShield3,
  lightShieldIntensity = 1.25,
  lightShieldDistance = 400,
  lightShieldDecay = 2,
  lightsCreated = !1;

function createLights(e) {
  (lightShield1 = new THREE.PointLight(
    colorBase,
    lightShieldIntensity,
    lightShieldDistance,
    lightShieldDecay
  )),
    (lightShield1.position.x = -50),
    (lightShield1.position.y = 150),
    (lightShield1.position.z = 75),
    (lightShield1.name = "lightShield1"),
    scene.add(lightShield1),
    (lightShield2 = new THREE.PointLight(
      colorBase,
      lightShieldIntensity,
      lightShieldDistance,
      lightShieldDecay
    )),
    (lightShield2.position.x = 100),
    (lightShield2.position.y = 50),
    (lightShield2.position.z = 50),
    (lightShield2.name = "lightShield2"),
    scene.add(lightShield2),
    (lightShield3 = new THREE.PointLight(
      colorBase,
      lightShieldIntensity,
      lightShieldDistance,
      lightShieldDecay
    )),
    (lightShield3.position.x = 0),
    (lightShield3.position.y = -300),
    (lightShield3.position.z = 50),
    (lightShield3.name = "lightShield3"),
    scene.add(lightShield3),
    (lightsCreated = !0),
    e && e();
}
var ringsObject,
  ringsOuterMaterial,
  ringsInnerMaterial,
  ringsCreated = !1;

function createRings(e) {
  (ringsObject = new THREE.Group()),
    (ringsObject.name = "ringsObject"),
    scene.add(ringsObject);
  var a = new THREE.RingGeometry(200, 195, 128),
    t = new THREE.RingGeometry(100, 98, 128);
  (ringsOuterMaterial = new THREE.MeshBasicMaterial({
    color: colorBase75,
    transparent: !0,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: !0,
    depthWrite: !1,
  })),
    (ringsInnerMaterial = new THREE.MeshBasicMaterial({
      color: colorBase50,
      transparent: !0,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      fog: !0,
      depthWrite: !1,
    }));
  var i = new THREE.Mesh(a, ringsOuterMaterial);
  i.rotation.x = 90 * toRAD;
  var o = i.clone();
  (i.position.y = 90),
    (o.position.y = -90),
    ringsObject.add(i),
    ringsObject.add(o);
  var n = new THREE.Mesh(t, ringsInnerMaterial);
  n.rotation.x = 90 * toRAD;
  var r = n.clone();
  (n.position.y = 100),
    (r.position.y = -100),
    ringsObject.add(n),
    ringsObject.add(r),
    (ringsCreated = !0),
    e && e();
}

function renderRings() {
  (ringsObject.rotation.x = ringsObject.rotation.x +=
    0.25 * (targetTiltX - ringsObject.rotation.x)),
    (ringsObject.rotation.z = ringsObject.rotation.z -=
      0.25 * (targetTiltY + ringsObject.rotation.z));
}
var universeBgObject,
  universeBgTexture,
  universeBgMaterial,
  universeBgGeometry,
  universeBgMesh,
  universeCreated = !1;

function createUniverse(e) {
  (universeBgTexture = new THREE.TextureLoader().load("/img/universe.jpeg")),
    (universeBgTexture.anisotropy = 16),
    (universeBgGeometry = new THREE.PlaneGeometry(1500, 750, 1, 1)),
    (universeBgMaterial = new THREE.MeshBasicMaterial({
      map: universeBgTexture,
      blending: THREE.AdditiveBlending,
      color: colorBase,
      transparent: !0,
      opacity: 0,
      fog: !1,
      side: THREE.DoubleSide,
      depthWrite: !1,
      depthTest: !1,
    })),
    (universeBgMesh = new THREE.Mesh(universeBgGeometry, universeBgMaterial)),
    (universeBgMesh.position.z = -400),
    (universeBgMesh.name = "universeBgMesh"),
    scene.add(universeBgMesh),
    (universeCreated = !0),
    e && e();
}
var globeBufferGeometry,
  globeTexture,
  globeInnerMaterial,
  globeOuterMaterial,
  globeInnerMesh,
  globeOuterMesh,
  globeShieldGeometry,
  globeShieldMaterial,
  globeShieldMesh,
  globeCloud,
  globeCloudBufferGeometry,
  globeCloudColors,
  globeCloudMaterial,
  globeGlowTexture,
  globeGlowMaterial,
  globeGlowBufferGeometry,
  globeGlowMesh,
  globeRadius = 65,
  globeMaxZoom = 90,
  globeMinZoom = 300,
  globeExtraDistance = 0.05,
  globeCloudVerticesArray = [],
  globeGlowSize = 200,
  globeGlowPositionZ = 0,
  globeCreated = !1;

function createGlobe(e) {
  (globeBufferGeometry = new THREE.SphereBufferGeometry(globeRadius, 64, 64)),
    (globeTexture = new THREE.TextureLoader().load("/img/map2.png")),
    (globeTexture.anisotropy = 16),
    (globeInnerMaterial = new THREE.MeshBasicMaterial({
      map: globeTexture,
      color: colorBase75,
      transparent: !0,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      fog: !0,
      depthWrite: !1,
      depthTest: !1,
    })),
    (globeInnerMaterial.needsUpdate = !0),
    (globeInnerMesh = new THREE.Mesh(globeBufferGeometry, globeInnerMaterial)),
    earthObject.add(globeInnerMesh),
    (globeOuterMaterial = new THREE.MeshBasicMaterial({
      map: globeTexture,
      color: colorBase,
      transparent: !0,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      fog: !0,
      depthWrite: !1,
      depthTest: !1,
    })),
    (globeOuterMaterial.needsUpdate = !0),
    (globeOuterMesh = new THREE.Mesh(globeBufferGeometry, globeOuterMaterial)),
    earthObject.add(globeOuterMesh),
    (globeShieldMaterial = new THREE.MeshPhongMaterial({
      color: colorBase75,
      transparent: !0,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      opacity: 0,
      fog: !1,
      depthWrite: !1,
      depthTest: !1,
    })),
    (globeShieldMesh = new THREE.Mesh(
      globeBufferGeometry,
      globeShieldMaterial
    )),
    (globeShieldMesh.name = "globeShieldMesh"),
    scene.add(globeShieldMesh);
  var a = new Image();
  (a.src = "/img/map_inverted.png"),
    (a.onload = function () {
      var e = document.createElement("canvas");
      (e.width = a.width), (e.height = a.height);
      var t = e.getContext("2d");
      t.drawImage(a, 0, 0, a.width, a.height);
      for (
        var o = t.getImageData(0, 0, e.width, e.height), n = 0;
        n < o.data.length;
        n += 4
      ) {
        var r = (n / 4) % e.width,
          s = (n / 4 - r) / e.width;
        if (1 == (n / 4) % 2 && 1 == s % 2) {
          var l = o.data[n];
          if (0 === l) {
            var d = (s / (e.height / 180) - 90) / -1,
              A = r / (e.width / 360) - 180,
              p = latLongToVector3(d, A, globeRadius, -0.1);
            globeCloudVerticesArray.push(p);
          }
        }
      }
      globeCloudBufferGeometry = new THREE.BufferGeometry();
      for (
        var m = new Float32Array(3 * globeCloudVerticesArray.length), n = 0;
        n < globeCloudVerticesArray.length;
        n++
      )
        (m[3 * n] = globeCloudVerticesArray[n].x),
          (m[3 * n + 1] = globeCloudVerticesArray[n].y),
          (m[3 * n + 2] = globeCloudVerticesArray[n].z);
      globeCloudBufferGeometry.addAttribute(
        "position",
        new THREE.BufferAttribute(m, 3)
      ),
        (globeCloudMaterial = new THREE.PointsMaterial({
          size: 0.75,
          fog: !0,
          vertexColors: THREE.VertexColors,
          depthWrite: !1,
        }));
      for (
        var u = new Float32Array(3 * globeCloudVerticesArray.length),
          c = [],
          n = 0;
        n < globeCloudVerticesArray.length;
        n++
      ) {
        var S = 0.01 * generateRandomNumber(80, 90),
          g = shadeBlend(S, colorPrimary_Base, colorDarken);
        c[n] = new THREE.Color(g);
      }
      for (var n = 0; n < globeCloudVerticesArray.length; n++)
        (u[3 * n] = c[n].r), (u[3 * n + 1] = c[n].g), (u[3 * n + 2] = c[n].b);
      globeCloudBufferGeometry.addAttribute(
        "color",
        new THREE.BufferAttribute(u, 3)
      ),
        (globeCloudBufferGeometry.colorsNeedUpdate = !0),
        (globeCloud = new THREE.Points(
          globeCloudBufferGeometry,
          globeCloudMaterial
        )),
        (globeCloud.sortParticles = !0),
        (globeCloud.name = "globeCloud"),
        earthObject.add(globeCloud);
    }),
    (globeGlowSize = 200),
    (globeGlowTexture = new THREE.TextureLoader().load("/img/earth-glow.jpeg")),
    (globeGlowTexture.anisotropy = 2),
    (globeGlowTexture.wrapS = globeGlowTexture.wrapT = THREE.RepeatWrapping),
    (globeGlowTexture.magFilter = THREE.NearestFilter),
    (globeGlowTexture.minFilter = THREE.NearestMipMapNearestFilter),
    (globeGlowBufferGeometry = new THREE.PlaneBufferGeometry(
      globeGlowSize,
      globeGlowSize,
      1,
      1
    )),
    (globeGlowMaterial = new THREE.MeshBasicMaterial({
      map: globeGlowTexture,
      color: colorBase,
      transparent: !0,
      opacity: 0,
      fog: !1,
      blending: THREE.AdditiveBlending,
      depthWrite: !1,
    })),
    (globeGlowMesh = new THREE.Mesh(
      globeGlowBufferGeometry,
      globeGlowMaterial
    )),
    (globeGlowMesh.name = "globeGlowMesh"),
    scene.add(globeGlowMesh),
    (globeCreated = !0),
    e && e();
}

function renderGlobe() {
  if (isGlobeEventsEnabled) {
    targetCameraZ < globeMaxZoom && (targetCameraZ = globeMaxZoom),
      targetCameraZ > globeMinZoom && (targetCameraZ = globeMinZoom),
      (camera.position.z = camera.position.z +=
        0.01 * (targetCameraZ - camera.position.z));
    var e = camera.position.z;
    if (e < 200 && e > globeMaxZoom) {
      globeGlowPositionZ = 0 + 22 * ((200 - e) / 110);
    } else globeGlowPositionZ = 0;
    (globeCloud.sortParticles = !0),
      globeGlowMesh.position.set(0, 0, globeGlowPositionZ);
  }
}

function showGlobe() {
  TweenMax.fromTo(
    universeBgMaterial,
    4,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      delay: 1,
      ease: Linear.easeNone,
    }
  ),
    TweenMax.fromTo(
      globeShieldMaterial,
      3,
      {
        opacity: 0,
      },
      {
        opacity: 0.65,
        delay: 1,
        ease: Linear.easeNone,
      }
    ),
    TweenMax.fromTo(
      globeGlowMaterial,
      3,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 1,
        ease: Linear.easeNone,
      }
    ),
    TweenMax.fromTo(
      starsZoomObject.position,
      6,
      {
        z: 0,
      },
      {
        z: 325,
        ease: Circ.easeInOut,
        onComplete: function () {
          starsZoomObject.visible = !1;
        },
      }
    );
}
var dotObject,
  dotTexture,
  dotMaterial,
  dotHoverTexture,
  dotHoverMaterial,
  dotSpikesBufferGeometry,
  dotSpikesMaterial,
  dotSpikesMesh,
  dotSpikeHoverGeometry,
  dotSpikeHoverMaterial,
  dotSpikeHover,
  dotSpritesArray = [],
  dotDetailsArray = [],
  dotSpritesHoverArray = [],
  dotSpikesVerticesArray = [],
  dotSpikesCloudVerticesArray = [],
  dotsCreated = !1;

function createDots(e) {
  for (
    dotObject = new THREE.Group(),
      dotObject.name = "dotObject",
      earthObject.add(dotObject),
      dotTexture = new THREE.TextureLoader().load("/img/dot-inverted.png"),
      dotMaterial = new THREE.MeshBasicMaterial({
        map: dotTexture,
        color: colorHighlight,
        transparent: !0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        fog: !0,
        depthWrite: !1,
      }),
      g = 0;
    g < dataMap.length;
    g++
  ) {
    var a = dataMap[g][1],
      t = dataMap[g][2],
      o = dataMap[g][3],
      n = new THREE.PlaneBufferGeometry(1, 1, 1),
      r = new THREE.Mesh(n, dotMaterial);
    r.userData = {
      id: g,
    };
    var s = 0.1;
    2 === a && (s += 0.05);
    var l = latLongToVector3(t, o, globeRadius, globeExtraDistance + s);
    r.position.set(l.x, l.y, l.z), r.lookAt(new THREE.Vector3(0, 0, 0));
    var d = 2;
    2 === a && (d = 3),
      r.scale.set(d, d, d),
      dotDetailsArray.push({
        position: new THREE.Vector3(r.position.x, r.position.y, r.position.z),
        type: a,
      }),
      dotSpritesArray.push(r),
      dotObject.add(r);
    var A = new THREE.MeshBasicMaterial({
        map: dotTexture,
        color: colorHighlight,
        transparent: !0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        opacity: 0,
        depthWrite: !1,
      }),
      p = new THREE.Mesh(n, A),
      l = latLongToVector3(t, o, globeRadius, globeExtraDistance + s);
    p.position.set(l.x, l.y, l.z),
      p.lookAt(new THREE.Vector3(0, 0, 0)),
      (p.visible = !1),
      dotSpritesHoverArray.push(p),
      dotObject.add(p);
  }
  for (g = 0; g < dotDetailsArray.length; g++) {
    var m = new THREE.Vector3();
    (m.x = dotSpritesArray[g].position.x),
      (m.y = dotSpritesArray[g].position.y),
      (m.z = dotSpritesArray[g].position.z);
    var u = m.clone(),
      c = 0.01 * (4 * Math.random());
    2 === dotDetailsArray[g].type && u.multiplyScalar(1.12),
      1 === dotDetailsArray[g].type && u.multiplyScalar(1.02 + c),
      0 === dotDetailsArray[g].type && u.multiplyScalar(1.02 + c),
      dotSpikesVerticesArray.push(m),
      dotSpikesVerticesArray.push(u),
      dotSpikesCloudVerticesArray.push(u);
  }

  var U = [];

  for (var S = new Float32Array(3 * U.length), g = 0; g < U.length; g++)
    (S[3 * g] = U[g].x), (S[3 * g + 1] = U[g].y), (S[3 * g + 2] = U[g].z);
  (dotSpikesExtraMaterial = new THREE.LineBasicMaterial({
    linewidth: 1,
    color: 16777215,
    transparent: !0,
    blending: THREE.AdditiveBlending,
    fog: !0,
    depthWrite: !1,
  })),
    (dotSpikesExtraBufferGeometry = new THREE.BufferGeometry()),
    dotSpikesExtraBufferGeometry.addAttribute(
      "position",
      new THREE.BufferAttribute(S, 3)
    ),
    (dotSpikesExtraMesh = new THREE.LineSegments(
      dotSpikesExtraBufferGeometry,
      dotSpikesExtraMaterial
    )),
    dotObject.add(dotSpikesExtraMesh),
    (dotsCreated = !0),
    e && e();
}

function renderDots() {
  var e = camera.position.z,
    a = 0;
  if (e < 200 && e > globeMaxZoom) {
    a = 1.25 * ((200 - e) / 110);
  }
  for (i = 0; i < dotDetailsArray.length; i++) {
    var t = 2;
    2 === dotDetailsArray[i].type && (t = 3),
      dotSpritesArray[i].scale.set(t - a, t - a, 1);
  }
}
var starsObject1,
  starsObject2,
  starsObjectZoom,
  starsCloud1,
  starsCloud2,
  starsMaterial,
  starsZoomObject,
  starZoomTexture,
  starsZoomMaterial,
  starsZoomBufferGeometry,
  starsCenter = new THREE.Vector3(0, 0, 0),
  starsTotal = 500,
  starsMaxDistance = 400,
  starsMinDistance = 100,
  starsVerticesArray = [],
  starsSize = 1,
  starsZoomTotal = 150,
  starsZoomMaxDistance = 200,
  starsZoomBuffer = 0,
  starsZoomVerticesArray = [],
  starsCreated = !1;

function createStars(e) {
  console.log(e, "asdasd");
  for (
    starsObject1 = new THREE.Group(),
      starsObject1.name = "starsObject1",
      scene.add(starsObject1),
      starsObject2 = new THREE.Group(),
      starsObject2.name = "starsObject2",
      scene.add(starsObject2),
      r = 0;
    r < starsTotal;
    r++
  ) {
    var a = new THREE.Vector3();
    (a.x = Math.random() * starsMaxDistance - 200),
      (a.y = 150 * Math.random() - 75),
      (a.z = Math.random() * starsMaxDistance - 200);
    var t = checkDistance(starsCenter, a),
      o = starsMinDistance;
    t < o && (a.x < o && (a.x = o), a.y < o && (a.y = o), a.z < o && (a.z = o)),
      starsVerticesArray.push(a);
  }
  (starsMaterial = new THREE.PointsMaterial({
    size: starsSize,
    sizeAttenuation: !1,
    color: colorBase,
    fog: !0,
  })),
    (starsMaterial.needsUpdate = !0);
  for (
    var n = new Float32Array(3 * starsVerticesArray.length), r = 0;
    r < starsVerticesArray.length;
    r++
  )
    (n[3 * r] = starsVerticesArray[r].x),
      (n[3 * r + 1] = starsVerticesArray[r].y),
      (n[3 * r + 2] = starsVerticesArray[r].z);
  for (
    starsBufferGeometry = new THREE.BufferGeometry(),
      starsBufferGeometry.addAttribute(
        "position",
        new THREE.BufferAttribute(n, 3)
      ),
      starsCloud1 = new THREE.Points(starsBufferGeometry, starsMaterial),
      starsCloud1.sortParticles = !0,
      starsObject1.add(starsCloud1),
      starsCloud2 = new THREE.Points(starsBufferGeometry, starsMaterial),
      starsCloud2.sortParticles = !0,
      starsObject2.add(starsCloud2),
      starsObject2.rotation.x = 180 * toRAD,
      starsZoomObject = new THREE.Group(),
      starsZoomObject.name = "starsObjectZoom",
      scene.add(starsZoomObject),
      starZoomTexture = new THREE.TextureLoader().load("/img/star.jpeg"),
      r = 0;
    r < starsZoomTotal;
    r++
  ) {
    var a = new THREE.Vector3();
    (a.x = Math.random() * starsZoomMaxDistance - 100),
      (a.y = Math.random() * starsZoomMaxDistance - 100),
      (a.z = starsZoomBuffer + 500 * Math.random()),
      starsZoomVerticesArray.push(a);
  }
  starsZoomMaterial = new THREE.PointsMaterial({
    map: starZoomTexture,
    transparent: !0,
    blending: THREE.AdditiveBlending,
    size: 5,
    color: colorBase,
    fog: !0,
  });
  for (
    var n = new Float32Array(3 * starsZoomVerticesArray.length), r = 0;
    r < starsZoomVerticesArray.length;
    r++
  )
    (n[3 * r] = starsZoomVerticesArray[r].x),
      (n[3 * r + 1] = starsZoomVerticesArray[r].y),
      (n[3 * r + 2] = starsZoomVerticesArray[r].z);
  (starsZoomBufferGeometry = new THREE.BufferGeometry()),
    starsZoomBufferGeometry.addAttribute(
      "position",
      new THREE.BufferAttribute(n, 3)
    ),
    (starsZoomCloud = new THREE.Points(
      starsZoomBufferGeometry,
      starsZoomMaterial
    )),
    (starsZoomCloud.sortParticles = !0),
    starsZoomObject.add(starsZoomCloud),
    (starsCreated = !0),
    e && e();
}

function renderStars() {
  (starsObject1.rotation.y += 25e-5), (starsObject2.rotation.y += 25e-5);
}
var arcRocketObject,
  arcRocketBufferGeometry,
  arcRocketShaderUniforms,
  arcRocketShaderMaterial,
  arcRocketMesh,
  arcRocketAnimation,
  lineBufferSpeed = 0.025,
  lineBufferDivisions = 25,
  snakeBufferSpeed = 3 * (lineBufferSpeed * lineBufferDivisions),
  arcRocketDetailsArray = [],
  arcRocketVerticesArray = [],
  arcRocketCreated = !1;

function createArcsRocket(e) {
  for (
    arcRocketObject = new THREE.Group(),
      arcRocketObject.name = "arcsRocket",
      c = 0;
    c < dataMap.length - 1;
    c++
  ) {
    var a = latLongToVector3(
        dataMap[0][2],
        dataMap[0][3],
        globeRadius,
        globeExtraDistance
      ),
      t = latLongToVector3(
        dataMap[c + 1][2],
        dataMap[c + 1][3],
        globeRadius,
        globeExtraDistance
      ),
      o = 1 + 0.006 * checkDistance(a, t),
      n = new THREE.Vector3();
    n.addVectors(a, t), n.normalize().multiplyScalar(globeRadius * o);
    var r = 1 + 0.006 * checkDistance(a, n),
      s = new THREE.Vector3();
    s.addVectors(a, n), s.normalize().multiplyScalar(globeRadius * r);
    var l = new THREE.Vector3();
    l.addVectors(n, t), l.normalize().multiplyScalar(globeRadius * r);
    for (
      var d = new THREE.CubicBezierCurve3(a, s, l, t),
        A = d.getPoints(lineBufferDivisions),
        p = 0;
      p < lineBufferDivisions;
      p++
    )
      arcRocketVerticesArray.push(A[p]),
        arcRocketDetailsArray.push({
          alpha: 0,
        }),
        arcRocketVerticesArray.push(A[p + 1]),
        arcRocketDetailsArray.push({
          alpha: 0,
        });
  }
  (arcRocketBufferGeometry = new THREE.BufferGeometry()),
    (arcRocketShaderUniforms = {
      color: {
        value: colorHighlight,
      },
      fogColor: {
        type: "c",
        value: scene.fog.color,
      },
      fogNear: {
        type: "f",
        value: scene.fog.near,
      },
      fogFar: {
        type: "f",
        value: scene.fog.far,
      },
    }),
    (arcRocketShaderMaterial = new THREE.ShaderMaterial({
      uniforms: arcRocketShaderUniforms,
      vertexShader: document.getElementById("line_vertexshader").textContent,
      fragmentShader: document.getElementById("line_fragmentshader")
        .textContent,
      blending: THREE.AdditiveBlending,
      depthTest: !1,
      fog: !0,
      transparent: !0,
    }));
  for (
    var m = new Float32Array(3 * arcRocketVerticesArray.length),
      u = new Float32Array(arcRocketVerticesArray.length),
      c = 0;
    c < arcRocketVerticesArray.length;
    c++
  )
    (m[3 * c] = arcRocketVerticesArray[c].x),
      (m[3 * c + 1] = arcRocketVerticesArray[c].y),
      (m[3 * c + 2] = arcRocketVerticesArray[c].z),
      (u[c] = 0);
  arcRocketBufferGeometry.addAttribute(
    "position",
    new THREE.BufferAttribute(m, 3)
  ),
    arcRocketBufferGeometry.addAttribute(
      "alpha",
      new THREE.BufferAttribute(u, 1)
    ),
    (arcRocketMesh = new THREE.LineSegments(
      arcRocketBufferGeometry,
      arcRocketShaderMaterial
    )),
    arcRocketObject.add(arcRocketMesh),
    (arcRocketObject.visible = !1),
    (arcRocketCreated = !0),
    (arcRocketAnimation = new TimelineMax({
      paused: !0,
      repeat: -1,
      onUpdate: function () {
        renderArcsRocket();
      },
    })),
    arcRocketAnimation.staggerTo(
      arcRocketDetailsArray,
      0.25,
      {
        alpha: 0,
      },
      0.025,
      2
    ),
    arcRocketAnimation.staggerFromTo(
      arcRocketDetailsArray,
      0.25,
      {
        alpha: 0,
      },
      {
        alpha: 1,
      },
      0.025,
      0
    ),
    arcRocketAnimation.timeScale(2),
    e && e();
}

function renderArcsRocket() {
  if (arcRocketCreated) {
    for (
      var e, a = arcRocketBufferGeometry.attributes, t = 0;
      t < arcRocketDetailsArray.length;
      t++
    )
      (e = arcRocketDetailsArray[t]), (a.alpha.array[t] = e.alpha);
    a.alpha.needsUpdate = !0;
  }
}
var arcSnakeObject,
  arcSnakeBufferGeometry,
  arcSnakeShaderUniforms,
  arcSnakeShaderMaterial,
  arcSnakeMesh,
  arcSnakeAnimation,
  arcSnakeDetailsArray = [],
  arcSnakeVerticesArray = [],
  arcSnakeCreated = !1;

function createArcsSnake(e) {
  for (
    arcSnakeObject = new THREE.Group(),
      arcSnakeObject.name = "arcsSnake",
      c = 0;
    c < dataMap.length - 1;
    c++
  ) {
    var a = latLongToVector3(
        dataMap[c][2],
        dataMap[c][3],
        globeRadius,
        globeExtraDistance
      ),
      t = latLongToVector3(
        dataMap[c + 1][2],
        dataMap[c + 1][3],
        globeRadius,
        globeExtraDistance
      ),
      o = 1 + 0.0065 * checkDistance(a, t),
      n = new THREE.Vector3();
    n.addVectors(a, t), n.normalize().multiplyScalar(globeRadius * o);
    var r = 1 + 0.0065 * checkDistance(a, n),
      s = new THREE.Vector3();
    s.addVectors(a, n), s.normalize().multiplyScalar(globeRadius * r);
    var l = new THREE.Vector3();
    l.addVectors(n, t), l.normalize().multiplyScalar(globeRadius * r);
    for (
      var d = new THREE.CubicBezierCurve3(a, s, l, t),
        A = d.getPoints(lineBufferDivisions),
        p = 0;
      p < lineBufferDivisions;
      p++
    )
      arcSnakeVerticesArray.push(A[p]),
        arcSnakeDetailsArray.push({
          alpha: 0,
        });
  }
  (arcSnakeBufferGeometry = new THREE.BufferGeometry()),
    (arcSnakeShaderUniforms = {
      color: {
        value: colorHighlight,
      },
      fogColor: {
        type: "c",
        value: scene.fog.color,
      },
      fogNear: {
        type: "f",
        value: scene.fog.near,
      },
      fogFar: {
        type: "f",
        value: scene.fog.far,
      },
    }),
    (arcSnakeShaderMaterial = new THREE.ShaderMaterial({
      uniforms: arcSnakeShaderUniforms,
      vertexShader: document.getElementById("line_vertexshader").textContent,
      fragmentShader: document.getElementById("line_fragmentshader")
        .textContent,
      blending: THREE.AdditiveBlending,
      depthTest: !1,
      fog: !0,
      transparent: !0,
    }));
  for (
    var m = new Float32Array(3 * arcSnakeVerticesArray.length),
      u = new Float32Array(arcSnakeVerticesArray.length),
      c = 0;
    c < arcSnakeVerticesArray.length;
    c++
  )
    (m[3 * c] = arcSnakeVerticesArray[c].x),
      (m[3 * c + 1] = arcSnakeVerticesArray[c].y),
      (m[3 * c + 2] = arcSnakeVerticesArray[c].z),
      (u[c] = 0);
  for (
    arcSnakeBufferGeometry.addAttribute(
      "position",
      new THREE.BufferAttribute(m, 3)
    ),
      arcSnakeBufferGeometry.addAttribute(
        "alpha",
        new THREE.BufferAttribute(u, 1)
      ),
      arcSnakeMesh = new THREE.Line(
        arcSnakeBufferGeometry,
        arcSnakeShaderMaterial
      ),
      arcSnakeObject.add(arcSnakeMesh),
      earthObject.add(arcSnakeObject),
      arcSnakeCreated = !0,
      arcSnakeAnimation = new TimelineMax({
        paused: !0,
        delay: 2,
        repeat: -1,
        onUpdate: function () {
          renderArcsSnake();
        },
      }),
      c = 0;
    c < dotSpritesHoverArray.length;
    c++
  ) {
    var S = dotSpritesHoverArray[c];
    arcSnakeAnimation.fromTo(
      S.scale,
      1,
      {
        x: 2,
        y: 2,
      },
      {
        x: 10,
        y: 10,
        ease: Expo.easeOut,
      },
      0.025 * lineBufferDivisions * c
    ),
      arcSnakeAnimation.fromTo(
        S.material,
        1.5,
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
        0.025 * lineBufferDivisions * c
      ),
      arcSnakeAnimation.fromTo(
        S,
        1.5,
        {},
        {
          onStart: function () {
            this.target.visible = !0;
          },
          onComplete: function () {
            this.target.visible = !1;
          },
        },
        0.025 * lineBufferDivisions * c
      );
  }
  arcSnakeAnimation.staggerTo(
    arcSnakeDetailsArray,
    0.25,
    {
      alpha: 0,
    },
    0.025,
    2
  ),
    arcSnakeAnimation.staggerFromTo(
      arcSnakeDetailsArray,
      0.25,
      {
        alpha: 0,
      },
      {
        alpha: 1,
      },
      0.025,
      0
    ),
    e && e();
}

function renderArcsSnake() {
  if (arcSnakeCreated) {
    for (
      var e, a = arcSnakeBufferGeometry.attributes, t = 0;
      t < arcSnakeDetailsArray.length;
      t++
    )
      (e = arcSnakeDetailsArray[t]), (a.alpha.array[t] = e.alpha);
    a.alpha.needsUpdate = !0;
  }
}
var arcAllObject,
  arcAllBufferGeometry,
  arcAllMaterial,
  arcAllMesh,
  arcAllAnimation,
  arcAllsVerticesArray = [],
  arcAllCreated = !1;

function createArcsAll(e) {
  for (
    arcAllObject = new THREE.Group(), arcAllObject.name = "arcsAll", u = 0;
    u < dataMap.length - 1;
    u++
  ) {
    var a = latLongToVector3(
        dataMap[0][2],
        dataMap[0][3],
        globeRadius,
        globeExtraDistance
      ),
      t = latLongToVector3(
        dataMap[u + 1][2],
        dataMap[u + 1][3],
        globeRadius,
        globeExtraDistance
      ),
      o = 1 + 0.005 * checkDistance(a, t),
      n = new THREE.Vector3();
    n.addVectors(a, t), n.normalize().multiplyScalar(globeRadius * o);
    var r = 1 + 0.005 * checkDistance(a, n),
      s = new THREE.Vector3();
    s.addVectors(a, n), s.normalize().multiplyScalar(globeRadius * r);
    var l = new THREE.Vector3();
    l.addVectors(n, t), l.normalize().multiplyScalar(globeRadius * r);
    for (
      var d = new THREE.CubicBezierCurve3(a, s, l, t),
        A = d.getPoints(lineBufferDivisions),
        p = 0;
      p < lineBufferDivisions;
      p++
    )
      arcAllsVerticesArray.push(A[p]), arcAllsVerticesArray.push(A[p + 1]);
  }
  arcAllMaterial = new THREE.LineBasicMaterial({
    linewidth: 1,
    color: colorHighlight,
    transparent: !0,
    blending: THREE.AdditiveBlending,
    fog: !0,
    depthWrite: !1,
  });
  for (
    var m = new Float32Array(3 * arcAllsVerticesArray.length), u = 0;
    u < arcAllsVerticesArray.length;
    u++
  )
    (m[3 * u] = arcAllsVerticesArray[u].x),
      (m[3 * u + 1] = arcAllsVerticesArray[u].y),
      (m[3 * u + 2] = arcAllsVerticesArray[u].z);
  (arcAllBufferGeometry = new THREE.BufferGeometry()),
    arcAllBufferGeometry.addAttribute(
      "position",
      new THREE.BufferAttribute(m, 3)
    ),
    (arcAllMesh = new THREE.LineSegments(arcAllBufferGeometry, arcAllMaterial)),
    arcAllObject.add(arcAllMesh),
    (arcAllObject.visible = !1),
    (arcAllAnimation = new TimelineMax({
      paused: !0,
    })),
    arcAllAnimation.fromTo(
      arcAllMesh.material,
      2,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      0
    ),
    arcAllAnimation.timeScale(1),
    (arcAllCreated = !0),
    e && e();
}
var spikesObject,
  spikesBufferGeometry,
  spikesMaterial,
  spikesMesh,
  spikeRadius = 95,
  spikesVerticesArray = [],
  spikesCreated = !1;

function createSpikes(e) {
  (spikesObject = new THREE.Group()),
    (spikesObject.name = "spikesObject"),
    rotationObject.add(spikesObject);
  var a = new THREE.SphereGeometry(105, 8, 4);
  for (a.mergeVertices(), s = 0; s < a.vertices.length; s++) {
    var t = new THREE.Vector3();
    (t.x = a.vertices[s].x),
      (t.y = a.vertices[s].y),
      (t.z = a.vertices[s].z),
      t.normalize(),
      t.multiplyScalar(105);
    var o = t.clone();
    o.multiplyScalar(1.03),
      spikesVerticesArray.push(t),
      spikesVerticesArray.push(o);
  }
  var n = (2 * Math.PI) / 400;
  for (s = 0; s < 400; s++) {
    var t = new THREE.Vector3();
    (t.x = spikeRadius * Math.cos(n * s)),
      (t.y = 0),
      (t.z = spikeRadius * Math.sin(n * s)),
      t.normalize(),
      t.multiplyScalar(spikeRadius);
    var o = t.clone();
    1 == s % 10 ? o.multiplyScalar(1.02) : o.multiplyScalar(1.01),
      spikesVerticesArray.push(t),
      spikesVerticesArray.push(o);
  }
  for (
    var r = new Float32Array(3 * spikesVerticesArray.length), s = 0;
    s < spikesVerticesArray.length;
    s++
  )
    (r[3 * s] = spikesVerticesArray[s].x),
      (r[3 * s + 1] = spikesVerticesArray[s].y),
      (r[3 * s + 2] = spikesVerticesArray[s].z);
  (spikesMaterial = new THREE.LineBasicMaterial({
    linewidth: 1,
    color: colorBase50,
    transparent: !0,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: !0,
    depthWrite: !1,
  })),
    (spikesBufferGeometry = new THREE.BufferGeometry()),
    spikesBufferGeometry.addAttribute(
      "position",
      new THREE.BufferAttribute(r, 3)
    ),
    (spikesMesh = new THREE.LineSegments(spikesBufferGeometry, spikesMaterial)),
    spikesObject.add(spikesMesh),
    (spikesCreated = !0),
    e && e();
}
var ringPulseObject,
  ringPulseBufferGeometry,
  ringPulsetShaderUniforms,
  ringPulseShaderMaterial,
  ringPulseMesh,
  ringExplosionTexture,
  ringExplosionMaterial,
  ringExplosionBufferGeometry,
  ringExplosionMesh,
  ringPointGeometry,
  ringPointMaterial,
  ringPointMesh,
  ringPulseTotal = 250,
  ringPulseTotalHalf = 125,
  ringPulseAngle = (2 * Math.PI) / 250,
  ringPulseRadius = 90,
  ringPulseVerticesArray = [],
  ringExplosionSize = 100,
  ringPointRadius = 85,
  ringPointTotal = 250,
  ringPointAngle = (2 * Math.PI) / 250,
  ringPointSize = 0.5,
  ringPulseCreated = !1;

function createRingPulse(e) {
  for (
    ringPulseObject = new THREE.Group(),
      ringPulseObject.name = "ringPulse",
      r = 0;
    r < ringPulseTotal;
    r++
  ) {
    var a = new THREE.Vector3();
    (a.x = ringPulseRadius * Math.cos(ringPulseAngle * r)),
      (a.y = 0),
      (a.z = ringPulseRadius * Math.sin(ringPulseAngle * r)),
      a.normalize(),
      a.multiplyScalar(ringPulseRadius),
      ringPulseVerticesArray.push(a);
  }
  (ringPulseBufferGeometry = new THREE.BufferGeometry()),
    (ringPulseShaderUniforms = {
      color: {
        value: colorBase,
      },
      fogColor: {
        type: "c",
        value: scene.fog.color,
      },
      fogNear: {
        type: "f",
        value: scene.fog.near,
      },
      fogFar: {
        type: "f",
        value: scene.fog.far,
      },
    }),
    (ringPulseShaderMaterial = new THREE.ShaderMaterial({
      uniforms: ringPulseShaderUniforms,
      vertexShader: document.getElementById("line_vertexshader").textContent,
      fragmentShader: document.getElementById("line_fragmentshader")
        .textContent,
      blending: THREE.AdditiveBlending,
      depthTest: !1,
      fog: !0,
      transparent: !0,
    }));
  for (
    var t = new Float32Array(3 * ringPulseVerticesArray.length),
      o = new Float32Array(ringPulseVerticesArray.length),
      n = 0.5,
      r = 0;
    r < ringPulseVerticesArray.length;
    r++
  ) {
    (t[3 * r] = ringPulseVerticesArray[r].x),
      (t[3 * r + 1] = ringPulseVerticesArray[r].y),
      (t[3 * r + 2] = ringPulseVerticesArray[r].z);
    var s = 0,
      l = ringPulseTotalHalf / 2;
    r < ringPulseTotalHalf &&
      (r < l ? (s = (r / l) * n) : (s = 1 - (r / l) * n)),
      (o[r] = s);
  }
  for (
    ringPulseBufferGeometry.addAttribute(
      "position",
      new THREE.BufferAttribute(t, 3)
    ),
      ringPulseBufferGeometry.addAttribute(
        "alpha",
        new THREE.BufferAttribute(o, 1)
      ),
      ringPulseMesh = new THREE.LineLoop(
        ringPulseBufferGeometry,
        ringPulseShaderMaterial
      ),
      ringPulseObject.add(ringPulseMesh),
      rotationObject.add(ringPulseObject),
      ringExplosionTexture = new THREE.TextureLoader().load(
        "/img/ring_explosion.jpeg"
      ),
      ringExplosionBufferGeometry = new THREE.PlaneBufferGeometry(
        ringExplosionSize,
        ringExplosionSize,
        1,
        1
      ),
      ringExplosionMaterial = new THREE.MeshBasicMaterial({
        map: ringExplosionTexture,
        color: colorBase85,
        transparent: !0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: !1,
      }),
      ringExplosionMesh = new THREE.Mesh(
        ringExplosionBufferGeometry,
        ringExplosionMaterial
      ),
      ringExplosionMesh.rotation.x = 90 * toRAD,
      ringExplosionMesh.name = "ringExplosionMesh",
      ringExplosionMesh.visible = !1,
      rotationObject.add(ringExplosionMesh),
      ringPointGeometry = new THREE.Geometry(),
      r = 0;
    r < ringPointTotal;
    r++
  ) {
    var a = new THREE.Vector3();
    (a.x = ringPointRadius * Math.cos(ringPointAngle * r)),
      (a.y = 0),
      (a.z = ringPointRadius * Math.sin(ringPointAngle * r)),
      ringPointGeometry.vertices.push(a);
  }
  (ringPointMaterial = new THREE.PointsMaterial({
    size: ringPointSize,
    color: colorBase75,
    transparent: !0,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: !1,
  })),
    (ringPointMesh = new THREE.Points(ringPointGeometry, ringPointMaterial)),
    (ringPointMesh.sortParticles = !0),
    rotationObject.add(ringPointMesh),
    (ringPulseCreated = !0),
    e && e();
}

function renderRingPulse() {
  ringPulseObject.rotation.y += 0.025;
}

var rainObject,
  rainCloud,
  rainGeometry,
  rainShaderMaterial,
  rainShaderUniforms,
  rainSize = 5,
  rainParticlesTotal = 50,
  rainRingRadius = 40,
  rainBuffer = 50,
  rainMaxDistance = 100,
  rainFadeDistance = 15,
  rainVelocityFactor = 0.0016,
  rainDetails = [],
  rainCreated = !1;

function createRain(e) {
  (rainObject = new THREE.Group()),
    (rainObject.name = "rainObject"),
    scene.add(rainObject),
    (rainGeometry = new THREE.BufferGeometry()),
    (rainShaderUniforms = {
      color: {
        value: colorBase,
      },
      texture: {
        value: new THREE.TextureLoader().load("/img/dot-inverted.png"),
      },
    }),
    (rainShaderMaterial = new THREE.ShaderMaterial({
      uniforms: rainShaderUniforms,
      vertexShader: document.getElementById("particle_vertexshader")
        .textContent,
      fragmentShader: document.getElementById("particle_fragmentshader")
        .textContent,
      transparent: !0,
      blending: THREE.AdditiveBlending,
      depthTest: !1,
    }));
  for (
    var a = new Float32Array(150),
      t = new Float32Array(150),
      o = new Float32Array(rainParticlesTotal),
      n = (2 * Math.PI) / rainParticlesTotal,
      r = 0,
      s = 0;
    r < rainParticlesTotal;
    r++, s += 3
  ) {
    var l = Math.random() * rainRingRadius,
      d = new THREE.Vector3();
    (d.x = l * Math.cos(n * r)),
      (d.y = Math.random() * rainMaxDistance),
      (d.z = l * Math.sin(n * r));
    var A = 150,
      p = Math.random() * rainSize,
      m = 1 * Math.random(),
      u = (rainMaxDistance - d.y) / rainMaxDistance;
    d.y += rainBuffer;
    var c = rainBuffer;
    0 == r % 2 && ((d.y = -d.y), (c = -c), (A = -A)),
      (a[s + 0] = d.x),
      (a[s + 1] = d.y),
      (a[s + 2] = d.z),
      (o[r] = p),
      (t[r] = 1),
      rainDetails.push({
        origin: new THREE.Vector3(d.x, c, d.z),
        current: new THREE.Vector3(d.x, d.y, d.z),
        destination: new THREE.Vector3(d.x, A, d.z),
        size: p,
        alpha: m,
        velocity: (1 - u) * 2,
      });
  }
  rainGeometry.addAttribute("position", new THREE.BufferAttribute(a, 3)),
    rainGeometry.addAttribute("size", new THREE.BufferAttribute(o, 1)),
    rainGeometry.addAttribute("alpha", new THREE.BufferAttribute(t, 1)),
    (rainCloud = new THREE.Points(rainGeometry, rainShaderMaterial)),
    rainObject.add(rainCloud),
    (rainCreated = !0),
    e && e();
}

function renderRain() {
  rainObject.rotation.y += rainObject.rotation.z + 0.0075;
  for (
    var e, a = rainGeometry.attributes, t = 0, o = 0;
    t < rainDetails.length;
    t++, o += 3
  )
    (e = rainDetails[t]),
      (e.velocity += rainVelocityFactor),
      0 < e.current.y
        ? (e.current.y > e.destination.y &&
            ((e.current.y = rainBuffer), (e.velocity = 0)),
          (e.current.y += e.velocity))
        : 0 > e.current.y &&
          (e.current.y < e.destination.y &&
            ((e.current.y = e.origin.y), (e.velocity = 0)),
          (e.current.y -= e.velocity)),
      (a.position.array[o + 1] = e.current.y),
      0 < e.current.y
        ? (e.alpha =
            (e.current.y - rainBuffer) /
            (e.origin.y - rainBuffer + rainFadeDistance))
        : 0 > e.current.y &&
          (e.alpha =
            (e.current.y + rainBuffer) /
            (e.origin.y + rainBuffer - rainFadeDistance)),
      1 < e.alpha && (e.alpha = 1),
      (a.alpha.array[t] = e.alpha),
      (a.size.array[t] = e.size * e.alpha);
  (a.position.needsUpdate = !0),
    (a.alpha.needsUpdate = !0),
    (a.size.needsUpdate = !0);
}

function checkDistance(e, a) {
  return Math.sqrt(
    (a.x - e.x) * (a.x - e.x) +
      (a.y - e.y) * (a.y - e.y) +
      (a.z - e.z) * (a.z - e.z)
  );
}

function latLongToVector3(e, a, t, i) {
  var o = (e * Math.PI) / 180,
    n = ((a - 180) * Math.PI) / 180,
    r = -(t + i) * Math.cos(o) * Math.cos(n),
    s = (t + i) * Math.sin(o),
    l = (t + i) * Math.cos(o) * Math.sin(n);
  return new THREE.Vector3(r, s, l);
}

function animate() {
  requestAnimationFrame(animate), render();
}
var cameraDirection = "left",
  cameraTarget = "auto",
  rotationSpeed = {
    value: 0.001,
  },
  dragSpeed = 0.1,
  dragZone = 50,
  dragSpeedSlowZone = 90 + dragZone;

function render() {
  if (
    (renderer.render(scene, camera),
    isGlobeEventsEnabled &&
      (targetCameraZ < globeMaxZoom && (targetCameraZ = globeMaxZoom),
      targetCameraZ > globeMinZoom && (targetCameraZ = globeMinZoom),
      (camera.position.z = camera.position.z +=
        0.01 * (targetCameraZ - camera.position.z))),
    targetCameraZ < dragSpeedSlowZone && (dragSpeed = 0.025),
    isGlobeRotated &&
      (targetRotationX > 75 * toRAD && (targetRotationX = 75 * toRAD),
      targetRotationX < -75 * toRAD && (targetRotationX = -75 * toRAD),
      (rotationObject.rotation.x = rotationObject.rotation.x +=
        (targetRotationX - rotationObject.rotation.x) * dragSpeed),
      (rotationObject.rotation.y = rotationObject.rotation.y +=
        (targetRotationY - rotationObject.rotation.y) * dragSpeed)),
    "auto" == cameraTarget && isGlobeRotated)
  )
    if (isMouseDown || isParticleHit || isMediaHit);
    else
      "left" === cameraDirection
        ? (targetRotationY += rotationSpeed.value)
        : "right" === cameraDirection
        ? (targetRotationY -= rotationSpeed.value)
        : void 0;
  globeCreated && renderGlobe(),
    dotsCreated && renderDots(),
    starsCreated && renderStars(),
    ringPulseCreated && renderRingPulse(),
    rainCreated && renderRain(),
    ringsCreated && renderRings();
}

function resetAnimations() {
  if (
    ((lineStepStarted = 0),
    (lineStepCompleted = 0),
    scene.getObjectByName("arcsRocket"))
  ) {
    for (
      var e = arcRocketBufferGeometry.attributes, a = 0;
      a < arcRocketDetailsArray.length;
      a++
    )
      e.alpha.array[a] = 0;
    (e.alpha.needsUpdate = !0),
      arcRocketAnimation.pause(0),
      (arcRocketObject.visible = !1),
      earthObject.remove(arcRocketObject);
  }
  if (scene.getObjectByName("arcsSnake")) {
    for (
      var e = arcSnakeBufferGeometry.attributes, a = 0;
      a < arcSnakeDetailsArray.length;
      a++
    )
      e.alpha.array[a] = 0;
    (e.alpha.needsUpdate = !0),
      arcSnakeAnimation.pause(0),
      (arcSnakeObject.visible = !1),
      earthObject.remove(arcSnakeObject);
  }
  scene.getObjectByName("arcsAll") &&
    (arcAllAnimation.pause(0),
    (arcAllObject.visible = !1),
    earthObject.remove(arcAllObject));
}

var currentAnimationType = "";

function setArcAnimation(e) {
  switch (
    (arcRocketCreated || createArcsRocket(),
    arcSnakeCreated || createArcsSnake(),
    arcAllCreated || createArcsAll(),
    currentAnimationType === e && (e = "off"),
    (currentAnimationType = e),
    resetAnimations(),
    e)
  ) {
    case "rocket":
      earthObject.add(arcRocketObject),
        (arcRocketObject.visible = !0),
        arcRocketAnimation.play(0);
      break;
    case "snake":
      earthObject.add(arcSnakeObject),
        (arcSnakeObject.visible = !0),
        arcSnakeAnimation.play(0);
      break;
    case "all":
      arcAllAnimation.play(0),
        earthObject.add(arcAllObject),
        (arcAllObject.visible = !0);
      break;
    case "off":
  }
}

function shadeBlend(e, a, i) {
  var o = 0 > e ? -1 * e : e,
    n = Math.round,
    r = parseInt;
  if (7 < a.length) {
    var s = a.split(","),
      l = (i ? i : 0 > e ? "rgb(0,0,0)" : "rgb(255,255,255)").split(","),
      d = r(s[0].slice(4)),
      A = r(s[1]),
      p = r(s[2]);
    return (
      "rgb(" +
      (n((r(l[0].slice(4)) - d) * o) + d) +
      "," +
      (n((r(l[1]) - A) * o) + A) +
      "," +
      (n((r(l[2]) - p) * o) + p) +
      ")"
    );
  }
  var s = r(a.slice(1), 16),
    l = r((i ? i : 0 > e ? "#000000" : "#FFFFFF").slice(1), 16),
    m = s >> 16,
    u = 255 & (s >> 8),
    c = 255 & s;
  return (
    "#" +
    (
      16777216 +
      65536 * (n(((l >> 16) - m) * o) + m) +
      256 * (n(((255 & (l >> 8)) - u) * o) + u) +
      (n(((255 & l) - c) * o) + c)
    )
      .toString(16)
      .slice(1)
  );
}

function generateRandomNumber(e, a) {
  var t = Math.floor(Math.random() * (a - e + 1)) + e;
  return t;
}

function onWindowResize() {
  var e = window.innerWidth,
    a = window.innerHeight;
  (camera.aspect = e / a),
    camera.updateProjectionMatrix(),
    renderer.setSize(e, a);
}

function onMouseWheel(e) {
  e.preventDefault(), (targetCameraZ -= 0.05 * e.wheelDeltaY);
}

function onDocumentMouseDown(e) {
  !1 === isGlobeEventsEnabled ||
    (e.preventDefault(),
    (isMouseDown = !0),
    (mouseXOnMouseDown = e.clientX - windowHalfX),
    (mouseYOnMouseDown = e.clientY - windowHalfY),
    (targetRotationXOnMouseDown = targetRotationX),
    (targetRotationYOnMouseDown = targetRotationY),
    (initMouseX = e.clientX));
}
var targetTiltX = 0,
  targetTiltY = 0;

function onDocumentMouseMove(e) {
  if (!1 !== isGlobeEventsEnabled) {
    (isMouseMoved = !0),
      (clientMouseX = e.clientX),
      (clientMouseY = e.clientY),
      isParticleHit &&
        (clientMouseX > window.innerWidth - 250
          ? TweenMax.set("#tooltip", {
              left: "auto",
              right: window.innerWidth - clientMouseX + 35,
              top: clientMouseY,
            })
          : TweenMax.set("#tooltip", {
              right: "auto",
              left: clientMouseX + 35,
              top: clientMouseY,
            })),
      isMediaHit &&
        (clientMouseX > window.innerWidth - 250
          ? TweenMax.set("#tooltip", {
              left: "auto",
              right: window.innerWidth - clientMouseX + 35,
              top: clientMouseY,
            })
          : TweenMax.set("#tooltip", {
              right: "auto",
              left: clientMouseX + 35,
              top: clientMouseY,
            })),
      (mouse.x = 2 * (e.clientX / window.innerWidth) - 1),
      (mouse.y = 2 * -(e.clientY / window.innerHeight) + 1),
      isMouseDown &&
        ((isGlobeRotated = !0),
        (mouseX = e.clientX - windowHalfX),
        (mouseY = e.clientY - windowHalfY),
        (targetRotationX =
          targetRotationXOnMouseDown + 0.0025 * (mouseY - mouseYOnMouseDown)),
        (targetRotationY =
          targetRotationYOnMouseDown + 0.0025 * (mouseX - mouseXOnMouseDown)));
    var a = 0.5 * window.innerWidth,
      t = 0.5 * window.innerHeight;
    (targetTiltY = 0.005 * ((e.clientX - a) / a)),
      (targetTiltX = 0.01 * ((e.clientY - t) / t));
  }
}

function onDocumentMouseUp(e) {
  !1 !== isGlobeEventsEnabled &&
    (e.preventDefault(),
    (isMouseDown = !1),
    25 > Math.abs(initMouseX - e.clientX) ||
      setCameraDirection(initMouseX, e.clientX));
}

function onDocumentMouseLeave(e) {
  if (!1 !== isGlobeEventsEnabled && (e.preventDefault(), isMouseDown)) {
    if (((isMouseDown = !1), 25 > Math.abs(initMouseX - e.clientX))) return;
    setCameraDirection(initMouseX, e.clientX);
  }
}

function setCameraDirection(e, a) {
  cameraDirection = e > a ? "right" : "left";
}
var _touchZoomDistanceStart, _touchZoomDistanceEnd;

function onDocumentTouchStart(e) {
  if (
    !1 !== isGlobeEventsEnabled &&
    (1 == e.touches.length &&
      (e.preventDefault(),
      (isMouseDown = !0),
      (mouseXOnMouseDown = e.touches[0].pageX - windowHalfX),
      (mouseYOnMouseDown = e.touches[0].pageY - windowHalfY),
      (targetRotationXOnMouseDown = targetRotationX),
      (targetRotationYOnMouseDown = targetRotationY)),
    1 < e.touches.length)
  ) {
    var a = e.touches[0].pageX - e.touches[1].pageX,
      t = e.touches[0].pageY - e.touches[1].pageY;
    _touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(a * a + t * t);
  }
}

function onDocumentTouchMove(e) {
  if (
    !1 !== isGlobeEventsEnabled &&
    (1 == e.touches.length &&
      (e.preventDefault(),
      isMouseDown &&
        ((isGlobeRotated = !0),
        (mouseX = mouseX = e.touches[0].pageX - windowHalfX),
        (mouseY = mouseY = e.touches[0].pageY - windowHalfY),
        140 > targetCameraZ
          ? ((targetRotationX =
              targetRotationXOnMouseDown +
              0.001 * (mouseY - mouseYOnMouseDown)),
            (targetRotationY =
              targetRotationYOnMouseDown +
              0.001 * (mouseX - mouseXOnMouseDown)))
          : ((targetRotationX =
              targetRotationXOnMouseDown + 0.01 * (mouseY - mouseYOnMouseDown)),
            (targetRotationY =
              targetRotationYOnMouseDown +
              0.01 * (mouseX - mouseXOnMouseDown))))),
    1 < e.touches.length)
  ) {
    var a = e.touches[0].pageX - e.touches[1].pageX,
      t = e.touches[0].pageY - e.touches[1].pageY;
    _touchZoomDistanceEnd = Math.sqrt(a * a + t * t);
    var i = _touchZoomDistanceStart / _touchZoomDistanceEnd;
    _touchZoomDistanceEnd > _touchZoomDistanceStart
      ? (targetCameraZ -= 5 * i)
      : (targetCameraZ += 5 * i),
      (_touchZoomDistanceStart = _touchZoomDistanceEnd);
  }
}

function onDocumentTouchEnd(e) {
  (_touchZoomDistanceStart = _touchZoomDistanceEnd = 0), onDocumentMouseUp(e);
}
var dataMap = [
  /*номер, соединение, вверх(прибаляя), влево(прибаляя) начало координат */
  [1, 1, 33.75, -118, "Tivan Main Base, Tivan", "mainBase"],
  [2, 1, 0, 0, "The Artifact Laboratory, Tivan", "Labs"],
  [3, 1, 21.4, -157.81, "The Gallery facility, Tivan", "Gallery"],
  [4, 1, 31.46, -97.85, "The Arena facility, Tivan", "Arena"],
  [5, 1, 40, -82, "The Monolit Bank, Tivan", "Bank"],
  [6, 1, 52, -115.85, "The Market, Tivan", "Market"],
  [7, 1, 60, 60, "News"],
];

document.addEventListener("DOMContentLoaded", function () {
  //do work
  initWebgl();
});
