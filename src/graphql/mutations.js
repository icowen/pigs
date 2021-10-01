/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addGame = /* GraphQL */ `
  mutation AddGame($input: AddGameInput) {
    addGame(input: $input) {
      gameId
      players {
        playerId
        name
        currentGameId
      }
      startTime
    }
  }
`;
export const addPlayer = /* GraphQL */ `
  mutation AddPlayer($input: AddPlayerInput) {
    addPlayer(input: $input) {
      playerId
      name
      currentGameId
    }
  }
`;
