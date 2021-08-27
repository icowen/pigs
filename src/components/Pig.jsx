import React, { useEffect } from "react";
import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import getRandomInt from "../utils/getRandomInt";
import url from "../utils/url";

export default function Pig({ roll, pigNum }) {
  const startLocation = [pigNum, 2 + pigNum * 2, 0];

  const { nodes, materials } = useGLTF(`${url}/lowpoly_pig/scene.gltf`);

  const geo = nodes["Mesh_1244_Material_#25_0"].geometry;

  const [ref, api] = useBox(() => ({
    mass: 1,
    position: startLocation,
    velocity: [0, 0, 0],
    args: [
      (geo.boundingBox.max.x - geo.boundingBox.min.x) / 2,
      (geo.boundingBox.max.y - geo.boundingBox.min.y) / 2,
      (geo.boundingBox.max.z - geo.boundingBox.min.z) / 2,
    ],
  }));

  useEffect(() => {
    api.position.set(startLocation[0], startLocation[1], startLocation[2]);
    api.velocity.set(
      getRandomInt(5, 10),
      getRandomInt(5, 10),
      getRandomInt(5, 10)
    );
    api.angularVelocity.set(
      getRandomInt(5, 10),
      getRandomInt(5, 10),
      getRandomInt(5, 10)
    );
  }, [roll, api]);

  return (
    <mesh
      ref={ref}
      position={[0, 10, 0]}
      onClick={() => {
        api.velocity.set(0, 5, 0);
      }}
      visible
      material={materials["Material_25"]}
      geometry={nodes["Mesh_1244_Material_#25_0"].geometry}
    />
  );
}

useGLTF.preload(`${url}/lowpoly_pig/scene.gltf`);
