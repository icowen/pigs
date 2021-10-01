/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($input: GetGameInput) {
    getGame(input: $input) {
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
export const getGames = /* GraphQL */ `
  query GetGames {
    getGames {
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
export const getPlayer = /* GraphQL */ `
  query GetPlayer($input: GetPlayerInput) {
    getPlayer(input: $input) {
      playerId
      name
      currentGameId
    }
  }
`;
