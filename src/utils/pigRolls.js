const { default: getRandomArbitrary } = require("./getRandomNumber");

exports.updateRotationAndPosition = (ref, groupRef, elapsedTime, deltas) => {
  ref.current.rotation.x =
    ref.current.rotation.x + deltas.ref.rotation.dx * elapsedTime;
  ref.current.rotation.y =
    ref.current.rotation.y + deltas.ref.rotation.dy * elapsedTime;
  ref.current.rotation.z =
    ref.current.rotation.z + deltas.ref.rotation.dz * elapsedTime;

  groupRef.current.position.x =
    groupRef.current.position.x + deltas.groupRef.position.dx * elapsedTime;
  groupRef.current.position.y =
    groupRef.current.position.y + deltas.groupRef.position.dy * elapsedTime;
  groupRef.current.position.z =
    groupRef.current.position.z + deltas.groupRef.position.dz * elapsedTime;

  groupRef.current.rotation.x =
    groupRef.current.rotation.x + deltas.groupRef.rotation.dx * elapsedTime;
  groupRef.current.rotation.y =
    groupRef.current.rotation.y + deltas.groupRef.rotation.dy * elapsedTime;
  groupRef.current.rotation.z =
    groupRef.current.rotation.z + deltas.groupRef.rotation.dz * elapsedTime;
};

const back = (startPosition, ref, groupRef) => {
  return {
    ref: {
      rotation: {
        x: -ref.current.rotation.x,
        y: getRandomArbitrary(0, 6) - ref.current.rotation.y,
        z: -ref.current.rotation.z,
      },
    },
    groupRef: {
      position: {
        x: startPosition[0] - groupRef.current.position.x,
        y: startPosition[1] + 7 - groupRef.current.position.y,
        z: startPosition[2] - groupRef.current.position.z,
      },
      rotation: {
        x: 0 - groupRef.current.rotation.x,
        y: 0 - groupRef.current.rotation.y,
        z: 0 - groupRef.current.rotation.z,
      },
    },
  };
};

const side = (startPosition, ref, groupRef) => {
  return {
    ref: {
      rotation: {
        x: -ref.current.rotation.x,
        y: getRandomArbitrary(0, 6) - ref.current.rotation.y,
        z: Math.PI / 2 - ref.current.rotation.z,
      },
    },
    groupRef: {
      position: {
        x: startPosition[0] - groupRef.current.position.x,
        y: startPosition[1] + 2 - groupRef.current.position.y,
        z: startPosition[2] - groupRef.current.position.z,
      },
      rotation: {
        x: -groupRef.current.rotation.x,
        y: -groupRef.current.rotation.y,
        z: -groupRef.current.rotation.z,
      },
    },
  };
};

const feet = (startPosition, ref, groupRef) => {
  return {
    ref: {
      rotation: {
        x: -ref.current.rotation.x,
        y: getRandomArbitrary(0, 6) - ref.current.rotation.y,
        z: Math.PI - ref.current.rotation.z,
      },
    },
    groupRef: {
      position: {
        x: startPosition[0] - groupRef.current.position.x,
        y: startPosition[1] - groupRef.current.position.y,
        z: startPosition[2] - groupRef.current.position.z,
      },
      rotation: {
        x: -groupRef.current.rotation.x,
        y: -groupRef.current.rotation.y,
        z: -groupRef.current.rotation.z,
      },
    },
  };
};

const snouter = (startPosition, ref, groupRef) => {
  return {
    ref: {
      rotation: {
        x: (5 * Math.PI) / 4 - ref.current.rotation.x,
        y: getRandomArbitrary(0, 6) - ref.current.rotation.y,
        z: -ref.current.rotation.z,
      },
    },
    groupRef: {
      position: {
        x: startPosition[0] - groupRef.current.position.x,
        y: startPosition[1] + 3 - groupRef.current.position.y,
        z: startPosition[2] - groupRef.current.position.z,
      },
      rotation: {
        x: -groupRef.current.rotation.x,
        y: getRandomArbitrary(0, 6) - groupRef.current.rotation.y,
        z: -groupRef.current.rotation.z,
      },
    },
  };
};

const leaningJowler = (startPosition, ref, groupRef) => {
  return {
    ref: {
      rotation: {
        x: (21 * Math.PI) / 16 - ref.current.rotation.x,
        y:
          [Math.PI / 5, -Math.PI / 5][Math.floor(Math.random() * 2)] -
          ref.current.rotation.y,
        z: -ref.current.rotation.z,
      },
    },
    groupRef: {
      position: {
        x: startPosition[0] - groupRef.current.position.x,
        y: startPosition[1] + 3 - groupRef.current.position.y,
        z: startPosition[2] - groupRef.current.position.z,
      },
      rotation: {
        x: -groupRef.current.rotation.x,
        y: getRandomArbitrary(0, 6) - groupRef.current.rotation.y,
        z: -groupRef.current.rotation.z,
      },
    },
  };
};

let i = 0;

exports.rollPig = (startPosition, ref, groupRef) => {
  const choices = [back, side, feet, snouter, leaningJowler];
  // i = (i + 1) % 2;
  // return [leaningJowler, feet][i](ref, startPosition, groupRef);
  return choices[Math.floor(Math.random() * choices.length)](
    startPosition,
    ref,
    groupRef
  );
};
