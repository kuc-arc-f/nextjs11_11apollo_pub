const cors = require('micro-cors')(); // highlight-line
import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../apollo/type-defs";
import { resolvers } from "../../apollo/resolvers";
const { send } = require('micro');

export const config = {
  api: {
    bodyParser: false,
  },
};
const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();
export default async function startFunction (req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}
/*
module.exports = apolloServer.start().then(() => {
  return apolloServer.createHandler({ path: '/api/graphql' });
});
*/
