import React, { useState } from "react";
import "../styling/App.css";
import { API } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import Lobby from "./Lobby";
import * as mutations from "../graphql/mutations";

function App() {
  const [component, setComponent] = useState(<div />);

  onAuthUIStateChange((nextAuthState, authData) => {
    console.log(authData);
    if (nextAuthState === AuthState.SignedIn) {
      API.graphql({
        mutation: mutations.addPlayer,
        variables: {
          playerId: authData.attributes.sub,
          playerName: authData.username,
        },
      }).then((newPlayers) => {
        console.log(newPlayers);
        setComponent(<Lobby />);
      });
    }
    if (!authData) {
      console.log("user is not signed in...");
    }
  });

  return <div>{component}</div>;
}

export default withAuthenticator(App);
