const { gql } = require('apollo-server-express');
 
const typeDefs = gql`
 type User {
   _id: ID
   username: String
   email: String
   password: String
   bio: String
   picture: String
   privacy_mode: Boolean
   bucketList: [BucketList]
 }
 
 type Auth {
   token: ID!
   user: User
 }
 
 type BucketList {
   _id: ID!
   progress: String!
   createdBy: String
   post: [Post]
 }
 
 input BucketListInput {
   progress: String!
 }
 
 type Post {
   _id: ID!
   description: String!
   images: [String]
   likes: [User]
   tags: [String]
   date_created: String!
   comment: [Comment]
 }
 
 input PostInput {
   description: String!
   images: [String]
   date_created: String!
 }
 
 type Comment {
   comment: String!
   likes: [User]
   date_created: String!
 }
 
 input CommentInput {
   comment: String!
   date_created: String!
 }
 
 type Query {
   me: User
   users: [User]
   user(userId: String!): User
   bucketLists(userId: String): [BucketList]
   bucketList(listId: ID!): BucketList
 }
 
 type Mutation{
   addUser(username: String!, email: String!, password: String!): Auth
   login(email: String, username: String, password: String!): Auth
   addBucketList(listData: BucketListInput!): User
   addPost(postData: PostInput!): BucketList
   addComment(commentData: CommentInput!): Post
   deleteBucketList(listId: ID!): User
   deletePost(postId: ID!): BucketList
   deleteComment(commentId: ID!): Post
 }
`;

// We need edits for the mutations
 
module.exports = typeDefs;