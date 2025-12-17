import { useState, useRef } from "react"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { XRLocomotion } from "./XRLocomotion"
import { XR, createXRStore } from "@react-three/xr"

const store = createXRStore({
  controller: {
    left: true,
    right: true,
    rayPointer: true,
    // teleportPointer: true,
  },
  hand: { teleportPointer: true },
  frameRate: "high",
})

const Scene = () => {
  const [position, setPosition] = useState(new THREE.Vector3())
  const [ready, setReady] = useState(false)
  const originRef = useRef(null)
  function handleClick() {
    setReady(true)
    store.enterVR()
  }

  return (
    <>
      <button onClick={handleClick} className="xr-button">
        Enter VR
      </button>

      <Canvas
        //
        gl={{ alpha: true, antialias: true }}
        id={"webgl-canvas"}
        dpr={[1, 2]}
        frameloop="always"
        // shadows
      >
        <XR store={store}>
          <color attach="background" args={["#e8ae8c"]} />
          <XRLocomotion originRef={originRef} position={position} />

          {/* <PerspectiveCamera makeDefault position={[0, 0, 40]} fov={75} near={0.1} far={1000} /> */}
        </XR>
      </Canvas>
    </>
  )
}

export default Scene
