import { Fragment, useEffect, useState } from "react";
import { getPosition } from "../utils/pigRolls";
import Pig from "./Pig";

export default function Pigs({ roll, isSpinning, setInfo, probabilities }) {
  const [pigOnePosition, setPigOnePosition] = useState();
  const [pigTwoPosition, setPigTwoPosition] = useState();

  useEffect(() => {
    if (roll) {
      const newPosition1 = getPosition(probabilities);
      const newPosition2 = getPosition(probabilities);
      setInfo(`Pig One Roll: ${newPosition1}\nPig Two Roll: ${newPosition2}`);
      setPigOnePosition(newPosition1);
      setPigTwoPosition(newPosition2);
    } else {
      setPigOnePosition(undefined);
      setPigTwoPosition(undefined);
    }
  }, [roll]);

  return (
    <Fragment>
      <Pig pigNum={0} isSpinning={isSpinning} position={pigOnePosition}/>
      <Pig pigNum={1} isSpinning={isSpinning} position={pigTwoPosition}/>
    </Fragment>
  );
}
