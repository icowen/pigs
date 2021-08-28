const { default: getRandomArbitrary } = require("./getRandomNumber");

const back = (startPosition) => {
  return {
    rotation: { x: 0, y: getRandomArbitrary(0, 6), z: 0 },
    position: [startPosition[0], startPosition[1] + 7, startPosition[2]],
  };
};
const side = (startPosition) => {
  return {
    rotation: { x: 0, y: getRandomArbitrary(0, 6), z: Math.PI / 2 },
    position: [startPosition[0], startPosition[1] + 2, startPosition[2]],
  };
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
  // ref.current.position.x = 0;
  // ref.current.position.y = 0;
  // ref.current.position.z = 0;

  console.log(ref.current);

  groupRef.current.rotation.y =getRandomArbitrary(0, 6);

  // ref.current.rotateOnWorldAxis([0, 1, 0], Math.PI);

  ref.current.rotation.x = (5 * Math.PI) / 4;
  ref.current.rotation.y = 0;
  ref.current.rotation.z = 0;

  groupRef.current.position.x = startPosition[0];
  groupRef.current.position.y = startPosition[1] + 2;
  groupRef.current.position.z = startPosition[2];
};

let i = 0;

exports.getPigRotation = (startPosition) => {
  const choices = [back, side, feet];
  i = (i + 1) % 2;
  return [snouter, feet][i](startPosition);
  //   return choices[Math.floor(Math.random() * choices.length)](startPosition);
};

exports.rollPig = (ref, startPosition, groupRef) => {
  const choices = [back, side, feet];
  i = (i + 1) % 2;
  return [snouter, feet][i](ref, startPosition, groupRef);
};
