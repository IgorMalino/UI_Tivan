var container,
  camera,
  scene,
  renderer,
  stats,
  statsCreated,
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
  debugger;
  //   setupDeviceSettings();
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
      fn: createMedia,
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
      fn: createMinimapBg,
      vars: [stepComplete],
    },
    {
      fn: createGlitch,
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
  ]);

  renderer = new THREE.WebGLRenderer({
    antialias: !0,
    alpha: !1,
  });

  renderer.setSize(e, a);
  renderer.setClearColor(0, 1);

  container = document.getElementById("interactive");
  container.appendChild(renderer.domElement);
  // $("body").click(function () {
  //   soundIsOn || initAudio();
  // }),
  animate();
}
var preloaderAnimationIn,
  preloaderAnimationOut,
  preloaderSplitText,
  preloaderSplitTextWordTotal,
  introAnimation,
  preloaderAnimationInComplete = !1,
  preloaderArray = [],
  preloaderComplete = !1,
  preloaderLoaded = 0,
  preloaderTotal = 0,
  isIntroDone = !1;

function createPreloader(e) {
  preloaderAnimationIn = new TimelineMax({
    paused: !0,
    delay: 0.25,
    onComplete: function () {
      preloaderAnimationInComplete = !0;
      startPreloader();
    },
  });

  preloaderAnimationIn.timeScale(1);
  preloaderAnimationIn.play(0);
  e && e();
}

function startPreloader() {
  checkPreloader();
}

function checkPreloader() {
  preloaderComplete = !0;

  finishPreloader();
  initExperience();
}

function finishPreloader() {
  preloaderAnimationOut = new TimelineMax({
    paused: !0,
    onComplete: function () {
      debugger;
      playIntro();
    },
  });

  preloaderAnimationOut.timeScale(1), preloaderAnimationOut.play(0);
}

var arrayExecuter = new ArrayExecuter(),
  stepComplete = arrayExecuter.stepComplete_instant.bind(arrayExecuter);

function initExperience() {
  document
    .getElementById("interactive")
    .addEventListener("mousedown", onDocumentMouseDown, !1),
    document
      .getElementById("interactive")
      .addEventListener("mousemove", onDocumentMouseMove, !1),
    document
      .getElementById("interactive")
      .addEventListener("mouseup", onDocumentMouseUp, !1),
    document
      .getElementById("interactive")
      .addEventListener("mouseleave", onDocumentMouseLeave, !1),
    document
      .getElementById("interactive")
      .addEventListener("touchstart", onDocumentTouchStart, !1),
    document
      .getElementById("interactive")
      .addEventListener("touchmove", onDocumentTouchMove, !1),
    document
      .getElementById("interactive")
      .addEventListener("touchend", onDocumentTouchEnd, !1),
    document
      .getElementById("interactive")
      .addEventListener("mousewheel", onMouseWheel, !1),
    document.addEventListener("gesturestart", function (a) {
      a.preventDefault();
    }),
    window.addEventListener("resize", onWindowResize, !1),
    onWindowResize(),
    initButtons();
}

