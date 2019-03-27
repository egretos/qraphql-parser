let { buildSchema } = require('graphql');

let schema = buildSchema(`
    type Page {
        url: String
        content(selector: String!): Content
        list(Selector: String!): [Content]
    }
    
    type Content {
        html(selector: String): String
        text(selector: String): String
        integer(selector: String): Int
        href(selector: String): String
        attr(selector: String, name: String!): String 
        content(selector: String!): Content
        list(selector: String!): [Content]
    }

    type Query {
        page(url: String!): Page
    }
`);

module.exports = schema;