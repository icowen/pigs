import React, { Fragment, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CubeCamera, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import "../styling/App.css";
import Pigs from "./Pigs";
import Ground from "./Ground";
import Background from "./Background";
import Loading from "./Loading";
import Button from "./Button";

function App() {
  const [roll, setRoll] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const [showLight, setShowLight] = useState(false);
  const [showInfo, setShowInfo] = useState(
    window.location.href.split("/").at("-1") === "info"
  );
  const [probabilities, setProbabilities] = useState([
    0.33,
    0.33,
    0.25,
    0.05,
    0.03,
    0.01,
  ]);

  const [info, setInfo] = useState();

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
      {showInfo && (
        <div
          className={"info"}
          onClick={() => {
            setShowInfo(false);
            setTimeout(() => setShowInfo(true), 10000);
          }}
        >
          <pre
            className={"info-probability"}
          >{`Left Side:      ${probabilities[0]}`}</pre>
          {/* <input
            type={"range"}
            min={0}
            max={1}
            onChange={(e) => {
              setProbabilities((prev) => [e.target.value, ...prev.slice(1)]);
            }}
          /> */}
          <pre
            className={"info-probability"}
          >{`Right Side:     ${probabilities[1]}`}</pre>
          <pre
            className={"info-probability"}
          >{`Back:           ${probabilities[2]}`}</pre>
          <pre
            className={"info-probability"}
          >{`Feet:           ${probabilities[3]}`}</pre>
          <pre
            className={"info-probability"}
          >{`Snouter:        ${probabilities[4]}`}</pre>
          <pre
            className={"info-probability"}
          >{`Leaning Jowler: ${probabilities[5]}`}</pre>
          {info}
        </div>
      )}
      <Button onRoll={onRoll} roll={roll} onReset={onReset} />
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
                  <Pigs
                    roll={roll}
                    isSpinning={isSpinning}
                    setInfo={setInfo}
                    probabilities={probabilities}
                  />
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
