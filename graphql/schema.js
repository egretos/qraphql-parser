let { buildSchema } = require('graphql');

let schema = buildSchema(`
    type Page {
        title: String
        pages: Int
        url: String
    }
    type

    type Query {
        page(url: String!): Page
    }
`);

module.exports = schema;