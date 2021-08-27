import React from "react";
import { Environment } from "@react-three/drei";
import url from "../utils/url";

export default function Background() {
  return (
    <React.Suspense fallback={null}>
      <Environment
        files={[
          `${url}/px.png`,
          `${url}/py.png`,
          `${url}/pz.png`,
          `${url}/nx.png`,
          `${url}/nz.png`,
          `${url}/ny.png`,
        ]}
        background={true}
      />
    </React.Suspense>
  );
}