function playIntro() {
  debugger;

  isGlobeRotated = !0;
  isGlobeEventsEnabled = !0;

  TweenMax.set("#ui svg", {
    rotation: -90,
    transformOrigin: "center center",
  });
  TweenMax.set("#bracket-left", {
    drawSVG: "20% 30%",
  });
  TweenMax.set("#bracket-right", {
    drawSVG: "70% 80%",
  });
  introAnimation = new TimelineMax({
    paused: !0,
    force3D: !0,
    onComplete: function () {
      isIntroDone = !0;
    },
  });
  introAnimation.fromTo(
    "#preloader",
    2,
    {
      autoAlpha: 1,
    },
    {
      autoAlpha: 0,
      ease: Linear.easeNone,
    },
    0
  );
  introAnimation.staggerFromTo(
    "#header .animate",
    2,
    {
      y: -75,
    },
    {
      y: 0,
      ease: Expo.easeInOut,
    },
    -0.1,
    1
  );
  introAnimation.fromTo(
    "#nav-left a",
    2,
    {
      x: 100,
      autoAlpha: 0,
    },
    {
      x: 0,
      autoAlpha: 1,
      ease: Expo.easeInOut,
    },
    0.1,
    2
  );
  introAnimation.fromTo(
    "#nav-right a",
    2,
    {
      x: -100,
      autoAlpha: 0,
    },
    {
      x: 0,
      autoAlpha: 1,
      ease: Expo.easeInOut,
    },
    0.1,
    2
  );
  introAnimation.staggerFromTo(
    "#arcMode .optionitem",
    2,
    {
      x: -150,
      autoAlpha: 0,
    },
    {
      x: 0,
      autoAlpha: 1,
      ease: Expo.easeOut,
    },
    -0.1,
    1.5
  );
  introAnimation.staggerFromTo(
    "#colorMode .optionitem",
    2,
    {
      x: 150,
      autoAlpha: 0,
    },
    {
      x: 0,
      autoAlpha: 1,
      ease: Expo.easeOut,
    },
    0.1,
    1.5
  );
  introAnimation.fromTo(
    ".category",
    2,
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
    },
    2
  );
  introAnimation.fromTo(
    "#minimapBackground",
    1,
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
    },
    1
  );
  introAnimation.fromTo(
    "#minimap",
    2,
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
    },
    2
  );
  introAnimation.fromTo(
    "#palette",
    2,
    {
      y: 50,
      autoAlpha: 0,
    },
    {
      y: 0,
      autoAlpha: 1,
      ease: Expo.easeOut,
    },
    1.25
  );
  introAnimation.fromTo(
    "#soundButton",
    2,
    {
      x: -50,
      autoAlpha: 0,
    },
    {
      x: 0,
      autoAlpha: 1,
      ease: Expo.easeOut,
    },
    1.75
  );
  introAnimation.fromTo(
    "#rotationMode",
    2,
    {
      x: 50,
      autoAlpha: 0,
    },
    {
      x: 0,
      autoAlpha: 1,
      ease: Expo.easeOut,
    },
    1.75
  );

  introAnimation.timeScale(1);
  introAnimation.play();

  var e = new TimelineMax({
    paused: !0,
    delay: 3,
  });
  e.fromTo(
    minimapSpiral,
    1,
    {
      pixi: {
        alpha: 0,
      },
    },
    {
      pixi: {
        alpha: 1,
      },
      ease: Linear.easeNone,
    },
    0
  ),
    e.fromTo(
      minimapDetails,
      1,
      {
        pixi: {
          alpha: 0,
        },
      },
      {
        pixi: {
          alpha: 1,
        },
        ease: Linear.easeNone,
      },
      0
    ),
    e.fromTo(
      minimapLines,
      1,
      {
        pixi: {
          alpha: 0,
        },
      },
      {
        pixi: {
          alpha: 1,
        },
        ease: Linear.easeNone,
      },
      0
    ),
    e.to(
      minimapDetails,
      1,
      {
        pixi: {
          tint: colorPrimary,
        },
      },
      3
    ),
    e.fromTo(
      minimapLines,
      2,
      {
        pixi: {
          tint: 16777215,
        },
      },
      {
        pixi: {
          tint: colorPrimary,
        },
        ease: Linear.easeNone,
      },
      0
    ),
    e.fromTo(
      minimapMaskGradient,
      2,
      {
        pixi: {
          scaleX: 0,
        },
      },
      {
        pixi: {
          scaleX: 1.25,
        },
        ease: Expo.easeOut,
      },
      0
    ),
    e.fromTo(
      minimapSpiral,
      2,
      {
        pixi: {
          rotation: 90,
        },
      },
      {
        pixi: {
          rotation: 450,
        },
        ease: Expo.easeOut,
      },
      0
    ),
    e.fromTo(
      minimapSpiral,
      0.1,
      {
        pixi: {
          alpha: 0,
        },
      },
      {
        pixi: {
          alpha: 1,
        },
        immediateRender: !1,
        ease: Linear.easeNone,
      },
      0
    ),
    e.fromTo(
      minimapSpiral,
      0.75,
      {
        pixi: {
          alpha: 1,
        },
      },
      {
        pixi: {
          alpha: 0,
        },
        immediateRender: !1,
        ease: Linear.easeNone,
      },
      0.2
    ),
    e.fromTo(
      minimapMaskGradient,
      2,
      {
        pixi: {
          alpha: 1,
        },
      },
      {
        pixi: {
          alpha: 0,
        },
        ease: Linear.easeNone,
      },
      0.5
    ),
    e.fromTo(
      minimapBlipsGroup,
      0.65,
      {
        pixi: {
          scale: 0,
        },
      },
      {
        pixi: {
          scale: 1,
        },
        ease: Expo.easeOut,
      },
      0
    ),
    e.fromTo(
      minimapBlipArray,
      0.75,
      {
        pixi: {
          alpha: 1,
        },
      },
      {
        pixi: {
          alpha: 0,
        },
        ease: Linear.easeNone,
      },
      0.5
    ),
    e.fromTo(
      minimapSpikesGroup,
      0.75,
      {
        pixi: {
          scale: 0,
        },
      },
      {
        pixi: {
          scale: 1,
        },
        ease: Expo.easeOut,
      },
      0
    ),
    e.fromTo(
      minimapXArray,
      0.75,
      {
        pixi: {
          scaleY: 1,
        },
      },
      {
        pixi: {
          scaleY: 0,
        },
        ease: Circ.easeInOut,
      },
      0.1
    ),
    e.fromTo(
      minimapExtras1,
      3,
      {
        pixi: {
          rotation: 0,
        },
      },
      {
        pixi: {
          rotation: -360,
        },
        ease: Expo.easeOut,
      },
      0
    ),
    e.fromTo(
      minimapExtras1,
      0.1,
      {
        pixi: {
          alpha: 0,
        },
      },
      {
        pixi: {
          alpha: 1,
        },
        ease: Linear.easeNone,
      },
      0
    ),
    e.fromTo(
      minimapExtras1,
      1,
      {
        pixi: {
          alpha: 1,
          tint: 16777215,
        },
      },
      {
        pixi: {
          alpha: 0,
          tint: colorPrimary,
        },
        immediateRender: !1,
        ease: Linear.easeNone,
      },
      0.2
    ),
    e.fromTo(
      minimapExtras2,
      1.5,
      {
        pixi: {
          scale: 0.5,
        },
      },
      {
        pixi: {
          scale: 1.1,
        },
        ease: Expo.easeOut,
      },
      0
    ),
    e.fromTo(
      minimapExtras2,
      0.1,
      {
        pixi: {
          alpha: 0,
        },
      },
      {
        pixi: {
          alpha: 0.5,
        },
        ease: Linear.easeNone,
      },
      0
    ),
    e.fromTo(
      minimapExtras2,
      1,
      {
        pixi: {
          alpha: 0.5,
          tint: 16777215,
        },
      },
      {
        pixi: {
          alpha: 0,
          tint: colorPrimary,
        },
        immediateRender: !1,
        ease: Linear.easeNone,
      },
      0.2
    ),
    e.fromTo(
      minimapXArray,
      1,
      {
        pixi: {
          tint: 16777215,
        },
      },
      {
        pixi: {
          tint: colorPrimary,
        },
        ease: Linear.easeNone,
      },
      0
    ),
    e.fromTo(
      minimapBlipArray,
      1,
      {
        pixi: {
          tint: 16777215,
        },
      },
      {
        pixi: {
          tint: colorPrimary,
        },
        ease: Linear.easeNone,
      },
      0
    ),
    e.timeScale(1.5),
    e.play();
  var a = new TimelineMax({
    paused: !0,
    delay: 5,
  });
  a.fromTo(
    "#tutorial",
    1,
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
      immediateRender: !1,
      ease: Linear.easeNone,
    },
    0
  ),
    a.fromTo(
      "#tutorial",
      2,
      {
        scrambleText: {
          text: " ",
        },
      },
      {
        scrambleText: {
          text: "GO TO BASE",
          chars: "0123456789!@#$%^&*()",
        },
        ease: Expo.easeInOut,
      },
      0
    ),
    a.fromTo(
      "#tutorial",
      1,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        immediateRender: !1,
        ease: Linear.easeNone,
      },
      3
    ),
    a.fromTo(
      "#tutorial",
      2,
      {
        scrambleText: {
          text: " ",
        },
      },
      {
        scrambleText: {
          text: "ZOOM IN TO SEE LOCATIONS",
          chars: "0123456789!@#$%^&*()",
        },
        ease: Expo.easeInOut,
      },
      3
    ),
    a.fromTo(
      "#tutorial",
      1,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        immediateRender: !1,
        ease: Linear.easeNone,
      },
      6
    ),
    a.fromTo(
      "#tutorial",
      2,
      {
        scrambleText: {
          text: " ",
        },
      },
      {
        scrambleText: {
          text: "PLAY WITH THE MENU BELOW",
          chars: "0123456789!@#$%^&*()",
        },
        ease: Expo.easeInOut,
      },
      6
    ),
    a.fromTo(
      "#tutorial",
      1,
      {
        autoAlpha: 1,
      },
      {
        autoAlpha: 0,
        immediateRender: !1,
        ease: Linear.easeNone,
      },
      9
    ),
    a.timeScale(1),
    a.play(),
    setArcAnimation("snake"),
    showGlobe();
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
  (universeBgTexture = new THREE.TextureLoader().load("/img2/universe.jpeg")),
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
    (globeTexture = new THREE.TextureLoader().load("/img2/map2.png")),
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
  (a.src = "/img2/map_inverted.png"),
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
    (globeGlowTexture = new THREE.TextureLoader().load(
      "/img2/earth-glow.jpeg"
    )),
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
      dotTexture = new THREE.TextureLoader().load("/img2/dot-inverted.png"),
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
  /*Lines*/
  /*
    for (var S = new Float32Array(3 * dotSpikesVerticesArray.length), g = 0; g < dotSpikesVerticesArray.length; g++) S[3 * g] = dotSpikesVerticesArray[g].x, S[3 * g + 1] = dotSpikesVerticesArray[g].y, S[3 * g + 2] = dotSpikesVerticesArray[g].z;
    dotSpikesMaterial = new THREE.LineBasicMaterial({
        linewidth: 1,
        color: colorHighlight,
        transparent: !0,
        blending: THREE.AdditiveBlending,
        fog: !0,
        depthWrite: !1
    }), dotSpikesBufferGeometry = new THREE.BufferGeometry, dotSpikesBufferGeometry.addAttribute("position", new THREE.BufferAttribute(S, 3)), dotSpikesMesh = new THREE.LineSegments(dotSpikesBufferGeometry, dotSpikesMaterial), dotObject.add(dotSpikesMesh);
    */
  var U = [];
  /*Roket*/
  /*
    for (g = 0; g < dotSpikesCloudVerticesArray.length; g++) {
        var m = new THREE.Vector3;
        m = dotSpikesCloudVerticesArray[g];
        var u = m.clone();
        u.multiplyScalar(1.0025), U.push(m), U.push(u)
    }
    */
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
var mediaObject,
  mediaTexture,
  mediaMaterial,
  mediaCloud,
  mediaSpritesArray = [],
  mediaDetailsArray = [],
  mediaVerticesArray = [],
  mediaCreated = !1;

function createMedia(e) {
  for (
    mediaObject = new THREE.Group(),
      mediaObject.name = "mediaObject",
      earthObject.add(mediaObject),
      l = 0;
    l < dataMedia.length;
    l++
  ) {
    var a = dataMedia[l][0],
      t = dataMedia[l][2],
      o = dataMedia[l][3],
      n = 0.1 * (Math.floor(20 * Math.random()) + 1),
      r = latLongToVector3(t, o, globeRadius, globeExtraDistance + 8 + n);
    mediaVerticesArray.push(r),
      mediaDetailsArray.push({
        position: new THREE.Vector3(r.x, r.y, r.z),
        type: a,
      });
  }
  (mediaTexture = new THREE.TextureLoader().load("/img2/photo.png")),
    (mediaMaterial = new THREE.PointsMaterial({
      map: mediaTexture,
      size: 0,
      transparent: !0,
      blending: THREE.AdditiveBlending,
      color: 16777215,
      depthWrite: !1,
    })),
    (mediaMaterial.needsUpdate = !0);
  for (
    var s = new Float32Array(3 * mediaVerticesArray.length), l = 0;
    l < mediaVerticesArray.length;
    l++
  )
    (s[3 * l] = mediaVerticesArray[l].x),
      (s[3 * l + 1] = mediaVerticesArray[l].y),
      (s[3 * l + 2] = mediaVerticesArray[l].z);
  (mediaBufferGeometry = new THREE.BufferGeometry()),
    mediaBufferGeometry.addAttribute(
      "position",
      new THREE.BufferAttribute(s, 3)
    ),
    (mediaCloud = new THREE.Points(mediaBufferGeometry, mediaMaterial)),
    (mediaCloud.sortParticles = !0),
    mediaObject.add(mediaCloud),
    (mediaCreated = !0),
    e && e();
}

