import React, { useEffect, useRef, useState } from "react";
import { useBox } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";
import { useGLTF } from "@react-three/drei";
import getRandomInt from "../utils/getRandomInt";

export default function Pig({ roll, pigNum }) {
  const startLocation = [pigNum, 2 + pigNum * 2, 0];
  // const startLocation = [0, 1, 0];

  const [ref, api] = useBox(() => ({
    mass: 3,
    position: startLocation,
    velocity: [0, 0, 0],
  }));

  useEffect(() => {
    console.log("Called with roll: ", roll);
    // api.position.set(startLocation[0], startLocation[1], startLocation[2]);
    api.velocity.set(
      getRandomInt(3, 10),
      getRandomInt(3, 10),
      getRandomInt(3, 10)
    );
    api.angularVelocity.set(
      getRandomInt(3, 10),
      getRandomInt(3, 10),
      getRandomInt(3, 10)
    );
  }, [roll, api]);

  const texture = useLoader(
    TextureLoader,
    "http://127.0.0.1:8000/src/lowpoly_pig/textures/Material_25_baseColor.jpeg"
  );
  const { nodes, materials } = useGLTF(
    "http://127.0.0.1:8000/src/lowpoly_pig/scene.gltf"
  );
  console.log(nodes);
  console.log(materials);
  useFrame(() => {
    ref.current.rotation.x = 5.09;
  });

  return (
    <group
      ref={ref}
      position={[0, 10, 0]}
      onClick={() => {
        api.velocity.set(0, 5, 0);
      }}
    >
      <mesh
        visible
        geometry={nodes["Mesh_1244_Material_#25_0"].geometry}
        material={materials["Material_25"]}
      />
    </group>
  );
}
