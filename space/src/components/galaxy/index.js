import "./style.css";
import * as THREE from "three";
import React, { Component } from "react";
import ReactDOM from "react-dom";

//debugging
import * as dat from "dat.gui";

//animation
import gsap from "gsap";
// import { EffectComposer } from "../../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "../../../node_modules/three/examples/jsm/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "../../../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";

//camera movement
import { OrbitControls } from "../../../node_modules/three/examples/jsm/controls/OrbitControls.js";

import moonColorImage from "./static/textures/moon/color.jpg";
import moonNormalImage from "./static/textures/moon/normal.jpg";

import starsColorImage from "./static/stars.png";

const explore = document.createElement("button");
explore.innerHTML = "start exploring";
explore.style.position = "absolute";

class Galaxy extends Component {
  componentDidMount() {
    //--------------------DEBUGGING-------------------
    const gui = new dat.GUI();

    //------------------LOADING TEXTURES---------------
    const textureLoader = new THREE.TextureLoader();
    const moonColorTexture = textureLoader.load(moonColorImage);
    const moonNormalTexture = textureLoader.load(moonNormalImage);

    const starsTexture = textureLoader.load(starsColorImage);

    //-------------------SCENE SETUP----------------
    const scene = new THREE.Scene();

    // const material = new THREE.MeshStandardMaterial();

    // material.map = moonColorTexture;
    // material.normalMap = moonNormalTexture; //adds details
    // material.normalScale.set(0.3, 0.3);

    // const moon = new THREE.Mesh(
    //   new THREE.SphereBufferGeometry(1, 100, 100),
    //   material
    // );

    // scene.add(moon);

    //--------------------GALAXY------------------
    const parameters = {
      count: 100000,
      size: 0.015,
      radius: 5, //how long the galaxy is
      branches: 6,
      spin: 1,
      randomness: 0.2,
      randomnessPower: 3, //how much particles at the center
      insideColor: "#ff6030",
      outsideColor: "#1b3984",
    };

    let particlesGeometry = null;
    let particlesMaterial = null;
    let particles = null;

    const randomAxis = function (radius) {
      return (
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius
      );
    };

    const generateAnimatedGalaxy = function () {
      //--------------DESTORY OLD GALAXIES------------
      if (particles !== null) {
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        scene.remove(particles);
      }

      //------------------GEOMETRY--------------------
      particlesGeometry = new THREE.BufferGeometry();

      //attributes
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);
      const scales = new Float32Array(parameters.count * 1);
      const randomness = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        //---------------POSITION---------------
        const radius = Math.random() * parameters.radius;

        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX = randomAxis(radius);
        const randomY = randomAxis(radius);
        const randomZ = randomAxis(radius);

        // positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        // positions[i3 + 1] = randomY;
        // positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        positions[i3] = Math.cos(branchAngle) * radius;
        positions[i3 + 1] = 0.0;
        positions[i3 + 2] = Math.sin(branchAngle) * radius;

        //randomness
        randomness[i3] = randomX;
        randomness[i3 + 1] = randomY;
        randomness[i3 + 2] = randomZ;

        //---------------COLOR------------------
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;

        //---------------SCALE------------------
        scales[i] = Math.random();
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      particlesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );
      particlesGeometry.setAttribute(
        "aScale",
        new THREE.BufferAttribute(scales, 1)
      );

      particlesGeometry.setAttribute(
        "aRandomness",
        new THREE.BufferAttribute(randomness, 3)
      );

      //------------------MATERIAL--------------------
      particlesMaterial = new THREE.ShaderMaterial({
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,

        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 30 * renderer.getPixelRatio() },
        },

