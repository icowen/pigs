import React, { Fragment, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import "../styling/App.css";
import Pig from "./Pig";
import Ground from "./Ground";

function App() {
  const [roll, setRoll] = useState(true);

  return (
    <Fragment>
      <div className={"roll-pigs button"} onClick={() => setRoll(!roll)}>
        {"Roll"}
      </div>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Physics>
          <Pig roll={roll} setRoll={setRoll}/>
          <Ground />
        </Physics>
      </Canvas>
    </Fragment>
  );
}

export default App;
