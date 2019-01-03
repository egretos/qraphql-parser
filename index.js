let express =       require('express');
let graphqlHTTP =   require('express-graphql');
let schema =        require('./graphql/schema');
let root =          require('./graphql/root');
let engine =        require('./engine/index');
require('colors');

let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql'.green);
engine.start();