        vertexShader: `
            uniform float uSize;
            uniform float uTime;

            attribute float aScale;
            attribute vec3 aRandomness;

            varying vec3 vColor;

            void main(){
                //position
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);

                //spin
                float angle = atan(modelPosition.x, modelPosition.z);
                float distanceToCenter = length(modelPosition.xz);
                float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
                angle += angleOffset;

                //animated galaxy
                modelPosition.x = cos(angle) * distanceToCenter;
                modelPosition.z = sin(angle) * distanceToCenter;

                //randomness
                modelPosition.xyz += aRandomness;


                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectedPosition = projectionMatrix * viewPosition;
                gl_Position = projectedPosition;

                //size
                gl_PointSize = uSize * aScale;

                //getting size attenetion (particles closer to the camera will be bigger)
                gl_PointSize *= (1.0 / -viewPosition.z);


                //sending variables
                vColor = color;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;

            void main(){

                //----------1 way of drawing circles-----------------
                //distance to the center
                //float strenght = distance(gl_PointCoord, vec2(0.5));

                //sharpening the edges
                //strenght = step(0.5, strenght);

                //drawing circles instead of squares
                //strenght = 1.0 - strenght;


                //--------------2 way of drawing circles------------------
                //diffuse point
                // float strenght = distance(gl_PointCoord, vec2(0.5));
                // strenght *= 2.0;
                // strenght = 1.0 - strenght;


                //--------------3 way of drawing circles------------------
                //light point
                float strenght = distance(gl_PointCoord, vec2(0.5));
                strenght = 1.0 - strenght;
                strenght = pow(strenght, 10.0);

                //mixing colors
                vec3 color = mix(vec3(0.0), vColor, strenght);
                gl_FragColor = vec4(color,1.0);
            }
        `,
      });

      //------------------POINTS--------------------
      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
    };

    const generateStaticGalaxy = function () {
      //--------------DESTORY OLD GALAXIES------------
      if (particles !== null) {
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        scene.remove(particles);
      }

      //------------------GEOMETRY--------------------
      particlesGeometry = new THREE.BufferGeometry();

      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        //---------------POSITION---------------
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin; //the farther from the center the more spin

        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX = randomAxis(radius);
        const randomY = randomAxis(radius);
        const randomZ = randomAxis(radius);

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * radius + randomZ;

        //---------------COLOR------------------
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      particlesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );

      //------------------MATERIAL--------------------
      particlesMaterial = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });

      //------------------POINTS--------------------
      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
    };
    generateStaticGalaxy();

    //------------------------STARS---------------------
    // galaxy geometry
    const starGeometry = new THREE.SphereGeometry(80, 64, 64);

    // galaxy material
    const starMaterial = new THREE.MeshBasicMaterial({
      map: starsTexture,
      side: THREE.BackSide,
      transparent: true,
    });

    // galaxy mesh
    const starMesh = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(starMesh);

    //--------------------LIGHTS-----------------------
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientlight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.castShadow = true;
    pointLight.position.set(3, 3, 3);
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
    camera.position.set(1, 4, 8);
    scene.add(camera);

    //-------------------ANIMATE CAMERA----------------
    //explore animation
    let explorer = false;

    explore.addEventListener("click", () => {
      if (!gsap.isTweening(camera.position)) {
        gsap.to(camera.position, {
          duration: 1,
          z: explorer ? 20 : 4,
          ease: "power3.inOut",
        });
        explore.innerHTML = explorer ? "start exploring" : "go back";
        explorer = !explorer;
      }
    });

    //--------------------CAMERA CONTROLS----------------
    const controls = new OrbitControls(camera, document.getElementById("root"));
    controls.enableDamping = true;

    //-----------------------DEBUGGING----------------------
    // gui
    //   .add(parameters, "count", 100, 100000, 100)
    //   .onFinishChange(genenateGalaxy);
    // gui
    //   .add(parameters, "size", 0.001, 0.1, 0.001)
    //   .onFinishChange(genenateGalaxy);
    // gui
    //   .add(parameters, "radius", 0.01, 20, 0.01)
    //   .onFinishChange(genenateGalaxy);
    // gui.add(parameters, "branches", 2, 20, 1).onFinishChange(genenateGalaxy);
    // gui.add(parameters, "spin", -5, 5, 0.001).onFinishChange(genenateGalaxy);
    // gui
    //   .add(parameters, "randomness", 0, 2, 0.001)
    //   .onFinishChange(genenateGalaxy);
    // gui
    //   .add(parameters, "randomnessPower", 1, 10, 0.001)
    //   .onFinishChange(genenateGalaxy);
    // gui.addColor(parameters, "insideColor").onFinishChange(genenateGalaxy);
    // gui.addColor(parameters, "outsideColor").onFinishChange(genenateGalaxy);

    //-----------------------RENDERER-------------------
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    this.mount.appendChild(renderer.domElement);

    //generateAnimatedGalaxy();

    const clock = new THREE.Clock();
    //--------------------ANIMATION------------------
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      //moon.rotation.y = 0.1 * elapsedTime;

      //particlesMaterial.uniforms.uTime.value = elapsedTime;

      controls.update();
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
ReactDOM.render(<Galaxy />, rootElement);
rootElement.appendChild(explore);

export default Galaxy;
