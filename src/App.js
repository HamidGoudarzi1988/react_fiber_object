import React, { useRef, useState } from 'react';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {Canvas, useFrame, extend, useThree} from 'react-three-fiber'
import {useSpring, a} from 'react-spring/three';
import * as THREE from 'three'
import './App.css'

  extend({OrbitControls})
  



  const Controls=()=>{
    const orbitRef = useRef()
    const {camera, gl} = useThree();

    useFrame(()=>{
      orbitRef.current.update()

    })
    return(
      <orbitControls
      args={[camera, gl.domElement]}
      ref ={orbitRef}
      autoRotate
      maxPolarAngle={Math.PI/2}
      minPolarAngle={Math.PI/3}
      />
    )
  }


  const Plane = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,-0.5,0]} receiveShadow>
       <planeBufferGeometry
            attach = 'geometry'
            args = {[100,100]}
          /> 
          <meshPhysicalMaterial
            attach='material'
            color='grey'
            
          />
    </mesh>
  )
  
const Box = ()=>{
  
  // const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
     scale : active ? [1.5,1.5,1.5]: [1,1,1],
     color : hovered ? '#005C69' : '#FF3D00'

  })

  // useFrame(()=>{
  //   meshRef.current.rotation.y += 0.01;

  // })



    return (
      <a.mesh 
            // ref = {meshRef}
            onPointerOver={()=> setHovered(true)} 
            onPointerOut={()=> setHovered(false)}
            onClick={()=> setActive(!active)}
           scale={props.scale}
           castShadow
            > 
          <boxBufferGeometry
            attach = 'geometry'
            args = {[1,1,1]}
          /> 
          <a.meshPhysicalMaterial
            attach='material'
            color={props.color}
            
          />
          <ambientLight/>
          <spotLight position={[0,5,10]} penumbra={1} castShadow/>
          
        </a.mesh>
    )
}


export default () => (

  <Canvas camera={{position:[5,0,0]}} onCreated={({ gl })=>{
    gl.shadowMap.enabled = true 
    gl.shadowMap.type = THREE.PCFSoftShadowMap

  }}>
    <fog 
      attach='fog' 
      args={['white', 5, 15]} 
      />
    <Plane/>
    <Controls/>
    <Box/>
  </Canvas>
)