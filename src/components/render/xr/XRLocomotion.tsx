import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

import { XROrigin, useXRInputSourceState } from "@react-three/xr"

export const XRLocomotion = ({ originRef, position }) => {
  const leftController = useXRInputSourceState("controller", "left")
  const rightController = useXRInputSourceState("controller", "right")
  const speedMultiplier = useRef(2)
  const yHeightRef = useRef(0)
  const rotationY = useRef(0) // Track camera rotation around Y axis

  useFrame((state, delta) => {
    if (!originRef.current) return

    // Handle right controller joystick for camera rotation
    if (rightController && rightController.inputSource.gamepad) {
      const axes = rightController.inputSource.gamepad.axes
      if (axes && axes.length >= 4) {
        const rightJoystickX = axes[2] // Left/right rotation
        const threshold = 0.2

        if (Math.abs(rightJoystickX) > threshold) {
          const rotationSpeed = 2 * delta
          rotationY.current -= rightJoystickX * rotationSpeed

          // Apply rotation to the XROrigin
          originRef.current.rotation.y = rotationY.current
        }
      }

      // Handle right controller buttons for height and speed
      const buttonRBPressed = rightController.inputSource.gamepad?.buttons[1]?.pressed
      const buttonAPressed = rightController.inputSource.gamepad?.buttons[4]?.pressed

      if (buttonAPressed && speedMultiplier.current !== 5) {
        console.log("Button A pressed - Speed boost")
        speedMultiplier.current = 5
      } else if (!buttonAPressed && speedMultiplier.current !== 2) {
        speedMultiplier.current = 2
      }

      if (buttonRBPressed && yHeightRef.current !== 2) {
        yHeightRef.current = 2
      } else if (!buttonRBPressed && yHeightRef.current !== 0) {
        yHeightRef.current = 0
      }

      originRef.current.position.y = yHeightRef.current
    }

    // Handle left controller joystick for locomotion
    if (leftController && leftController.inputSource.gamepad) {
      const axes = leftController.inputSource.gamepad.axes
      if (axes && axes.length >= 4) {
        const joystickX = axes[2] // Left/right strafe
        const joystickY = axes[3] // Forward/backward

        // Only move if joystick is pushed significantly
        const threshold = 0.2
        if (Math.abs(joystickX) > threshold || Math.abs(joystickY) > threshold) {
          const speed = speedMultiplier.current * delta * 5

          // Get current rotation and calculate forward/right based on it
          const forward = new THREE.Vector3(0, 0, -1)
          forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationY.current)

          const right = new THREE.Vector3(1, 0, 0)
          right.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationY.current)

          // Calculate movement based on joystick input
          const movement = new THREE.Vector3()
          movement.addScaledVector(forward, -joystickY * speed)
          movement.addScaledVector(right, joystickX * speed)

          originRef.current.position.add(movement)
        }
      }
    }
  })

  return <XROrigin ref={originRef} position={position} />
}
