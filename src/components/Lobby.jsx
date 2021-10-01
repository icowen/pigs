import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

export default function Lobby() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    API.graphql({ query: queries.getGames }).then((activeGames) => {
      console.log(activeGames.data.getGames);
      setGames(activeGames.data.getGames);
    });
  }, []);

  return (
    <div>
    <div
      className={"create-game button"}
      onClick={() => {}}
    >
      {"Create Game"}
    </div>
      {games.map((x, i) => (
        <div key={i} className={"join-game button"} onClick={() => {}}>{x.gameId}</div>
      ))}
    </div>
  );
}