function renderMedia() {
  var e = camera.position.z;
  if (e < 200 && e > globeMaxZoom) {
    (mediaMaterial.size = 1.25 * ((200 - e) / 110)),
      (mediaMaterial.needsUpdate = !0);
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
      starZoomTexture = new THREE.TextureLoader().load("/img2/star.jpeg"),
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
        "/img2/ring_explosion.jpeg"
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
var gyroscopeObject,
  gyroscopeGeometry,
  gyroscopeMaterial,
  gyroscopeMesh1,
  gyroscopeMesh2,
  gyroscopeMesh3,
  gyroscopeMesh4,
  gyroscopeRingSize = 90,
  gyroscopeRingThickness = 89,
  gyroscopeCreated = !1;

function createGyroscope(e) {
  (gyroscopeObject = new THREE.Object3D()),
    rotationObject.add(gyroscopeObject),
    (gyroscopeGeometry = new THREE.RingGeometry(
      gyroscopeRingSize,
      gyroscopeRingThickness,
      128
    )),
    (gyroscopeMaterial = new THREE.MeshBasicMaterial({
      color: colorHighlight,
      opacity: 0.25,
      transparent: !0,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      fog: !0,
      depthWrite: !1,
    })),
    (gyroscopeMaterial.needsUpdate = !0),
    (gyroscopeMesh1 = new THREE.Mesh(
      gyroscopeGeometry,
      new THREE.MeshBasicMaterial({
        color: colorBase,
        opacity: 0,
        transparent: !0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        fog: !0,
        depthWrite: !1,
      })
    )),
    (gyroscopeMesh2 = new THREE.Mesh(
      gyroscopeGeometry,
      new THREE.MeshBasicMaterial({
        color: colorBase,
        opacity: 0,
        transparent: !0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        fog: !0,
        depthWrite: !1,
      })
    )),
    (gyroscopeMesh3 = new THREE.Mesh(
      gyroscopeGeometry,
      new THREE.MeshBasicMaterial({
        color: colorBase,
        opacity: 0,
        transparent: !0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        fog: !0,
        depthWrite: !1,
      })
    )),
    (gyroscopeMesh4 = new THREE.Mesh(
      gyroscopeGeometry,
      new THREE.MeshBasicMaterial({
        color: colorBase,
        opacity: 0,
        transparent: !0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        fog: !0,
        depthWrite: !1,
      })
    ));
  var a = new THREE.Object3D(),
    t = new THREE.Object3D(),
    i = new THREE.Object3D(),
    o = new THREE.Object3D();
  (a.rotation.x = 90 * toRAD),
    (t.rotation.x = 90 * toRAD),
    (i.rotation.x = 90 * toRAD),
    (o.rotation.x = 90 * toRAD),
    (a.rotation.y = 0 * toRAD),
    (t.rotation.y = 0 * toRAD),
    (i.rotation.y = 180 * toRAD),
    (o.rotation.y = 0 * toRAD),
    (a.rotation.z = 0 * toRAD),
    (t.rotation.z = 90 * toRAD),
    (i.rotation.z = 0 * toRAD),
    (o.rotation.z = 270 * toRAD),
    a.add(gyroscopeMesh1),
    t.add(gyroscopeMesh2),
    i.add(gyroscopeMesh3),
    o.add(gyroscopeMesh4),
    gyroscopeObject.add(a),
    gyroscopeObject.add(t),
    gyroscopeObject.add(i),
    gyroscopeObject.add(o),
    (gyroscopeCreated = !0),
    e && e();
}

function renderGyroscope() {}
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
        value: new THREE.TextureLoader().load("/img2/dot-inverted.png"),
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
var rendererPixi,
  stagePixi,
  minimapVizGroup,
  minimapDetails,
  minimapMaskGradient,
  minimapLines,
  minimapExtras1,
  minimapExtras2,
  minimapSpiral,
  minimapSpikesGroup,
  minimapBlipsGroup,
  minimapXArray,
  minimapBlipArray,
  minimapBgCreated = !1;

function createMinimapBg(e) {
  (rendererPixi = new PIXI.autoDetectRenderer(1e3, 320, {
    transparent: !0,
    antialias: !0,
  })),
    (stagePixi = new PIXI.Stage()),
    $("#minimapBackground").append(rendererPixi.view),
    (minimapVizGroup = new PIXI.Container()),
    stagePixi.addChild(minimapVizGroup),
    (minimapDetails = new PIXI.Sprite.fromImage("/img2/mapDetails.png")),
    minimapVizGroup.addChild(minimapDetails),
    (minimapDetails.position.x = 0),
    (minimapDetails.position.y = 0),
    (minimapDetails.width = 1e3),
    (minimapDetails.height = 320),
    (minimapDetails.tint = 3394815),
    (minimapMaskGradient = new PIXI.Sprite.fromImage("/img2/mapGradient2.png")),
    minimapVizGroup.addChild(minimapMaskGradient),
    (minimapMaskGradient.position.x = 500),
    (minimapMaskGradient.position.y = 160),
    (minimapMaskGradient.width = 1e3),
    (minimapMaskGradient.height = 320),
    (minimapMaskGradient.pivot.x = 500),
    (minimapMaskGradient.pivot.y = 160),
    (minimapMaskGradient.scale.x = 0),
    (minimapLines = new PIXI.Sprite.fromImage("/img2/mapLines.png")),
    minimapVizGroup.addChild(minimapLines),
    (minimapLines.position.x = 0),
    (minimapLines.position.y = 0),
    (minimapLines.width = 1e3),
    (minimapLines.height = 320),
    (minimapLines.tint = 16777215),
    (minimapLines.mask = minimapMaskGradient),
    (minimapExtras1 = new PIXI.Sprite.fromImage("/img2/mapExtras1.png")),
    minimapVizGroup.addChild(minimapExtras1),
    (minimapExtras1.pivot.x = 160),
    (minimapExtras1.pivot.y = 160),
    (minimapExtras1.position.x = 500),
    (minimapExtras1.position.y = 160),
    (minimapExtras1.alpha = 0),
    (minimapExtras2 = new PIXI.Sprite.fromImage("/img2/mapExtras2.png")),
    minimapVizGroup.addChild(minimapExtras2),
    (minimapExtras2.pivot.x = 160),
    (minimapExtras2.pivot.y = 160),
    (minimapExtras2.position.x = 500),
    (minimapExtras2.position.y = 160),
    (minimapExtras2.alpha = 0),
    (minimapMaskCircle = new PIXI.Sprite.fromImage("/img2/mapCircles.png")),
    minimapVizGroup.addChild(minimapMaskCircle),
    (minimapMaskCircle.position.x = 0),
    (minimapMaskCircle.position.y = 0),
    (minimapMaskCircle.width = 1e3),
    (minimapMaskCircle.height = 320),
    (minimapSpiral = new PIXI.Sprite.fromImage("/img2/mapGradient1.png")),
    minimapVizGroup.addChild(minimapSpiral),
    (minimapSpiral.position.x = 500),
    (minimapSpiral.position.y = 160),
    (minimapSpiral.width = 1e3),
    (minimapSpiral.height = 320),
    (minimapSpiral.pivot.x = 500),
    (minimapSpiral.pivot.y = 160),
    (minimapSpiral.scale.x = 0.05),
    (minimapSpiral.alpha = 0),
    (minimapSpiral.mask = minimapMaskCircle),
    (minimapSpikesGroup = new PIXI.Container()),
    minimapVizGroup.addChild(minimapSpikesGroup),
    (minimapSpikesGroup.width = 320),
    (minimapSpikesGroup.height = 320),
    (minimapSpikesGroup.x = 500),
    (minimapSpikesGroup.y = 160),
    (minimapSpikesGroup.scale.x = 0),
    (minimapSpikesGroup.scale.y = 0);
  var a = new PIXI.Graphics();
  minimapSpikesGroup.addChild(a),
    a.beginFill(16777215, 1),
    a.drawRect(0, 0, 1, 35),
    a.endFill(),
    (a.pivot.x = 0.5),
    (a.pivot.y = 35),
    (a.rotation = 45 * toRAD),
    (a.position.x = -90),
    (a.position.y = 90);
  var t = new PIXI.Graphics();
  minimapSpikesGroup.addChild(t),
    t.beginFill(16777215, 1),
    t.drawRect(0, 0, 1, 35),
    t.endFill(),
    (t.pivot.x = 0.5),
    (t.pivot.y = 35),
    (t.rotation = 135 * toRAD),
    (t.position.x = -90),
    (t.position.y = -90);
  var i = new PIXI.Graphics();
  minimapSpikesGroup.addChild(i),
    i.beginFill(16777215, 1),
    i.drawRect(0, 0, 1, 35),
    i.endFill(),
    (i.pivot.x = 0.5),
    (i.pivot.y = 35),
    (i.rotation = 225 * toRAD),
    (i.position.x = 90),
    (i.position.y = -90);
  var o = new PIXI.Graphics();
  minimapSpikesGroup.addChild(o),
    o.beginFill(16777215, 1),
    o.drawRect(0, 0, 1, 35),
    o.endFill(),
    (o.pivot.x = 0.5),
    (o.pivot.y = 35),
    (o.rotation = 315 * toRAD),
    (o.position.x = 90),
    (o.position.y = 90),
    (minimapBlipsGroup = new PIXI.Container()),
    minimapVizGroup.addChild(minimapBlipsGroup),
    (minimapBlipsGroup.width = 320),
    (minimapBlipsGroup.height = 320),
    (minimapBlipsGroup.x = 500),
    (minimapBlipsGroup.y = 160),
    (minimapBlipsGroup.scale.x = 0),
    (minimapBlipsGroup.scale.y = 0);
  var n = new PIXI.Graphics();
  n.beginFill(16777215),
    n.drawCircle(0, 0, 1),
    n.endFill(),
    (n.position.x = -95),
    (n.position.y = -95),
    minimapBlipsGroup.addChild(n);
  var r = new PIXI.Graphics();
  r.beginFill(16777215),
    r.drawCircle(0, 0, 1),
    r.endFill(),
    (r.position.x = 95),
    (r.position.y = -95),
    minimapBlipsGroup.addChild(r);
  var s = new PIXI.Graphics();
  s.beginFill(16777215),
    s.drawCircle(0, 0, 1),
    s.endFill(),
    (s.position.x = -95),
    (s.position.y = 95),
    minimapBlipsGroup.addChild(s);
  var l = new PIXI.Graphics();
  l.beginFill(16777215),
    l.drawCircle(0, 0, 1),
    l.endFill(),
    (l.position.x = 95),
    (l.position.y = 95),
    minimapBlipsGroup.addChild(l),
    (minimapXArray = [a, t, i, o]),
    (minimapBlipArray = [n, r, s, l]),
    (minimapBgCreated = !0),
    e && e();
}

function renderMinimapBg() {
  rendererPixi.render(stagePixi);
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
  debugger;
  if (preloaderComplete) {
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
      mediaCreated && renderMedia(),
      starsCreated && renderStars(),
      ringPulseCreated && renderRingPulse(),
      gyroscopeCreated && renderGyroscope(),
      rainCreated && renderRain(),
      ringsCreated && renderRings(),
      minimapBgCreated && renderMinimapBg(),
      "cycle" == colorTypeCurrent && setColors("cycle"),
      checkHover();
  }
}
var currentLocationTitle = "";

function checkHover() {
  if (isMouseMoved) {
    globeRaycaster.setFromCamera(mouse, camera);
    var e = globeRaycaster.intersectObjects(dotSpritesArray, !0),
      a = 0 < e.length ? e[0] : null;
    if (0 < e.length) {
      var t = dataMap[a.object.userData.id][4],
        i = dotSpritesHoverArray[a.object.userData.id];
      (isParticleHit && t == currentLocationTitle) ||
        ((currentLocationTitle = t),
        (isParticleHit = !0),
        showTooltip(),
        !TweenMax.isTweening(i.scale) &&
          (TweenMax.fromTo(
            i.scale,
            1,
            {
              x: 2,
              y: 2,
            },
            {
              x: 10,
              y: 10,
              ease: Expo.easeOut,
            }
          ),
          TweenMax.fromTo(
            i.material,
            1.5,
            {
              opacity: 1,
            },
            {
              opacity: 0,
              onStart: function () {
                i.visible = !0;
              },
              onComplete: function () {
                i.visible = !1;
              },
            }
          )));
    } else
      (currentLocationTitle = ""),
        (isParticleHit = !1),
        isMediaHit || hideTooltip();
    var e = globeRaycaster.intersectObject(mediaCloud, !0),
      a = 0 < e.length ? e[0] : null;
    if (0 < e.length) {
      var t = "<b>" + dataMedia[a.index][0] + "</b> - " + dataMedia[a.index][4];
      (currentLocationTitle = t),
        isMediaHit || (isMediaHit = !0),
        showTooltip();
    } else
      (currentLocationTitle = ""),
        (isMediaHit = !1),
        isParticleHit || hideTooltip();
  }
}
var isTooltipVisible = !1;

function showTooltip() {
  (container.style.cursor = "pointer"),
    $("#tooltip").html('<div class="label">' + currentLocationTitle + "</div>"),
    isTooltipVisible ||
      ((isTooltipVisible = !0),
      clientMouseX > window.innerWidth - 250
        ? (TweenMax.fromTo(
            "#tooltip",
            1,
            {
              x: -100,
              autoAlpha: 0,
            },
            {
              x: 0,
              autoAlpha: 1,
              display: "inline-block",
              ease: Expo.easeOut,
              delay: 0.1,
            }
          ),
          (document.getElementById("tooltip").style.textAlign = "right"))
        : (TweenMax.fromTo(
            "#tooltip",
            1,
            {
              x: 100,
              autoAlpha: 0,
            },
            {
              x: 0,
              autoAlpha: 1,
              display: "inline-block",
              ease: Expo.easeOut,
              delay: 0.1,
            }
          ),
          (document.getElementById("tooltip").style.textAlign = "left")));
}

function hideTooltip() {
  (isTooltipVisible = !1),
    (container.style.cursor = isMouseDown ? "move" : "move"),
    TweenMax.set("#tooltip", {
      autoAlpha: 0,
      display: "none",
    });
}

function checkClick() {
  globeRaycaster.setFromCamera(mouse, camera);
  var e = globeRaycaster.intersectObjects(dotSpritesArray, !0),
    a = 0 < e.length ? e[0] : null;
  if (0 < e.length) {
    var t = dataMap[a.object.userData.id][1],
      i = "";
    0 === t && (i = "E-BOOK"),
      1 === t && (i = "PAPERBACK"),
      2 === t && (i = "HARDCOVER"),
      TweenMax.killTweensOf("#location", !1);
    var o = new TimelineMax({
      paused: !0,
    });
    o.fromTo(
      "#location",
      0.5,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        display: "block",
        immediateRender: !1,
        ease: Linear.easeNone,
      },
      0
    ),
      o.fromTo(
        "#location .title",
        1,
        {
          scrambleText: {
            text: " ",
          },
        },
        {
          scrambleText: {
            text: dataMap[a.object.userData.id][4],
            chars: "0123456789!@#$%^&*()",
          },
          ease: Expo.easeInOut,
        },
        0
      ),
      o.fromTo(
        "#location .booktype",
        1,
        {
          scrambleText: {
            text: " ",
          },
        },
        {
          scrambleText: {
            text: i,
            chars: "0123456789!@#$%^&*()",
          },
          ease: Expo.easeInOut,
        },
        0
      ),
      o.fromTo(
        "#location",
        1,
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          immediateRender: !1,
          ease: Linear.easeNone,
        },
        1
      ),
      o.play(0);
    var gdrtt = dataMap[a.object.userData.id][5];
    setTimeout(() => {
      toggleInfo(gdrtt);
    }, 1000);
  }
  var e = globeRaycaster.intersectObject(mediaCloud, !0),
    a = 0 < e.length ? e[0] : null;
  if (0 < e.length) {
    var n = dataMedia[a.index][5];
    a.index, window.open(n, "_blank");
  }
}

