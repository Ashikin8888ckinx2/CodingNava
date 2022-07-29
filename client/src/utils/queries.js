import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bio
      picture
      banner_picture
      followers
      following
      privacy_mode
      bucketList
    }
  }
`;

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      bio
      picture
      banner_picture
      followers
      following
      privacy_mode
      bucketList
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($searchUser: String!) {
    searchUsers(searchUser: $searchUser) {
      username
      picture
    }
  }
`;

export const GET_FOLLOWING = gql`
  query followingList($username: String!) {
    followingList(username: $username) {
      following {
        username
        picture
      }
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query followersList($username: String!) {
    followersList(username: $username) {
      followers {
        username
        picture
      }
    }
  }
`;

export const GET_BUCKETLISTS = gql`
  query getBucketLists($id: String!) {
    getBucketLists(id: $id) {
      _id
      name
      progress
      createdBy
      post
    }
  }
`;

export const GET_BUCKETLIST = gql`
  query getBucketList($id: String!) {
    getBucketList(_id: $id) {
        name
        progress
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    getAllPosts {
      title
      description
      images
      tags
      date_created
      createdBy {
        username
        picture
      }
      bucketlist_id {
        progress
      }
    }
  }
`
export const GET_POSTS = gql`
  query getPosts($userId: String!){
    getPosts(userId: $userId){
      title
      description
      images
      likes
      tags
      date_created
      createdBy {
        username
        picture
      }
      bucketlist_id {
        progress
      }
    }
  }
`
