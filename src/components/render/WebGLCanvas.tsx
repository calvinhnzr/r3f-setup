// @ts-nocheck
import React, { use, useEffect, useState, useRef } from "react"
import * as THREE from "three/webgpu"
import { Canvas, extend, type ThreeToJSXElements, useFrame, useThree } from "@react-three/fiber"
import { Scene } from "./Scene"

const WebGLCanvas = () => {
  return (
    <>
      <Canvas
        //
        id={"webgl-canvas"}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <Scene />
        <color attach="background" args={["#787878"]} />
      </Canvas>
    </>
  )
}

export default WebGLCanvas
