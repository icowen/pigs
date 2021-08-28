const { default: getRandomArbitrary } = require("./getRandomNumber");

const back = (ref, startPosition, groupRef) => {
  ref.current.rotation.x = 0;
  ref.current.rotation.y = getRandomArbitrary(0, 6);
  ref.current.rotation.z = 0;

  groupRef.current.position.x = startPosition[0];
  groupRef.current.position.y = startPosition[1] + 7;
  groupRef.current.position.z = startPosition[2];
};

const side = (ref, startPosition, groupRef) => {
  ref.current.rotation.x = 0;
  ref.current.rotation.y = getRandomArbitrary(0, 6);
  ref.current.rotation.z = Math.PI / 2;

  groupRef.current.position.x = startPosition[0];
  groupRef.current.position.y = startPosition[1] + 2;
  groupRef.current.position.z = startPosition[2];
};

const feet = (ref, startPosition, groupRef) => {
  groupRef.current.position.x = startPosition[0];
  groupRef.current.position.y = startPosition[1];
  groupRef.current.position.z = startPosition[2];

  ref.current.rotation.x = 0;
  ref.current.rotation.y = getRandomArbitrary(0, 6);
  ref.current.rotation.z = Math.PI;
};

const snouter = (ref, startPosition, groupRef) => {
  groupRef.current.rotation.y = getRandomArbitrary(0, 6);

  ref.current.rotation.x = (5 * Math.PI) / 4;
  ref.current.rotation.y = 0;
  ref.current.rotation.z = 0;

  groupRef.current.position.x = startPosition[0];
  groupRef.current.position.y = startPosition[1] + 2;
  groupRef.current.position.z = startPosition[2];
};

const leaningJowler = (ref, startPosition, groupRef) => {
  groupRef.current.rotation.y = getRandomArbitrary(0, 6);

  ref.current.rotation.x = (21 * Math.PI) / 16;
  ref.current.rotation.y = [Math.PI / 5, -Math.PI / 5][
    Math.floor(Math.random() * 2)
  ];
  ref.current.rotation.z = 0;

  groupRef.current.position.x = startPosition[0];
  groupRef.current.position.y = startPosition[1] + 2;
  groupRef.current.position.z = startPosition[2];
};

let i = 0;

exports.rollPig = (ref, startPosition, groupRef) => {
  const choices = [back, side, feet, snouter, leaningJowler];
  i = (i + 1) % 2;
  // return [leaningJowler, feet][i](ref, startPosition, groupRef);
  return choices[Math.floor(Math.random() * choices.length)](
    ref,
    startPosition,
    groupRef
  );
};
