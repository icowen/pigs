const { default: getRandomArbitrary } = require("./getRandomNumber");

const back = (startPosition, ref, groupRef) => {
  console.log("Back");
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

const leftSide = (startPosition, ref, groupRef) => {
  console.log("Left Side");
  return {
    ref: {
      rotation: {
        x: -ref.current.rotation.x,
        y: getRandomArbitrary(0, 6) - ref.current.rotation.y,
        z: -Math.PI / 2 - ref.current.rotation.z,
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

const rightSide = (startPosition, ref, groupRef) => {
  console.log("Right side");
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
  console.log("Feet");
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
  console.log("Snouter");
  return {
    ref: {
      rotation: {
        x: (5 * Math.PI) / 4 - ref.current.rotation.x,
        y: -ref.current.rotation.y,
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
  console.log("Leaning Jowler");
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

exports.rollPig = (startPosition, ref, groupRef, position) => {
  return {
    rightSide: rightSide,
    leftSide: leftSide,
    back: back,
    feet: feet,
    snouter: snouter,
    leaningJowler: leaningJowler,
  }[position](startPosition, ref, groupRef);
};

exports.getPosition = (probabilities) => {
  const sum = (i) => probabilities.slice(0, i).reduce((a, b) => a + b, 0);

  const roll = Math.random();
  if (roll < sum(1)) return "rightSide";
  if (roll < sum(2)) return "leftSide";
  if (roll < sum(3)) return "back";
  if (roll < sum(4)) return "feet";
  if (roll < sum(5)) return "snouter";
  return "leaningJowler";
};

//DotUp-   119  .33
//DotDown- 116  .33
//Feet-     12  .05
//Back-     98  .25
//Snout-     1  .03
//Jowl-      4  .01
//Total-   350
