import React, { Fragment, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CubeCamera, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import "../styling/App.css";
import Pig from "./Pig";
import Ground from "./Ground";
import Background from "./Background";
import Loading from "./Loading";

function App() {
  const [roll, setRoll] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const [cover, setCover] = useState(false);

  return (
    <Fragment>
      {cover && <div className={"cover"} />}
      <div className={"button-container"}>
        <div
          className={"roll-pigs button"}
          onClick={() => {
            setRoll(true);
            setIsSpinning(false);
          }}
        >
          {"Roll"}
        </div>
        <div
          className={"reset-pigs button"}
          onClick={() => {
            setIsSpinning(true);
            setRoll(false);
          }}
        >
          {"Reset"}
        </div>
      </div>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Background />
        <Physics>
          <CubeCamera resolution={256}>
            {() => (
              <Fragment>
                <React.Suspense fallback={<Loading />}>
                  <Pig roll={roll} pigNum={0} isSpinning={isSpinning} />
                  <Pig roll={roll} pigNum={1} isSpinning={isSpinning} />
                </React.Suspense>
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
