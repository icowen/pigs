import React, { useCallback, useEffect, useRef, useState } from "react";
import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import getRandomInt from "../utils/getRandomInt";
import url from "../utils/url";
import { useFrame, useThree } from "@react-three/fiber";
import {
  getPigRotation,
  rollPig,
  updateRotationAndPosition,
} from "../utils/pigRolls";

export default function Pig({ roll, pigNum, isSpinning }) {
  const startPosition = [pigNum * 15 - 10, 0, 0];

  const targets = useRef();
  const animationTime = useRef();
  const animationRef = useRef();
  const previousTimeRef = useRef();
  const { nodes, materials } = useGLTF(`${url}/lowpoly_pig/scene.gltf`);

  const ref = useRef();
  const groupRef = useRef();

  const animate = (currentTime) => {
    const refRotation = ref.current?.rotation;
    const targetRotation = targets.current.ref?.rotation;

    const delta = previousTimeRef.current
      ? currentTime - previousTimeRef.current
      : 0;
    previousTimeRef.current = currentTime;

    const dt =
      animationTime.current >= 1
        ? 1 - (animationTime.current - delta * 0.001)
        : delta * 0.001;

    // console.log(dt);
    // console.log(delta);
    // console.log("Animation time:", animationTime.current);
    // console.log("RefRotation:", refRotation);
    // console.log("targetRotation:", targetRotation);
    if (dt > 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationTime.current > 1) {
      animationTime.current = 0;
      ref.current.rotation.x += (targetRotation.x - refRotation.x) * dt;
      ref.current.rotation.y += (targetRotation.y - refRotation.y) * dt;
      ref.current.rotation.z += (targetRotation.z - refRotation.z) * dt;

      groupRef.current.rotation.x +=
        (targets.current.groupRef.rotation.x - groupRef.current.rotation.x) *
        dt;
      groupRef.current.rotation.y +=
        (targets.current.groupRef.rotation.y - groupRef.current.rotation.y) *
        dt;
      groupRef.current.rotation.z +=
        (targets.current.groupRef.rotation.z - groupRef.current.rotation.z) *
        dt;

      groupRef.current.position.x +=
        (targets.current.groupRef.position.x - groupRef.current.position.x) *
        dt;
      groupRef.current.position.y +=
        (targets.current.groupRef.position.y - groupRef.current.position.y) *
        dt;
      groupRef.current.position.z +=
        (targets.current.groupRef.position.z - groupRef.current.position.z) *
        dt;
      animationRef.current = undefined;
    } else if (refRotation && targetRotation) {
      ref.current.rotation.x += targetRotation.x * dt;
      ref.current.rotation.y += targetRotation.y * dt;
      ref.current.rotation.z += targetRotation.z * dt;

      groupRef.current.rotation.x += targets.current.groupRef.rotation.x * dt;
      groupRef.current.rotation.y += targets.current.groupRef.rotation.y * dt;
      groupRef.current.rotation.z += targets.current.groupRef.rotation.z * dt;

      groupRef.current.position.x += targets.current.groupRef.position.x * dt;
      groupRef.current.position.y += targets.current.groupRef.position.y * dt;
      groupRef.current.position.z += targets.current.groupRef.position.z * dt;

      animationTime.current += dt;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (isSpinning) {
      ref.current.rotation.z = (elapsedTime * 2 + pigNum) % (2 * Math.PI);
      ref.current.rotation.x = (elapsedTime * 2 + pigNum) % (2 * Math.PI);
      ref.current.rotation.y = (elapsedTime * 2 + pigNum) % (2 * Math.PI);

      groupRef.current.position.x += Math.cos(elapsedTime * 4 + pigNum) / 10;
      groupRef.current.position.y += Math.sin(elapsedTime * 3 + pigNum);
      groupRef.current.position.z += Math.sin(elapsedTime * 3);
    }
  });

  // useCallback(() => {
  //   if (roll && ref.current.rotation)
  //     updateRotationAndPosition(ref, groupRef, 0.01, targets);
  // }, [roll]);

  useEffect(() => {
    console.log("Roll:", roll);
    console.log("isSpinning:", isSpinning);
    if (roll) {
      const newTargets = rollPig(startPosition, ref, groupRef);
      console.log(newTargets);
      targets.current = newTargets;
      animationTime.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }
    // else {
    //   if (ref.current.rotation)
    //     updateRotationAndPosition(ref, groupRef, 0.01, targets);
    // }
    // if (!roll) {
    //   // groupRef.current.position.x = startPosition[0];
    //   // groupRef.current.position.y = startPosition[1];
    //   // groupRef.current.position.z = startPosition[2];
    //   // setTimeSinceRoll(0);
    // }

    return () => cancelAnimationFrame(animationRef.current);
  }, [roll, isSpinning]);

  return (
    <group position={[0, 0, 0]}>
      <group ref={groupRef} position={startPosition}>
        <mesh
          ref={ref}
          visible
          material={materials["Material_25"]}
          geometry={nodes["Mesh_1244_Material_#25_0"].geometry}
        />
      </group>
    </group>
  );
}

useGLTF.preload(`${url}/lowpoly_pig/scene.gltf`);
