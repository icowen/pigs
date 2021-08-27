import React, { useEffect, useRef, useState } from "react";
import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import getRandomInt from "../utils/getRandomInt";
import url from "../utils/url";
import { useFrame } from "@react-three/fiber";
import { getPigRotation } from "../utils/pigRolls";

export default function Pig({ roll, pigNum }) {
  const startPosition = [pigNum * 15 - 10, 0, 0];
  const [position, setPosition] = useState(startPosition);

  const { nodes, materials } = useGLTF(`${url}/lowpoly_pig/scene.gltf`);

  const geo = nodes["Mesh_1244_Material_#25_0"].geometry;

  const ref = useRef();

  // const [ref, api] = useBox(() => ({
  //   mass: 1,
  //   position: startLocation,
  //   velocity: [0, 0, 0],
  //   args: [
  //     (geo.boundingBox.max.x - geo.boundingBox.min.x) / 2,
  //     (geo.boundingBox.max.y - geo.boundingBox.min.y) / 2,
  //     (geo.boundingBox.max.z - geo.boundingBox.min.z) / 2,
  //   ],
  // }));

  useFrame(({ clock }) => {
    if (!roll) {
      ref.current.rotation.z = clock.getElapsedTime() * 5 + pigNum;
      ref.current.rotation.x = clock.getElapsedTime() * 6 + pigNum;
      ref.current.rotation.y = clock.getElapsedTime() * 7 + pigNum;
    }
  });

  useEffect(() => {
    if (roll) {
      const { rotation, position: newPosition } = getPigRotation(position);
      ref.current.rotation.x = rotation.x;
      ref.current.rotation.y = rotation.y;
      ref.current.rotation.z = rotation.z;

      setPosition(newPosition);
    } else {
      setPosition(startPosition);
    }
  }, [roll]);

  return (
    <mesh
      ref={ref}
      position={position}
      // onClick={() => {
      //   api.velocity.set(0, 5, 0);
      // }}
      visible
      material={materials["Material_25"]}
      geometry={nodes["Mesh_1244_Material_#25_0"].geometry}
    />
  );
}

useGLTF.preload(`${url}/lowpoly_pig/scene.gltf`);
