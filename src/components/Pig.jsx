import React, { useEffect, useState } from "react";
import { useBox } from "@react-three/cannon";

export default function Pig({ roll, reset, pigNum }) {
  const startLocation = [pigNum, 2 + pigNum * 2, 0];

  const [ref, api] = useBox(() => ({
    mass: 1,
    position: startLocation
  }));

  useEffect(() => {
    console.log("Called with roll: ", roll);
    api.position.set(startLocation[0], startLocation[1], startLocation[2]);
    api.velocity.set(1, 1, 1);
    api.angularVelocity.set(1, 1, 1);
  }, [roll, api]);

  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
      ref={ref}
      position={startLocation}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}
