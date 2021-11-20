import "./style.css";
import * as THREE from "three";
import React, { Component } from "react";
import ReactDOM from "react-dom";

//animation
import gsap from "gsap";
// import { EffectComposer } from "../../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "../../../node_modules/three/examples/jsm/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "../../../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";

//camera movement
import { OrbitControls } from "../../../node_modules/three/examples/jsm/controls/OrbitControls.js";

import moonColorImage from "./static/textures/moon/color.jpg";
import moonNormalImage from "./static/textures/moon/normal.jpg";

import mercuryColorImage from "./static/textures/mercury/mercuryColor.jpg";
import mercuryBumpImage from "./static/textures/mercury/mercuryBump.jpg";

import venusColorImage from "./static/textures/venus/venusColor.jpg";
import venusBumpImage from "./static/textures/venus/venusBump.jpg";

import earthColorImage from "./static/textures/earth/earthColor.jpg";
import earthBumpImage from "./static/textures/earth/earthBump.jpg";
import earthCloudImage from "./static/textures/earth/earthCloud.png";

import marsColorImage from "./static/textures/mars/marsColor.jpg";
import marsBumpImage from "./static/textures/mars/marsBump.jpg";

import jupiterColorImage from "./static/textures/jupiter/jupiterColor.jpg";
import jupiterBumpImage from "./static/textures/jupiter/jupiterBump.jpg";

//saturn and uranus need rings
import saturnColorImage from "./static/textures/saturn/saturnColor.jpg";
import saturnBumpImage from "./static/textures/saturn/saturnBump.jpg";
import saturnRingColorImage from "./static/textures/saturn/saturnRingColor.png";
//import saturnRingPatternImage from "./static/textures/saturn/saturnRingPattern.jpg";

import uranusColorImage from "./static/textures/uranus/uranusColor.jpg";
import uranusBumpImage from "./static/textures/uranus/uranusBump.jpg";
import uranusRingColorImage from "./static/textures/uranus/uranusRingColor.png";
//import uranusRingPatternImage from "./static/textures/uranus/uranusRingPattern.jpg";

import neptuneColorImage from "./static/textures/neptune/neptuneColor.jpg";
import neptuneBumpImage from "./static/textures/neptune/neptuneBump.jpg";

import plutoColorImage from "./static/textures/pluto/plutoColor.jpg";
import plutoBumpImage from "./static/textures/pluto/plutoBump.jpg";

import sunColorImage from "./static/textures/sun/sunColor.jpg";

import starsColorImage from "./static/stars.png";

import dat from "dat.gui";

