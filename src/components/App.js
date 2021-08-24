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

function App() {
  const [roll, setRoll] = useState(true);

  return (
    <Fragment>
      <div className={"roll-pigs button"} onClick={() => setRoll(!roll)}>
        {"Roll"}
      </div>
      <Canvas>
        <OrbitControls autoRotate />
        {/* <Stars /> */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <React.Suspense fallback={null}>
          <Environment
            files={[
              "http://127.0.0.1:8000/src/components/px.png",
              "http://127.0.0.1:8000/src/components/py.png",
              "http://127.0.0.1:8000/src/components/pz.png",
              "http://127.0.0.1:8000/src/components/nx.png",
              "http://127.0.0.1:8000/src/components/nz.png",
              "http://127.0.0.1:8000/src/components/ny.png",
            ]}
            background={true}
          />
        </React.Suspense>
        <Physics>
          <CubeCamera resolution={256}>
            {(texture) => (
              <Fragment>
                <Pig roll={roll} pigNum={0} texture={texture} />
                <Pig roll={roll} pigNum={1} texture={texture} />
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
