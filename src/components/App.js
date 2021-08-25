import React, { Fragment, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  Stars,
} from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import "../styling/App.css";
import Pig from "./Pig";
import Ground from "./Ground";
import Background from "./Background";

function App() {
  const [roll, setRoll] = useState(true);

  return (
    <Fragment>
      <div className={"roll-pigs button"} onClick={() => setRoll(!roll)}>
        {"Roll"}
      </div>
      <Canvas>
        <OrbitControls autoRotate />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Background />
        <Physics>
          <CubeCamera resolution={256}>
            {() => (
              <Fragment>
                <Pig roll={roll} pigNum={0} />
                <Pig roll={roll} pigNum={1} />
                <Ground />
              </Fragment>
            )}
          </CubeCamera>
        </Physics>
      </Canvas>
    </Fragment>
  );
}

export default App;
