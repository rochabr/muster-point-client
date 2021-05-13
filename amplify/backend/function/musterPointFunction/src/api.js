import gql from "graphql-tag";

const getUserQuery = `
query getUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    isSafe
    _version
  }
}
`;
export function getUserById(id) {
  return {
    query: gql(getUserQuery),
    variables: {
      id: id,
    },
  };
}

const updateUserMutation = `
mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    isSafe
    username
    _version
  }
}
`;
export function updateUser(user) {
  return {
    query: gql(updateUserMutation),
    variables: {
      input: user,
    },
  };
}
