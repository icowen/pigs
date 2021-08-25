import React from "react";
import { Environment } from "@react-three/drei";

export default function Background() {
  return (
    <React.Suspense fallback={null}>
      <Environment
        files={[
          "http://127.0.0.1:8000/public/px.png",
          "http://127.0.0.1:8000/public/py.png",
          "http://127.0.0.1:8000/public/pz.png",
          "http://127.0.0.1:8000/public/nx.png",
          "http://127.0.0.1:8000/public/nz.png",
          "http://127.0.0.1:8000/public/ny.png",
        ]}
        background={true}
      />
    </React.Suspense>
  );
}
