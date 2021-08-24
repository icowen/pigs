import React, { Fragment, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import "../styling/App.css";
import Pig from "./Pig";
import Ground from "./Ground";

function App() {
  const [roll, setRoll] = useState(true);
  const [reset, setReset] = useState(true);
  const pigs = [...Array(2).keys()].map((x) => (
    <Pig key={x} roll={roll} reset={reset} pigNum={x} />
  ));

  return (
    <Fragment>
      <div className={"roll-pigs button"} onClick={() => setRoll(!roll)}>
        {"Roll"}
      </div>
      <div className={"reset-pigs button"} onClick={() => setReset(!reset)}>
        {"Reset"}
      </div>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Physics>
          {pigs}
          <Ground />
        </Physics>
      </Canvas>
    </Fragment>
  );
}

export default App;
