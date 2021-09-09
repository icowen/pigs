import React, { Fragment, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CubeCamera, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import "../styling/App.css";
import Pigs from "./Pigs";
import Ground from "./Ground";
import Background from "./Background";
import Loading from "./Loading";
import ResetButton from "./ResetButton";
import RollButton from "./RollButton";

function App() {
  const [roll, setRoll] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const [cover, setCover] = useState(false);
  const [showLight, setShowLight] = useState(false);

  const onReset = () => {
    setIsSpinning(true);
    setRoll(false);
    setShowLight(false);
  };

  const onRoll = () => {
    setRoll(true);
    setIsSpinning(false);
    setTimeout(() => setShowLight(true), 1500);
  };

  return (
    <Fragment>
      {cover && <div className={"cover"} />}
      <div className={"button-container"}>
        {roll ? (
          <ResetButton onReset={onReset} />
        ) : (
          <RollButton onRoll={onRoll} />
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
                  <Pigs roll={roll} isSpinning={isSpinning} />
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
