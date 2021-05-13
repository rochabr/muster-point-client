require("isomorphic-fetch");

import AWS from "aws-sdk";
import AWSAppSyncClient from "aws-appsync";

const url = process.env.API_MUSTERPOINTAPI_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
AWS.config.update({
  region,
  credentials: new AWS.Credentials(
    process.env.AWS_ACCESS_KEY_ID,
    process.env.AWS_SECRET_ACCESS_KEY,
    process.env.AWS_SESSION_TOKEN
  ),
});
const credentials = AWS.config.credentials;
export const appsyncClient = new AWSAppSyncClient(
  {
    url,
    region,
    auth: {
      type: "AWS_IAM",
      credentials,
    },
    disableOffline: true,
  },
  {
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
        errorPolicy: "all",
      },
    },
  }
);
