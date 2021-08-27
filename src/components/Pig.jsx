import React, { useEffect, useMemo } from "react";
import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import getRandomInt from "../utils/getRandomInt";
import { threeToCannon, ShapeType } from "three-to-cannon";

export default function Pig({ roll, pigNum }) {
  const startLocation = [pigNum, 2 + pigNum * 2, 0];

  const { nodes, materials } = useGLTF(
    "http://127.0.0.1:8000/src/lowpoly_pig/scene.gltf"
  );

  const result = threeToCannon(nodes.Mesh_1244, { type: ShapeType.BOX });

  const geo = nodes["Mesh_1244_Material_#25_0"].geometry;
  console.log(result);

  const [ref, api] = useBox(() => ({
    mass: 1,
    position: startLocation,
    velocity: [0, 0, 0],
    args: [
      (geo.boundingBox.max.x - geo.boundingBox.min.x) / 2,
      (geo.boundingBox.max.y - geo.boundingBox.min.y) / 2,
      (geo.boundingBox.max.z - geo.boundingBox.min.z) / 2,
    ],
    // geometry: nodes["Mesh_1244_Material_#25_0"].geometry,
  }));

  console.log(nodes);

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
    >
      {/* <meshNormalMaterial attach="material" transparent opacity={0.85} /> */}
    </mesh>
  );
}

useGLTF.preload("http://127.0.0.1:8000/src/lowpoly_pig/scene.gltf");
