import React, { useEffect } from "react";
import { useBox } from "@react-three/cannon";

export default function Pig({ roll, setRoll }) {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));

  useEffect(() => {
    console.log("Called with roll: ", roll);
    api.velocity.set(0, 5, 0);
    setRoll(false);
  }, [roll, setRoll]);

  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
      ref={ref}
      position={[0, 2, 0]}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}
