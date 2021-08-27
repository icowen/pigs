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
const feet = (startPosition) => {
  return {
    rotation: { x: 0, y: getRandomArbitrary(0, 6), z: Math.PI },
    position: startPosition,
  };
};

// let i = 0;

exports.getPigRotation = (startPosition) => {
  const choices = [back, side, feet];
  //   i = (i + 1) % 2;
  //   return [side, feet][i](startPosition);
  return choices[Math.floor(Math.random() * choices.length)](startPosition);
};
