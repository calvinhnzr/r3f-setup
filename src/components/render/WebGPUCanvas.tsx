// @ts-nocheck
import React, { use, useEffect, useState, useRef } from "react"
import * as THREE from "three/webgpu"
import { Canvas, extend, type ThreeToJSXElements, useFrame, useThree } from "@react-three/fiber"
import { Scene } from "./Scene"

declare module "@react-three/fiber" {
  interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
}
extend(THREE as any)

const WebGPUCanvas = () => {
  return (
    <>
      <Canvas
        id="webgpu-canvas"
        shadows={{ type: THREE.PCFSoftShadowMap }}
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer({
            ...(props as unknown as ConstructorParameters<typeof THREE.WebGPURenderer>[0]),
            antialias: true,
            forceWebGL: false,
            alpha: true,
            // sortObjects: true,
            // autodepth: false,
          })
          // console.log(forceWebGL)
          // console.log(props.canvas.attributes)
          await renderer.init()
          return renderer
        }}
      >
        <Scene />
        <color attach="background" args={["#787878"]} />
      </Canvas>
    </>
  )
}

export default WebGPUCanvas
