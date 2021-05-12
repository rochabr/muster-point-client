module.exports = {
  query: `query listUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        isSafe
        username
        _version
      }
      nextToken
    }
  }
  `,
};