class Planets extends Component {
  componentDidMount() {
    //------------------LOADING TEXTURES---------------
    const textureLoader = new THREE.TextureLoader();
    const gui = new dat.GUI();

    // const moonColorTexture = textureLoader.load(moonColorImage);
    // const moonNormalTexture = textureLoader.load(moonNormalImage);

    const mercuryColorTexture = textureLoader.load(mercuryColorImage);
    const mercuryBumpTexture = textureLoader.load(mercuryBumpImage);

    const venusColorTexture = textureLoader.load(venusColorImage);
    const venusBumpTexture = textureLoader.load(venusBumpImage);

    const earthColorTexture = textureLoader.load(earthColorImage);
    const earthBumpTexture = textureLoader.load(earthBumpImage);
    const earthCloudTexture = textureLoader.load(earthCloudImage);

    const marsColorTexture = textureLoader.load(marsColorImage);
    const marsBumpTexture = textureLoader.load(marsBumpImage);

    const jupiterColorTexture = textureLoader.load(jupiterColorImage);
    const jupiterBumpTexture = textureLoader.load(jupiterBumpImage);

    const saturnColorTexture = textureLoader.load(saturnColorImage);
    const saturnBumpTexture = textureLoader.load(saturnBumpImage);
    const saturnRingColorTexture = textureLoader.load(saturnRingColorImage);
    //const saturnRingPatternTexture = textureLoader.load(saturnRingPatternImage);

    const uranusColorTexture = textureLoader.load(uranusColorImage);
    const uranusBumpTexture = textureLoader.load(uranusBumpImage);
    const uranusRingColorTexture = textureLoader.load(uranusRingColorImage);
    //const uranusRingPatternTexture = textureLoader.load(uranusRingPatternImage);

    const neptuneColorTexture = textureLoader.load(neptuneColorImage);
    const neptuneBumpTexture = textureLoader.load(neptuneBumpImage);

    const plutoColorTexture = textureLoader.load(plutoColorImage);
    const plutoBumpTexture = textureLoader.load(plutoBumpImage);

    const sunColorTexture = textureLoader.load(sunColorImage);

    const planetTextures = {
      0: [mercuryColorTexture, mercuryBumpTexture],
      1: [venusColorTexture, venusBumpTexture],
      2: [earthColorTexture, earthBumpTexture],
      3: [marsColorTexture, marsBumpTexture],
      4: [jupiterColorTexture, jupiterBumpTexture],
      5: [saturnColorTexture, saturnBumpTexture],
      6: [uranusColorTexture, uranusBumpTexture],
      7: [neptuneColorTexture, neptuneBumpTexture],
      8: [plutoColorTexture, plutoBumpTexture],
    };

    const starsTexture = textureLoader.load(starsColorImage);

    //-------------------SCENE SETUP----------------
    const scene = new THREE.Scene();

    //----------------------MOON-------------------
    //const material = new THREE.MeshStandardMaterial();
    // material.map = moonColorTexture;
    // material.normalMap = moonNormalTexture; //adds details
    // material.normalScale.set(0.3, 0.3);

    // const moon = new THREE.Mesh(
    //   new THREE.SphereBufferGeometry(1, 32, 32),
    //   material
    // );

    // scene.add(moon);

    //-----------------------SUN---------------------------
    //sun object
    const sunGeometry = new THREE.SphereBufferGeometry(30, 50, 50);
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunColorTexture });

    // const sunMaterial = new THREE.ShaderMaterial({
    //   vertexShader: vertexShader,
    //   fragmentShader: fragmentShader,
    //   uniforms: {
    //     uFrequency: { value: new THREE.Vector2(10, 5) },
    //     uTime: { value: 0 },

    //     uColor: { value: new THREE.Color("orange") },
    //     uTexture: { value: flagTexture },
    //   },
    // });

    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunMesh.position.set(-36, 0, 0);
    scene.add(sunMesh);

    //------------------------EARTH-----------------------
    // //earth geometry
    // const earthGeometry = new THREE.SphereGeometry(1, 32, 32);

    // //earth material
    // const earthMaterial = new THREE.MeshPhongMaterial({
    //   roughness: 1,
    //   metalness: 0,
    //   map: earthColorTexture,
    //   bumpMap: earthBumpTexture,
    //   bumpScale: 0.3,
    // });

    // //earthMesh
    // const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    // earthMesh.receiveShadow = true;
    // earthMesh.castShadow = true;

    // earthMesh.position.set(2, 3, 0);
    // scene.add(earthMesh);

    //------------------------PLANETS-----------------------
    const planetsMeshArray = [];

    const createPlanet = function () {
      for (let i = 0; i < 9; i++) {
        const planetGeometry = new THREE.SphereBufferGeometry(1, 32, 32);

        const planetMaterial = new THREE.MeshStandardMaterial({
          roughness: 1,
          metalness: 0,
          map: planetTextures[i][0],
          bumpMap: planetTextures[i][1],
          bumpScale: 0.05,
        });

        //add ring for saturn and uranus
        if (i === 5 || i === 6) {
          const ringGeometry = new THREE.RingGeometry(3, 4, 50, 1, 0, 7);

          const ringMaterial = new THREE.MeshStandardMaterial({
            map: i === 5 ? saturnRingColorTexture : uranusRingColorTexture,
            side: THREE.DoubleSide,
          });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.scale.set(0.4, 0.4, 1);
          scene.add(ring);
          ring.position.set(i * 5, 0, 0);
          ring.rotation.set(2, 3, 2);
        }

        //adding clouds to earth
        // if (i === 2) {
        //   const cloudgeometry = new THREE.SphereGeometry(1, 32, 32);

        //   const cloudMaterial = new THREE.MeshPhongMaterial({
        //     map: earthCloudTexture,
        //     transparent: true,
        //   });

        //   const cloud = new THREE.Mesh(cloudgeometry, cloudMaterial);
        //   cloud.position.set(i * 3, 0, 0);
        //   scene.add(cloud);
        // }

        const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        planetMesh.receiveShadow = true;
        planetMesh.castShadow = true;

        planetMesh.position.set(i * 5, 0, 0);
        scene.add(planetMesh);
        planetsMeshArray.push(planetMesh);
      }
    };
    createPlanet();

    //------------------------STARS---------------------
    const starGeometry = new THREE.SphereGeometry(80, 64, 64);

    const starMaterial = new THREE.MeshBasicMaterial({
      map: starsTexture,
      side: THREE.BackSide,
      transparent: true,
    });

    const starMesh = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(starMesh);

    //--------------------LIGHTS-----------------------
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientlight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.castShadow = true;
    pointLight.position.set(-5, 3, 0);
    scene.add(pointLight);

    //-------------------RESPONSIVE DESIGN----------------
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    //--------------------CAMERA-----------------
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(-5, 0, 3);
    scene.add(camera);

    //--------------------CAMERA CONTROLS----------------
    // const controls = new OrbitControls(camera, document.getElementById("root"));
    // controls.enableDamping = true;

    //-----------------------RENDERER-------------------
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    this.mount.appendChild(renderer.domElement);

    //-------------------ANIMATE CAMERA----------------

    // prettier-ignore
    const cameraX = {
      "mercure": -1.4,
      "venus": 3.8,
      "terre": 8.8,
      "mars": 13.9,
      "jupiter": 18.8,
      "saturne": 23.9,
      "uranus": 28.8,
      "neptun": 33.8,
      "pluto": 38.8,
    };

    // //equaRadius
    // if (this.props.planets) {
    //   console.log(this.props.planets);
    // }

    const animateCamera = function (id) {
      gsap.to(camera.position, {
        duration: 3,
        x: cameraX[id],
        y: 0,
        z: 3,
        ease: "power3.inOut",
      });
    };

    animateCamera("terre");

    camera.rotation.y = -1;

    const clock = new THREE.Clock();
    //--------------------ANIMATION------------------
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      //moon.rotation.y = 0.1 * elapsedTime;
      //starMesh.rotation.y += 0.0005;

      for (let i = 0; i < 9; i++) {
        planetsMeshArray[i].rotation.y = 0.1 * elapsedTime;
      }

      // controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };

    tick();
  }
  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Planets />, rootElement);

export default Planets;
