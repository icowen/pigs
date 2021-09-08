import React from "react";
import { usePlane } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import url from "../utils/url";
import * as THREE from "three";

export default function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    mass: 0,
  }));

  const texture = useLoader(TextureLoader, `${url}/grass.jpeg`);

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      {texture && <meshPhongMaterial attach="material" map={texture} />}
      {/* <meshLambertMaterial
        attach="material"
        transparent={true}
        // opacity={0}
      /> */}
    </mesh>
  );
}
