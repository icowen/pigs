import React from "react";
import { Environment } from "@react-three/drei";
import url from "../utils/url";

export default function Background() {
  return (
    <React.Suspense fallback={null}>
      <Environment
        files={[
          `${url}/px.png`,
          `${url}/nx.png`,
          `${url}/py.png`,
          `${url}/ny.png`,
          `${url}/pz.png`,
          `${url}/nz.png`,
        ]}
        background={true}
      />
    </React.Suspense>
  );
}
