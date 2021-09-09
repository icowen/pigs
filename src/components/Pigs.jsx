import { Fragment, useEffect, useState } from "react";
import { getPosition } from "../utils/pigRolls";
import { Text } from '@react-three/drei'
import Pig from "./Pig";

export default function Pigs({ roll, isSpinning }) {
  const [pigOnePosition, setPigOnePosition] = useState();
  const [pigTwoPosition, setPigTwoPosition] = useState();
  const [probabilities, setProbabilities] = useState([
    0.33,
    0.66,
    0.91,
    0.96,
    0.99,
  ]);

  useEffect(() => {
    if (roll) {
      const newPosition1 = getPosition(probabilities);
      console.log("PigOne:", newPosition1);
      setPigOnePosition(newPosition1);
    } else {
      setPigOnePosition(undefined);
    }
  }, [roll]);

  return (
    <Fragment>
      {pigOnePosition && (
        <Text color="black" anchorX="center" anchorY="middle">
          {pigOnePosition}
        </Text>
      )}
      <Pig roll={roll} pigNum={0} isSpinning={isSpinning} />
      <Pig roll={roll} pigNum={1} isSpinning={isSpinning} />
    </Fragment>
  );
}
