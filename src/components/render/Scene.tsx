import React from "react"
import { CameraControls } from "@react-three/drei"
import { Experience } from "./Experience"

import { DirectionalLightControls } from "./lights/DirectionalLightControls"
import { CSMManager } from "./lights/CSMManager"

// Lights
export const Scene = () => {
  return (
    <>
      <CameraControls />
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <Experience />
    </>
  )
}