function initButtons() {
  var a = !1;
  $("#minimap")
    .mousedown(function () {
      setRotation("manual"), (a = !0);
    })
    .mousemove(function (t) {
      if (a) {
        var e = $(this).offset().top - $(window).scrollTop(),
          i = $(this).offset().left - $(window).scrollLeft(),
          o = Math.round(t.clientX - i),
          n = Math.round(t.clientY - e),
          r = o / $(this).width(),
          s = n / $(this).height(),
          l = 75,
          d = 180,
          A = Math.round(rotationObject.rotation.x / radianLoop) * radianLoop,
          p = Math.round(rotationObject.rotation.y / radianLoop) * radianLoop;
        (targetRotationX = A + -(s * (2 * l) - (l + 15)) * toRAD),
          (targetRotationY = p - (r * (2 * d) - d) * toRAD);
      }
    })
    .mouseleave(function () {
      a = !1;
    })
    .mouseup(function (t) {
      (a = !1), setRotation("manual");
      var e = $(this).offset().top - $(window).scrollTop(),
        i = $(this).offset().left - $(window).scrollLeft(),
        o = Math.round(t.clientX - i),
        n = Math.round(t.clientY - e),
        r = o / $(this).width(),
        s = n / $(this).height(),
        l = 75,
        d = 180,
        A = Math.round(rotationObject.rotation.x / radianLoop) * radianLoop,
        p = Math.round(rotationObject.rotation.y / radianLoop) * radianLoop;
      (targetRotationX = A + -(s * (2 * l) - (l + 15)) * toRAD),
        (targetRotationY = p - (r * (2 * d) - d) * toRAD);
      console.log(A + -(s * (2 * l) - (l + 15)));
      console.log(p - (r * (2 * d) - d));
    }),
    $("#palette").click(function (e) {
      e.preventDefault();
      setColors("random");
    }),
    deviceSettings.isMobile ||
      ($(".close").hover(
        function () {
          TweenMax.to(".close .line1", 0.5, {
            attr: {
              x1: 15,
              y1: 15,
              x2: 35,
              y2: 35,
            },
            stroke: colorSecondary,
            ease: Expo.easeOut,
          }),
            TweenMax.to(".close .line2", 0.5, {
              attr: {
                x1: 15,
                y1: 35,
                x2: 35,
                y2: 15,
              },
              stroke: colorSecondary,
              ease: Expo.easeOut,
            }),
            TweenMax.fromTo(
              ".close circle",
              0.5,
              {
                drawSVG: "50% 50%",
                stroke: colorSecondary,
              },
              {
                drawSVG: "35% 65%",
                stroke: colorPrimary,
                display: "block",
                ease: Expo.easeOut,
              }
            ),
            TweenMax.fromTo(
              ".close circle",
              0.25,
              {
                autoAlpha: 0,
              },
              {
                autoAlpha: 1,
                ease: Linear.easeNone,
              }
            );
        },
        function () {
          TweenMax.to(".close .line1", 0.5, {
            attr: {
              x1: 0,
              y1: 0,
              x2: 50,
              y2: 50,
            },
            stroke: colorPrimary,
            ease: Expo.easeOut,
          }),
            TweenMax.to(".close .line2", 0.5, {
              attr: {
                x1: 0,
                y1: 50,
                x2: 50,
                y2: 0,
              },
              stroke: colorPrimary,
              ease: Expo.easeOut,
            }),
            TweenMax.to(".close circle", 0.5, {
              drawSVG: "50% 50%",
              stroke: colorSecondary,
              autoAlpha: 0,
              ease: Expo.easeOut,
            }),
            TweenMax.to(".close circle", 0.5, {
              autoAlpha: 0,
              ease: Linear.easeNone,
            });
        }
      ),
      $("#nav-left a").hover(
        function () {
          var e = $(this).attr("data-id");
          TweenMax.fromTo(
            this,
            1,
            {
              scrambleText: {
                text: " ",
              },
              autoAlpha: 0,
            },
            {
              scrambleText: {
                text: e,
                chars: "0123456789!@#$%^&*()",
                revealDelay: 0.1,
              },
              autoAlpha: 1,
            }
          );
        },
        function () {}
      ),
      $("#nav-right a").hover(
        function () {
          var e = $(this).attr("data-id");
          TweenMax.fromTo(
            this,
            1,
            {
              scrambleText: {
                text: " ",
              },
              autoAlpha: 0,
            },
            {
              scrambleText: {
                text: e,
                chars: "0123456789!@#$%^&*()",
                revealDelay: 0.1,
                rightToLeft: !0,
              },
              autoAlpha: 1,
            }
          );
        },
        function () {}
      ),
      $(document).keydown(function (a) {
        var e = a.keyCode || a.which,
          t = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            blue: 66,
            invert: 73,
            random: 82,
          },
          i = 20 * toRAD;
        e === t.left
          ? ((targetRotationY -= i), (cameraDirection = "right"))
          : e === t.right
          ? ((targetRotationY += i), (cameraDirection = "left"))
          : e === t.up
          ? (targetCameraZ -= 20)
          : e === t.down
          ? (targetCameraZ += 20)
          : e === t.blue
          ? setColors("blue")
          : e === t.invert
          ? setColors("invert")
          : e === t.random
          ? setColors("random")
          : void 0;
      }),
      $(".book").hover(
        function () {
          TweenMax.to($(this).find(".overlay"), 0.75, {
            autoAlpha: 1,
            immediateRender: !1,
            ease: Expo.easeOut,
          }),
            TweenMax.to($(this).find(".overlay"), 0.75, {
              rotationY: -40,
              immediateRender: !1,
              ease: Expo.easeOut,
            }),
            TweenMax.to($(this).find(".cover"), 0.75, {
              rotationY: -40,
              immediateRender: !1,
              ease: Expo.easeOut,
            }),
            TweenMax.to($(this).find(".page1"), 0.75, {
              rotationY: -34,
              immediateRender: !1,
              ease: Expo.easeOut,
            }),
            TweenMax.to($(this).find(".page2"), 0.75, {
              rotationY: -27,
              immediateRender: !1,
              ease: Expo.easeOut,
            }),
            TweenMax.to($(this).find(".page3"), 0.75, {
              rotationY: -15,
              immediateRender: !1,
              ease: Expo.easeOut,
            }),
            TweenMax.to("#buytext", 0.75, {
              y: 15,
              immediateRender: !1,
              ease: Expo.easeOut,
            });
        },
        function () {
          TweenMax.to($(this).find(".overlay"), 0.5, {
            autoAlpha: 0,
            immediateRender: !1,
            ease: Expo.easeOut,
          }),
            TweenMax.to($(this).find(".overlay"), 0.5, {
              rotationY: 0,
              immediateRender: !1,
              ease: Expo.easeOut,
            }),
            TweenMax.to($(this).find(".cover"), 0.5, {
              rotationY: 0,
              immediateRender: !1,
              ease: Expo.easeOut,
            }),
            TweenMax.to($(this).find(".page"), 0.5, {
              rotationY: 0,
              immediateRender: !1,
              ease: Expo.easeOut,
            }),
            TweenMax.to("#buytext", 0.5, {
              y: 0,
              immediateRender: !1,
              ease: Expo.easeOut,
            });
        }
      ));
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

