import './main.scss'

import * as THREE from 'three';
import {add} from './wow.rs';
console.log(add(2, 3));

let camera, scene, renderer;
let geometry, material, mesh;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

}

let hello = document.createElement('div');
hello.id = "hello";
document.body.appendChild(hello);

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x = add(mesh.rotation.x, 0.01);
    mesh.rotation.y = add(mesh.rotation.y, 0.02);

    if (hello) {
        hello.innerText = `Hello from Rust! New rotation: {
            x: ${mesh.rotation.x},
            y: ${mesh.rotation.y}
    }`;
    }

    renderer.render( scene, camera );
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
