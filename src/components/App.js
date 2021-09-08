import React, { Fragment, useRef, useState } from "react";
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
  const [showLight, setShowLight] = useState(false);

  return (
    <Fragment>
      {cover && <div className={"cover"} />}
      <div className={"button-container"}>
        {roll ? (
          <div
            className={"reset-pigs button"}
            onClick={() => {
              if (!isSpinning) {
                setIsSpinning(true);
                setRoll(false);
                setShowLight(false);
              }
            }}
          >
            {"Reset"}
          </div>
        ) : (
          <div
            className={"roll-pigs button"}
            onClick={() => {
              if (!roll) {
                setRoll(true);
                setIsSpinning(false);
                setTimeout(() => setShowLight(true), 1500);
              }
            }}
          >
            {"Roll"}
          </div>
        )}
      </div>
      <Canvas>
        <OrbitControls autoRotate autoRotateSpeed={1} />
        <ambientLight intensity={showLight ? 0.5 : 0.7} />
        {showLight && <spotLight position={[10, 30, 10]} angle={0.5} />}
        <Background />
        <Physics>
          <CubeCamera resolution={256} position={[0, 0, 0]}>
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
