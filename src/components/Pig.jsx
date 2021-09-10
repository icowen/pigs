import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { rollPig } from "../utils/pigRolls";
import url from "../utils/url";

export default function Pig({ roll, pigNum, isSpinning, position }) {
  const startPosition = [pigNum * 15 - 10, 20, 0];

  const targets = useRef();
  const animationTime = useRef();
  const animationRef = useRef();
  const previousTimeRef = useRef();
  const { nodes, materials } = useGLTF(`${url}/lowpoly_pig/scene.gltf`);

  const ref = useRef();
  const groupRef = useRef();

  const movePig = (dt) => {
    const targetRotation = targets.current.ref?.rotation;

    ref.current.rotation.x += (targetRotation.x * dt) % (Math.PI * 2);
    ref.current.rotation.y += (targetRotation.y * dt) % (Math.PI * 2);
    ref.current.rotation.z += (targetRotation.z * dt) % (Math.PI * 2);

    groupRef.current.rotation.x +=
      (targets.current.groupRef.rotation.x * dt) % (Math.PI * 2);
    groupRef.current.rotation.y +=
      (targets.current.groupRef.rotation.y * dt) % (Math.PI * 2);
    groupRef.current.rotation.z +=
      (targets.current.groupRef.rotation.z * dt) % (Math.PI * 2);

    groupRef.current.position.x += targets.current.groupRef.position.x * dt;
    groupRef.current.position.y += targets.current.groupRef.position.y * dt;
    groupRef.current.position.z += targets.current.groupRef.position.z * dt;
  };

  const animate = (currentTime) => {
    const refRotation = ref.current?.rotation;

    const delta = previousTimeRef.current
      ? currentTime - previousTimeRef.current
      : 0;
    previousTimeRef.current = currentTime;

    const dt =
      animationTime.current >= 1
        ? 1 - (animationTime.current - delta * 0.001)
        : delta * 0.001;

    if (dt > 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationTime.current > 1) {
      movePig(dt);
      animationTime.current = 0;
    } else if (refRotation && targets.current.ref?.rotation) {
      movePig(dt);
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

  useEffect(() => {
    if (position) {
      const newTargets = rollPig(startPosition, ref, groupRef, position);
      targets.current = newTargets;
      animationTime.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [position]);

  useEffect(() => {
    // if (roll) {
    //   const newTargets = rollPig(startPosition, ref, groupRef);
    //   targets.current = newTargets;
    //   animationTime.current = 0;
    //   animationRef.current = requestAnimationFrame(animate);
    // }

    if (isSpinning) {
      groupRef.current.position.x = startPosition[0];
      groupRef.current.position.y = startPosition[1];
      groupRef.current.position.z = startPosition[2];

      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.y = 0;
      groupRef.current.rotation.z = 0;

      ref.current.position.x = 0;
      ref.current.position.y = 0;
      ref.current.position.z = 0;
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isSpinning]);

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
