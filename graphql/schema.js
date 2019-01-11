let { buildSchema } = require('graphql');

let schema = buildSchema(`
    type Page {
        url: String
        content(selector: String!): Content
        list(Selector: String!): [Content]
    }
    
    type Content {
        html: String
        text: String
        href: String
        attr(name: String!): String 
        content(selector: String!): Content
        list(selector: String!): [Content]
    }

    type Query {
        page(url: String!): Page
    }
`);

module.exports = schema;