function setRotation(e) {
  $("#rotationMode a").removeClass("active");
  "toggle" === e &&
    ("auto" === cameraTarget
      ? (e = "manual")
      : "manual" === cameraTarget
      ? (e = "auto")
      : void 0);
  cameraTarget = e;
  "auto" === cameraTarget
    ? $("#rotationMode a.auto").addClass("active")
    : "manual" === cameraTarget
    ? $("#rotationMode a.manual").addClass("active")
    : void 0;
}

function toggleRotation() {
  "auto" == cameraTarget ? setRotation("manual") : setRotation("auto");
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
    $("#arcMode a").removeClass("active"),
    e)
  ) {
    case "rocket":
      earthObject.add(arcRocketObject),
        (arcRocketObject.visible = !0),
        arcRocketAnimation.play(0),
        $("#arcMode a.rocket").addClass("active");
      break;
    case "snake":
      earthObject.add(arcSnakeObject),
        (arcSnakeObject.visible = !0),
        arcSnakeAnimation.play(0),
        $("#arcMode a.snake").addClass("active");
      break;
    case "all":
      arcAllAnimation.play(0),
        earthObject.add(arcAllObject),
        (arcAllObject.visible = !0),
        $("#arcMode a.all").addClass("active");
      break;
    case "off":
  }
  isIntroDone && generateGlitch();
}
var colorTypeCurrent = "";

function zoomOut() {
  targetCameraZ = 250;
}

function goToPoint(e) {
  switch (((colorTypeCurrent = e), $(".setting a").removeClass("active"), e)) {
    case "mainBase":
      setRotation("manual");
      targetCameraZ = 0;
      (targetRotationX = dataMap[0][2] * toRAD),
        (targetRotationY = dataMap[0][3] * toRAD * -1);
      $("#colorMode a.mainbase_1").addClass("active");
      toggleInfo("mainBase");
      break;
    case "Labs":
      setRotation("manual");
      targetCameraZ = 0;
      (targetRotationX = dataMap[1][2] * toRAD),
        (targetRotationY = dataMap[1][3] * toRAD * -1);
      $("#colorMode a.labs_f").addClass("active");
      toggleInfo("Labs");
      break;
    case "Gallery":
      setRotation("manual");
      targetCameraZ = 0;
      (targetRotationX = dataMap[2][2] * toRAD),
        (targetRotationY = dataMap[2][3] * toRAD * -1);
      $("#arcMode a.gallery_f").addClass("active");
      toggleInfo("Gallery");
      break;
    case "Arena":
      setRotation("manual");
      targetCameraZ = 0;
      (targetRotationX = dataMap[3][2] * toRAD),
        (targetRotationY = dataMap[3][3] * toRAD * -1);
      $("#arcMode a.arena_f").addClass("active");
      toggleInfo("Arena");
      break;
    case "Bank":
      setRotation("manual");
      targetCameraZ = 0;
      (targetRotationX = dataMap[4][2] * toRAD),
        (targetRotationY = dataMap[4][3] * toRAD * -1);
      $("#arcMode a.bank_f").addClass("active");
      toggleInfo("Bank");
      break;
    case "Market":
      setRotation("manual");
      targetCameraZ = 0;
      (targetRotationX = dataMap[5][2] * toRAD),
        (targetRotationY = dataMap[5][3] * toRAD * -1);
      $("#arcMode a.market_f").addClass("active");
      toggleInfo("Market");
      break;
    case "News":
      setRotation("manual");
      targetCameraZ = 0;
      (targetRotationX = dataMap[6][2] * toRAD),
        (targetRotationY = dataMap[6][3] * toRAD * -1);
      $("#colorMode a.news_f").addClass("active");
      toggleInfo("News");
      break;
  }
}

