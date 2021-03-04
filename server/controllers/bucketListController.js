// const {List} = require('../models');

// module.exports = {
    
// }

const { gql } = require('apollo-server-express');

const typeDefs = gql `

`;

const { List, Post } = require('../models');

const resolvers = {
    Query: {
        lists: async (parent, { username }) =>{
            const params = username ? { username } : {};
            return List.find(params).sort({ createdAt: -1 })
        },
        list: async (parent, { listId }) =>{
            return List.findOne({ _id: listId });
        }
    }
}
