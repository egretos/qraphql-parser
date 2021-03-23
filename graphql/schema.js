let { buildSchema } = require('graphql');

let schema = buildSchema(`
    type Page {
        url: String
        element(selector: String!): Element
        list(selector: String!, listSelector: String): [Element]
    }
    
    type Element {
        html(selector: String): String
        text(selector: String): String
        integer(selector: String): Int
        href(selector: String): String
        attr(selector: String, name: String!): String 
        content(selector: String!): Element
        list(selector: String!, listSelector: String): [Element]
    }

    type Query {
        page(url: String!): Page
    }
`);

module.exports = schema;