function setColors(e) {
  switch (
    ((colorTypeCurrent = e), $("#colorMode a").removeClass("active"), e)
  ) {
    case "off":
      (colorPrimary = "#FFFFFF"),
        (colorSecondary = "#FFFFFF"),
        $("#colorMode a.off").addClass("active");
      break;
    case "blue":
      (colorPrimary = colorPrimary_Base),
        (colorSecondary = colorSecondary_Base),
        $("#colorMode a.blue").addClass("active");
      break;
    case "invert":
      "#FFFFFF" === colorPrimary &&
        "#FFFFFF" === colorSecondary &&
        ((colorPrimary = colorPrimary_Base),
        (colorSecondary = colorSecondary_Base));
      var a = colorPrimary,
        t = colorSecondary;
      (colorPrimary = t),
        (colorSecondary = a),
        $("#colorMode a.invert").addClass("active");
      break;
    case "random":
      (colorPrimary = "#000000".replace(/0/g, function () {
        return (~~(16 * Math.random())).toString(16);
      })),
        (colorSecondary = "#000000".replace(/0/g, function () {
          return (~~(16 * Math.random())).toString(16);
        })),
        $("#colorMode a.random").addClass("active");
      break;
    case "cycle":
      var o = 5e-5 * Date.now();
      h = ((360 * (1 + o)) % 360) / 360;
      var n = new THREE.Color(colorPrimary);
      (colorPrimary = n.setHSL(h, 0.5, 0.5)),
        (colorPrimary = "#" + colorPrimary.getHexString());
      var r = new THREE.Color(colorSecondary);
      (colorSecondary = r.setHSL(h, 0.5, 0.5)),
        (colorSecondary = "#" + colorSecondary.getHexString()),
        $("#colorMode a.cycle").addClass("active");
  }
  if (
    ((colorBase = new THREE.Color(colorPrimary)),
    (colorBase50 = new THREE.Color(shadeBlend(0.5, colorPrimary, colorDarken))),
    (colorBase75 = new THREE.Color(
      shadeBlend(0.75, colorPrimary, colorDarken)
    )),
    (colorBase85 = new THREE.Color(
      shadeBlend(0.85, colorPrimary, colorDarken)
    )),
    (colorHighlight = new THREE.Color(colorSecondary)),
    scene.getObjectByName("rain") &&
      ((rainCloud.material.uniforms.color.value = new THREE.Color(
        colorPrimary
      )),
      (rainCloud.material.uniforms.needsUpdate = !0)),
    lightsCreated &&
      ((lightShield1.color = colorBase),
      (lightShield2.color = colorBase),
      (lightShield3.color = colorBase),
      (lightShield1.needsUpdate = !0),
      (lightShield2.needsUpdate = !0),
      (lightShield3.needsUpdate = !0)),
    ringsCreated &&
      ((ringsOuterMaterial.color = colorBase75),
      (ringsInnerMaterial.color = colorBase50),
      (ringsOuterMaterial.needsUpdate = !0),
      (ringsInnerMaterial.needsUpdate = !0)),
    universeCreated &&
      ((universeBgMaterial.color = colorBase),
      (universeBgMaterial.needsUpdate = !0)),
    globeCreated)
  ) {
    (globeInnerMaterial.color = colorBase75),
      (globeOuterMaterial.color = colorBase),
      (globeShieldMaterial.color = colorBase75),
      (globeGlowMaterial.color = colorBase),
      (globeInnerMaterial.needsUpdate = !0),
      (globeOuterMaterial.needsUpdate = !0),
      (globeShieldMaterial.needsUpdate = !0),
      (globeGlowMaterial.needsUpdate = !0);
    for (
      var s = new Float32Array(3 * globeCloudVerticesArray.length),
        l = [],
        d = 0;
      d < globeCloudVerticesArray.length;
      d++
    ) {
      var A = 0.01 * generateRandomNumber(85, 90),
        p = shadeBlend(A, colorPrimary, colorDarken);
      l[d] = new THREE.Color(p);
    }
    for (var d = 0; d < globeCloudVerticesArray.length; d++)
      (s[3 * d] = l[d].r), (s[3 * d + 1] = l[d].g), (s[3 * d + 2] = l[d].b);
    globeCloudBufferGeometry.addAttribute(
      "color",
      new THREE.BufferAttribute(s, 3)
    ),
      (globeCloudBufferGeometry.colorsNeedUpdate = !0);
  }
  if (dotsCreated) {
    (dotMaterial.color = colorHighlight),
      (dotSpikesMaterial.color = colorHighlight),
      (dotMaterial.needsUpdate = !0),
      (dotSpikesMaterial.needsUpdate = !0);
    for (var d = 0; d < dotSpritesHoverArray.length; d++)
      (dotSpritesHoverArray[d].material.color = colorHighlight),
        (dotSpritesHoverArray[d].material.needsUpdate = !0);
  }
  starsCreated &&
    ((starsMaterial.color = colorBase50), (starsMaterial.needsUpdate = !0)),
    arcRocketCreated &&
      ((arcRocketMesh.material.uniforms.color.value = colorHighlight),
      (arcRocketMesh.material.uniforms.needsUpdate = !0)),
    arcSnakeCreated &&
      ((arcSnakeMesh.material.uniforms.color.value = colorHighlight),
      (arcSnakeMesh.material.uniforms.needsUpdate = !0)),
    arcAllCreated &&
      ((arcAllMaterial.color = colorHighlight),
      (arcAllMaterial.needsUpdate = !0)),
    spikesCreated &&
      ((spikesMaterial.color = colorBase75), (spikesMaterial.needsUpdate = !0)),
    ringPulseCreated &&
      ((ringPulseMesh.material.uniforms.color.value = colorBase),
      (ringPulseMesh.material.uniforms.needsUpdate = !0),
      (ringExplosionMaterial.color = colorBase85),
      (ringExplosionMaterial.needsUpdate = !0),
      (ringPointMaterial.color = colorBase75),
      (ringPointMaterial.needsUpdate = !0)),
    gyroscopeCreated &&
      ((gyroscopeMesh1.material.color = colorBase),
      (gyroscopeMesh2.material.color = colorBase),
      (gyroscopeMesh3.material.color = colorBase),
      (gyroscopeMesh4.material.color = colorBase),
      (gyroscopeMesh1.material.needsUpdate = !0),
      (gyroscopeMesh2.material.needsUpdate = !0),
      (gyroscopeMesh3.material.needsUpdate = !0),
      (gyroscopeMesh4.material.needsUpdate = !0)),
    rainCreated &&
      ((rainCloud.material.uniforms.color.value = colorBase),
      (rainCloud.material.uniforms.needsUpdate = !0)),
    1 == $("#customCSS").length && $("#customCSS").remove();
  var m = hexToRgb(colorPrimary),
    u =
      '<style id="customCSS">body, a:link, a:visited { color: ' +
      colorPrimary +
      ";} .settings a { border-color: rgba(" +
      m.r +
      ", " +
      m.g +
      ", " +
      m.b +
      ", .15);} .settings a.active { background-color: " +
      colorPrimary +
      ";} #rotationMode a { color: " +
      shadeBlend(0.5, colorPrimary, colorDarken) +
      ";} #rotationMode a.active { color: " +
      colorPrimary +
      ";} .svg-stop { stop-color: " +
      colorPrimary +
      ";} .pulseDot { background-color: " +
      colorPrimary +
      ";} .pulseTrail { background-color: " +
      colorPrimary +
      ";} #tooltip { background-color: " +
      colorPrimary +
      ";} #soundButton .bar:after { background-color: " +
      colorPrimary +
      ";} #soundButton .bar:after { background-color: " +
      colorPrimary +
      ";} #paletteHighlight { background-color: " +
      colorSecondary +
      ";} #paletteBase { background-color: " +
      colorPrimary +
      ";} #paletteBase50 { background-color: " +
      shadeBlend(0.5, colorPrimary, colorDarken) +
      ";} #paletteBase75 { background-color: " +
      shadeBlend(0.75, colorPrimary, colorDarken) +
      ";} #paletteBase85 { background-color: " +
      shadeBlend(0.85, colorPrimary, colorDarken) +
      ";} .minibar { background-color: " +
      shadeBlend(0.5, colorSecondary, colorDarken) +
      ";} #location { color: " +
      colorSecondary +
      ";} </style>";
  $("head").append(u),
    $("#minimap svg path, .svg-fill").css("fill", colorPrimary),
    $(
      ".close .line1, .close .line2, .close .bracket_x, .close .circle_x, .svg-ring, .cross, .pulseCircle circle"
    ).css("stroke", colorPrimary),
    isIntroDone && "cycle" != colorTypeCurrent && generateGlitch();
}
var statNumber = 0;

