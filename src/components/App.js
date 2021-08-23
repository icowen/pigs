import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import "../styling/App.css";
import Pig from "./Pig";
import Ground from "./Ground";

function App() {
  return (
    <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Physics>
        <Pig />
        <Ground />
      </Physics>
    </Canvas>
  );
}

export default App;
