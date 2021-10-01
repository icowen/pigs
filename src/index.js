import React from "react";
import ReactDOM from "react-dom";
import "./styling/index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import awsconfig from "./aws-exports";
import Amplify from "aws-amplify";
Amplify.configure(awsconfig);

const apiConfig = {
  aws_appsync_graphqlEndpoint:
    "https://3cmliy67dffi5jngvjcmsubaii.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_region: "us-east-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
};
Amplify.configure(apiConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