function changeStat() {
  var e = ["48", "36", "6"],
    a = ["COUNTRIES", "U.S. STATES", "CONTINENTS"],
    t = e.length - 1;
  TweenMax.set("#nav-stats", {
    transformPerspective: 800,
  });
  var i = new TimelineMax({
    paused: !0,
    force3D: !0,
    repeat: -1,
    delay: 1,
    repeatDelay: 0,
  });
  i.to(
    "#nav-stats",
    1.5,
    {
      scaleX: 0.7,
      scaleY: 0.7,
      autoAlpha: 0,
      rotationY: -90,
      ease: Expo.easeIn,
      immediateRender: !1,
    },
    0
  ),
    i.fromTo(
      "#nav-stats",
      3,
      {
        scaleX: 0,
        scaleY: 0,
        autoAlpha: 0,
        rotationY: 180,
      },
      {
        scaleX: 1,
        scaleY: 1,
        autoAlpha: 1,
        rotationY: 0,
        ease: Expo.easeOut,
        immediateRender: !1,
        onStart: function () {
          statNumber++,
            statNumber > t && (statNumber = 0),
            $("#nav-stats .number").html(""),
            $("#nav-stats .number").html(e[statNumber]),
            $("#nav-stats .description").html(""),
            $("#nav-stats .description").html(a[statNumber]);
        },
        onComplete: function () {
          $("#nav-stats").removeAttr("style");
        },
      },
      1.5
    ),
    i.timeScale(1),
    i.play();
}
var isInfoVisible = !1,
  infoSection = "";

function toggleInfo_box(e) {
  infoSection = "";
  if (
    (TweenMax.set("#overlayBox svg", {
      rotation: -90,
      transformOrigin: "center center",
    }),
    TweenMax.set(".close .circles", {
      rotation: -180,
      transformOrigin: "center center",
    }),
    isInfoVisible)
  ) {
    /*Отключаем все что показывали*/
    myElement = document.getElementById("overlayInnerBox");
    for (let i = 0; i < myElement.children.length; i++) {
      /*Переключаем внутренние елементы*/
      myElement.children[i].scrollTop = 0;
      myElement.children[i].style.removeProperty("display");
    }

    isInfoVisible = !1;
    var a = new TimelineMax({
      paused: !0,
    });
    a.to(
      "#overlayB",
      0.5,
      {
        autoAlpha: 0,
        ease: Linear.easeNone,
      },
      0
    ),
      a.staggerTo(
        "#overlayBox .svg-ring",
        0.5,
        {
          drawSVG: "50% 50%",
          ease: Expo.easeInOut,
        },
        0.25,
        0
      ),
      a.play(0);
    document.getElementById("about").scrollTop = 0;
  } else {
    (infoSection = e), (isInfoVisible = !0);
    var a = new TimelineMax({
      paused: !0,
    });
    a.fromTo(
      "#overlayB",
      0.5,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        display: "block",
        ease: Linear.easeNone,
      },
      0
    ),
      a.staggerFromTo(
        "#overlayBox .svg-ring",
        2,
        {
          drawSVG: "50% 50%",
        },
        {
          drawSVG: "0 100%",
          ease: Expo.easeInOut,
        },
        0.25,
        0
      ),
      a.fromTo(
        "#" + e,
        1,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          display: "block",
          ease: Linear.easeNone,
        },
        0.5
      ),
      a.fromTo(
        "#overlayBox",
        1,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          ease: Expo.easeOut,
        },
        0.5
      ),
      a.staggerFromTo(
        "#" + e + " .animate",
        1,
        {
          y: 50,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          ease: Expo.easeOut,
        },
        0.1,
        1
      ),
      a.fromTo(
        ".close .line1",
        1,
        {
          attr: {
            x1: 25,
            y1: 25,
            x2: 25,
            y2: 25,
          },
          stroke: "#FFFFFF",
          autoAlpha: 0,
        },
        {
          attr: {
            x1: 0,
            y1: 0,
            x2: 50,
            y2: 50,
          },
          stroke: colorPrimary,
          autoAlpha: 1,
          ease: Expo.easeInOut,
        },
        1
      ),
      a.fromTo(
        ".close .line2",
        1,
        {
          attr: {
            x1: 25,
            y1: 25,
            x2: 25,
            y2: 25,
          },
          stroke: "#FFFFFF",
          autoAlpha: 0,
        },
        {
          attr: {
            x1: 0,
            y1: 50,
            x2: 50,
            y2: 0,
          },
          stroke: colorPrimary,
          autoAlpha: 1,
          ease: Expo.easeInOut,
        },
        1
      ),
      a.play(0),
      generateGlitch();
  }
}

function toggleInfo(e) {
  infoSection = "";
  if (
    (TweenMax.set("#overlayRing svg", {
      rotation: -90,
      transformOrigin: "center center",
    }),
    TweenMax.set(".close .circles", {
      rotation: -180,
      transformOrigin: "center center",
    }),
    isInfoVisible)
  ) {
    /*Отключаем все что показывали*/
    window.clic_dis();
    window.clic_dis2();
    myElement = document.getElementById("overlayInner");
    for (let i = 0; i < myElement.children.length; i++) {
      myElement.children[i].style.display = "none";
      /*Переключаем внутренние елементы*/
      for (let g = 0; g < myElement.children[i].children.length; g++) {
        if (myElement.children[i].children[g].className == "first_visible")
          try {
            myElement.children[i].children[g].style.removeProperty("display");
          } catch (e) {}
        if (myElement.children[i].children[g].className == "second_visible")
          try {
            myElement.children[i].children[g].style.display = "none";
          } catch (e) {}
      }
    }

    isInfoVisible = !1;
    var a = new TimelineMax({
      paused: !0,
    });
    a.to(
      "#overlay",
      0.5,
      {
        autoAlpha: 0,
        ease: Linear.easeNone,
      },
      0
    ),
      a.staggerTo(
        "#overlayRing .svg-ring",
        0.5,
        {
          drawSVG: "50% 50%",
          ease: Expo.easeInOut,
        },
        0.25,
        0
      ),
      a.play(0);
  } else {
    (infoSection = e), (isInfoVisible = !0);
    var a = new TimelineMax({
      paused: !0,
    });
    a.fromTo(
      "#overlay",
      0.5,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        display: "block",
        ease: Linear.easeNone,
      },
      0
    ),
      a.staggerFromTo(
        "#overlayRing .svg-ring",
        2,
        {
          drawSVG: "50% 50%",
        },
        {
          drawSVG: "0 100%",
          ease: Expo.easeInOut,
        },
        0.25,
        0
      ),
      a.fromTo(
        "#" + e,
        1,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          display: "block",
          ease: Linear.easeNone,
        },
        0.5
      ),
      a.fromTo(
        "#overlayRing",
        1,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          ease: Expo.easeOut,
        },
        0.5
      ),
      a.staggerFromTo(
        "#" + e + " .animate",
        1,
        {
          y: 50,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          ease: Expo.easeOut,
        },
        0.1,
        1
      ),
      a.fromTo(
        ".close .line1",
        1,
        {
          attr: {
            x1: 25,
            y1: 25,
            x2: 25,
            y2: 25,
          },
          stroke: "#FFFFFF",
          autoAlpha: 0,
        },
        {
          attr: {
            x1: 0,
            y1: 0,
            x2: 50,
            y2: 50,
          },
          stroke: colorPrimary,
          autoAlpha: 1,
          ease: Expo.easeInOut,
        },
        1
      ),
      a.fromTo(
        ".close .line2",
        1,
        {
          attr: {
            x1: 25,
            y1: 25,
            x2: 25,
            y2: 25,
          },
          stroke: "#FFFFFF",
          autoAlpha: 0,
        },
        {
          attr: {
            x1: 0,
            y1: 50,
            x2: 50,
            y2: 0,
          },
          stroke: colorPrimary,
          autoAlpha: 1,
          ease: Expo.easeInOut,
        },
        1
      ),
      a.play(0),
      generateGlitch();
  }
}

function getDifference(e, a) {
  return Math.abs(e - a);
}

function checkIsBlack(e) {
  return !(e[0] != e[1] || e[1] != e[2] || 0 !== e[2]);
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

function hexToRgb(e) {
  var a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return a
    ? {
        r: parseInt(a[1], 16),
        g: parseInt(a[2], 16),
        b: parseInt(a[3], 16),
      }
    : null;
}
var cometTotal = 15,
  cometRotation = 24;

function createGlitch(e) {
  TweenMax.set(".cross", {
    autoAlpha: 0,
  }),
    TweenMax.set("#pulseCircle1", {
      rotation: -180,
      transformOrigin: "center center",
    }),
    $("#pulseComets").html("");
  for (var a = 0; a < cometTotal; a++)
    $("#pulseComets").prepend(
      '<div class="pulseComet" id="pulseComet' +
        a +
        '"><div class="pulseTrail"></div><div class="pulseDot"></div></div>'
    ),
      TweenMax.set("#pulseComet" + a, {
        rotation: a * cometRotation,
        transformOrigin: "center bottom",
      });
  e && e();
}

function generateExplosion() {
  console.log("EXPLOSION WOW OVERPOWERIN");
  var e = new TimelineMax({
    paused: !0,
  });
  e.fromTo(
    ringExplosionMesh.scale,
    1,
    {
      x: 1,
      y: 1,
    },
    {
      x: 3,
      y: 3,
      ease: Quint.easeOut,
    },
    0
  ),
    e.fromTo(
      ringExplosionMesh.material,
      0.25,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: Linear.easeNone,
        onStart: function () {
          ringExplosionMesh.visible = !0;
        },
      },
      0
    ),
    e.fromTo(
      ringExplosionMesh.material,
      0.75,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        immediateRender: !1,
        ease: Linear.easeNone,
        onComplete: function () {
          ringExplosionMesh.visible = !1;
        },
      },
      0.25
    ),
    e.timeScale(1),
    e.play(0);
}

