/* Amplify Params - DO NOT EDIT
	API_MUSTERPOINTAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_MUSTERPOINTAPI_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const graphqlQuery = require('./query.js').query;
const graphqlUpdate = require('./update.js').update;
const gql = require('graphql-tag');
const AWSAppSyncClient = require('aws-appsync').default;
require('es6-promise').polyfill();
require('isomorphic-fetch');

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
const appsyncClient = new AWSAppSyncClient(
  {
    url,
    region,
    auth: {
      type: 'AWS_IAM',
      credentials,
    },
    disableOffline: true,
  },
  {
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  }
);

exports.handler = async (event) => {
    const queryRes = await appsyncClient.query({
      query: gql(graphqlQuery),
      variables: { id: event["detail"]["DeviceId"] }
    });

    const mutation = gql(graphqlUpdate)

    const version = queryRes["data"]["getUser"]["_version"]
	const mutateRes = await appsyncClient.mutate({
      mutation,
      variables: { 
      	input: {
      		id: event["detail"]["DeviceId"],
      		isSafe: true,
      		_version: version
      	}
      }
    });    

    
    response = {
            statusCode: 200,
            body: mutateRes,
     };
    return response;
};
