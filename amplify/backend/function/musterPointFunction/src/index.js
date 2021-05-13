/* Amplify Params - DO NOT EDIT
	API_MUSTERPOINTAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_MUSTERPOINTAPI_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { getUserById, updateUser } from "./api";
import { appsyncClient } from "./setup";

function getEventData(event) {
  const payload = event?.detail;
  let data = undefined;
  if (payload?.DeviceId && payload?.EventType) {
    data = { ...payload };
  }
  return data;
}

exports.handler = async (event) => {
  // check if the event has the expected data
  const eventData = getEventData(event);
  if (!eventData) {
    return {
      statusCode: 400,
      body: "Invalid request. The event data is not present or not in the expected format.",
    };
  }

  // query the user by its id, so we can get the current version
  // since DataStore relies on versioned objects, we need to send the current version in mutations
  const userId = eventData.DeviceId;
  const queryResponse = await appsyncClient.query(getUserById(userId));
  const user = queryResponse.data?.getUser;
  if (!user) {
    return {
      statusCode: 404,
      body: `User with id ${userId} not found in the database.`,
    };
  }

  const mutationResponse = await appsyncClient.mutate(
    updateUser({
      id: userId,
      isSafe: eventData.EventType === "ENTER",
      _version: user._version,
    })
  );

  if (mutationResponse.errors?.length > 0) {
    return {
      statusCode: 400,
      body: mutationResponse.errors,
    };
  }
  return {
    statusCode: 200,
    body: mutationResponse.data.updateUser,
  };
};