function generateGlitch() {
  if (minimapBgCreated) {
    var e = new TimelineMax({
      paused: !0,
    });
    e.to(
      minimapDetails,
      2,
      {
        pixi: {
          tint: colorPrimary,
        },
      },
      0
    ),
      e.fromTo(
        minimapLines,
        2,
        {
          pixi: {
            tint: 16777215,
          },
        },
        {
          pixi: {
            tint: colorPrimary,
          },
          ease: Circ.easeOut,
        },
        0
      ),
      e.fromTo(
        minimapMaskGradient,
        2,
        {
          pixi: {
            scaleX: 0,
          },
        },
        {
          pixi: {
            scaleX: 1.25,
          },
          ease: Expo.easeOut,
        },
        0
      ),
      e.fromTo(
        minimapSpiral,
        2,
        {
          pixi: {
            rotation: 90,
          },
        },
        {
          pixi: {
            rotation: 450,
          },
          ease: Expo.easeOut,
        },
        0
      ),
      e.fromTo(
        minimapSpiral,
        0.1,
        {
          pixi: {
            alpha: 0,
          },
        },
        {
          pixi: {
            alpha: 1,
          },
          immediateRender: !1,
          ease: Linear.easeNone,
        },
        0
      ),
      e.fromTo(
        minimapSpiral,
        0.75,
        {
          pixi: {
            alpha: 1,
          },
        },
        {
          pixi: {
            alpha: 0,
          },
          immediateRender: !1,
          ease: Linear.easeNone,
        },
        0.2
      ),
      e.fromTo(
        minimapMaskGradient,
        2,
        {
          pixi: {
            alpha: 1,
          },
        },
        {
          pixi: {
            alpha: 0,
          },
          ease: Linear.easeNone,
        },
        0.5
      ),
      e.fromTo(
        minimapBlipsGroup,
        0.65,
        {
          pixi: {
            scale: 0,
          },
        },
        {
          pixi: {
            scale: 1,
          },
          ease: Expo.easeOut,
        },
        0
      ),
      e.fromTo(
        minimapBlipArray,
        0.75,
        {
          pixi: {
            alpha: 1,
          },
        },
        {
          pixi: {
            alpha: 0,
          },
          ease: Linear.easeNone,
        },
        0.5
      ),
      e.fromTo(
        minimapSpikesGroup,
        0.75,
        {
          pixi: {
            scale: 0,
          },
        },
        {
          pixi: {
            scale: 1,
          },
          ease: Expo.easeOut,
        },
        0
      ),
      e.fromTo(
        minimapXArray,
        0.75,
        {
          pixi: {
            scaleY: 1,
          },
        },
        {
          pixi: {
            scaleY: 0,
          },
          ease: Circ.easeInOut,
        },
        0.1
      ),
      e.fromTo(
        minimapExtras1,
        3,
        {
          pixi: {
            rotation: 0,
          },
        },
        {
          pixi: {
            rotation: -360,
          },
          ease: Expo.easeOut,
        },
        0
      ),
      e.fromTo(
        minimapExtras1,
        0.1,
        {
          pixi: {
            alpha: 0,
          },
        },
        {
          pixi: {
            alpha: 1,
          },
          ease: Linear.easeNone,
        },
        0
      ),
      e.fromTo(
        minimapExtras1,
        1,
        {
          pixi: {
            alpha: 1,
            tint: 16777215,
          },
        },
        {
          pixi: {
            alpha: 0,
            tint: colorPrimary,
          },
          immediateRender: !1,
          ease: Linear.easeNone,
        },
        0.2
      ),
      e.fromTo(
        minimapExtras2,
        1.5,
        {
          pixi: {
            scale: 0.5,
          },
        },
        {
          pixi: {
            scale: 1.1,
          },
          ease: Expo.easeOut,
        },
        0
      ),
      e.fromTo(
        minimapExtras2,
        0.1,
        {
          pixi: {
            alpha: 0,
          },
        },
        {
          pixi: {
            alpha: 0.5,
          },
          ease: Linear.easeNone,
        },
        0
      ),
      e.fromTo(
        minimapExtras2,
        1,
        {
          pixi: {
            alpha: 0.5,
            tint: 16777215,
          },
        },
        {
          pixi: {
            alpha: 0,
            tint: colorPrimary,
          },
          immediateRender: !1,
          ease: Linear.easeNone,
        },
        0.2
      ),
      e.fromTo(
        minimapXArray,
        1,
        {
          pixi: {
            tint: 16777215,
          },
        },
        {
          pixi: {
            tint: colorPrimary,
          },
          ease: Linear.easeNone,
        },
        0
      ),
      e.fromTo(
        minimapBlipArray,
        1,
        {
          pixi: {
            tint: 16777215,
          },
        },
        {
          pixi: {
            tint: colorPrimary,
          },
          ease: Linear.easeNone,
        },
        0
      ),
      e.timeScale(1.5),
      e.play(0);
  }
  TweenMax.fromTo(
    "#interactive",
    0.25,
    {
      x: generateRandomNumber(-10, 10),
      y: generateRandomNumber(-10, 10),
    },
    {
      x: 0,
      y: 0,
      ease: RoughEase.ease.config({
        strength: 2,
        points: 20,
      }),
    }
  );
  var a = new TimelineMax({
    paused: !0,
    force3D: !0,
  });
  a.set("#glitcher", {
    autoAlpha: 1,
    display: "block",
  }),
    a.fromTo(
      $("#glitcher"),
      0.25,
      {
        x: generateRandomNumber(-15, 15),
        y: generateRandomNumber(-15, 15),
      },
      {
        x: 0,
        y: 0,
        ease: RoughEase.ease.config({
          strength: 5,
          points: 50,
        }),
      },
      0
    ),
    a.set(
      $("#glitcher .minibar"),
      {
        left: generateRandomNumber(0, 90) + "%",
        top: generateRandomNumber(0, 90) + "%",
        width: "25%",
        height: 15,
        autoAlpha: 1,
        ease: Linear.easeNone,
      },
      0
    ),
    a.set(
      $("#glitcher .minibar"),
      {
        left: generateRandomNumber(0, 90) + "%",
        top: generateRandomNumber(0, 90) + "%",
        width: "25%",
        height: 8,
        ease: Linear.easeNone,
      },
      0.05
    ),
    a.set(
      $("#glitcher .minibar"),
      {
        left: generateRandomNumber(0, 90) + "%",
        top: generateRandomNumber(0, 90) + "%",
        width: "10%",
        height: 5,
        ease: Linear.easeNone,
      },
      0.1
    ),
    a.set(
      $("#glitcher .minibar"),
      {
        left: generateRandomNumber(0, 90) + "%",
        top: generateRandomNumber(0, 90) + "%",
        width: "15%",
        height: 5,
        ease: Linear.easeNone,
      },
      0.15
    ),
    a.set(
      $("#glitcher .minibar"),
      {
        left: generateRandomNumber(0, 90) + "%",
        top: generateRandomNumber(0, 90) + "%",
        width: "35%",
        height: 1,
        ease: Linear.easeNone,
      },
      0.2
    ),
    a.set(
      $("#glitcher .minibar"),
      {
        left: generateRandomNumber(0, 90) + "%",
        top: generateRandomNumber(0, 90) + "%",
        width: "10%",
        height: 8,
        ease: Linear.easeNone,
      },
      0.25
    ),
    a.set(
      $("#glitcher .minibar"),
      {
        left: generateRandomNumber(0, 90) + "%",
        top: generateRandomNumber(0, 90) + "%",
        width: "25%",
        height: 8,
        ease: Linear.easeNone,
      },
      0.3
    ),
    a.set(
      $("#glitcher .minibar"),
      {
        autoAlpha: 0,
      },
      0.35
    ),
    a.set(
      "#glitcher",
      {
        autoAlpha: 0,
        display: "none",
        immediateRender: !1,
      },
      1
    ),
    a.timeScale(1.5),
    a.play(0),
    generateExplosion();
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
    checkClick(),
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
      (setRotation("off"), setCameraDirection(initMouseX, e.clientX)));
}

function onDocumentMouseLeave(e) {
  if (!1 !== isGlobeEventsEnabled && (e.preventDefault(), isMouseDown)) {
    if (((isMouseDown = !1), 25 > Math.abs(initMouseX - e.clientX))) return;
    setRotation("off"), setCameraDirection(initMouseX, e.clientX);
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
  (_touchZoomDistanceStart = _touchZoomDistanceEnd = 0),
    setRotation("off"),
    onDocumentMouseUp(e);
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
  ],
  dataMedia = [
    /*["PHOTO", 2, 33.75, -118, "Las Flores, CA, USA", "#"]*/
  ];
$(document).ready(initWebgl);
