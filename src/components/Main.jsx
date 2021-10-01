import React, { Fragment, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CubeCamera, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import "../styling/App.css";
import Pigs from "./Pigs";
import Ground from "./Ground";
import Background from "./Background";
import Loading from "./Loading";
import Button from "./Button";

export default function Main() {
  const [roll, setRoll] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const [showLight, setShowLight] = useState(false);
  const [showInfo, setShowInfo] = useState(
    window.location.href.includes("info")
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

  const updateProb = (value, i) => {
    setProbabilities((prev) => {
      const newProbs = [...prev];
      newProbs[i] = Number(value);
      return newProbs;
    });
  };

  return (
    <Fragment>
      {showInfo && (
        <div className={"info"}>
          <pre
            className={"info-probability"}
          >{`Left Side:      ${probabilities[0]}`}</pre>
          <input
            type={"range"}
            min={0}
            max={1}
            defaultValue={probabilities[0]}
            step={0.01}
            onChange={(e) => updateProb(e.target.value, 0)}
          />
          <pre
            className={"info-probability"}
          >{`Right Side:     ${probabilities[1]}`}</pre>
          <input
            type={"range"}
            min={0}
            max={1}
            defaultValue={probabilities[1]}
            step={0.01}
            onChange={(e) => updateProb(e.target.value, 1)}
          />
          <pre
            className={"info-probability"}
          >{`Back:           ${probabilities[2]}`}</pre>
          <input
            type={"range"}
            min={0}
            max={1}
            defaultValue={probabilities[2]}
            step={0.01}
            onChange={(e) => updateProb(e.target.value, 2)}
          />
          <pre
            className={"info-probability"}
          >{`Feet:           ${probabilities[3]}`}</pre>
          <input
            type={"range"}
            min={0}
            max={1}
            defaultValue={probabilities[3]}
            step={0.01}
            onChange={(e) => updateProb(e.target.value, 3)}
          />
          <pre
            className={"info-probability"}
          >{`Snouter:        ${probabilities[4]}`}</pre>
          <input
            type={"range"}
            min={0}
            max={1}
            defaultValue={probabilities[4]}
            step={0.01}
            onChange={(e) => updateProb(e.target.value, 4)}
          />
          <pre
            className={"info-probability"}
          >{`Leaning Jowler: ${probabilities[5]}`}</pre>
          <input
            type={"range"}
            min={0}
            max={1}
            defaultValue={probabilities[5]}
            step={0.01}
            onChange={(e) => updateProb(e.target.value, 5)}
          />
          {probabilities.reduce((a, b) => a + b) !== 1 && (
            <div className={"bad-probs"}>
              {"Make the numbers sum to one, DOOMFKA!!!"}
              {`\nTotal: ${probabilities.reduce((a, b) => a + b)}`}
            </div>
          )}
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