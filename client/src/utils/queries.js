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
      bucketList {
        _id
        progress
        # I didn't include post here
      }
    }
  }
`;

export const SEARCH_USERS = gql`
  query user($searchUser: String!) {
    user(searchUser: $searchUser) {
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
  query bucketLists($username: String!) {
    bucketList(username: $username) {
      _id
      progress
      post {
        _id
        description
        images
        likes
        tags
        date_created
        # I did not include the comments here
      }
    }
  }
`;

export const GET_BUCKETLIST = gql`
  query bucketList($listId: ID!) {
    bucketList(listId: $listId) {
      _id
      progress
      post {
        _id
        description
        images
        likes
        tags
        date_created
        # I did not include the comments here
      }
    }
  }
`;
