const { default: getRandomArbitrary } = require("./getRandomNumber");

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
        y: 7 - groupRef.current.position.y,
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
        y: 2 - groupRef.current.position.y,
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
        y: -groupRef.current.position.y,
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
        y: - ref.current.rotation.y,
        z: -ref.current.rotation.z,
      },
    },
    groupRef: {
      position: {
        x: startPosition[0] - groupRef.current.position.x,
        y: 3 - groupRef.current.position.y,
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
        y: 3 - groupRef.current.position.y,
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
  const choices = [snouter, back, side, leaningJowler, feet];
  // i = (i + 1) % 2;
  // return [leaningJowler, feet][i](ref, startPosition, groupRef);
  return choices[Math.floor(Math.random() * choices.length)](
    startPosition,
    ref,
    groupRef
  );
};
