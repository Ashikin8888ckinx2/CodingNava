import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userData: UpdateUserInput!) {
    updateUser(userData: $userData) {
      email
      bio
      picture
      banner_picture
      privacy_mode
    }
  }
`

export const FOLLOW_USER = gql`
  mutation followUser($followId: ID!) {
    followUser(followId: $followId) {
      followingUser {
        _id
        followers
        following
      }
      followedUser {
        _id
        followers
        following
      }
    }
  }
`

export const ADD_BUCKET_LIST = gql`
  mutation addBucketList($listData: BucketListInput!) {
    addBucketList(listData: $listData) {
      _id
      username
      email
      bio
      picture
      banner_picture
      bucketList {
        _id
        progress
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postData: PostInput!) {
    addPost(postData: $postData) {
      _id
      progress
      post {
        _id
        description
        images
        likes
        tags
        date_created
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($commentData: CommentInput!) {
    addComment(commentData: $commentData) {
      _id
      description
      images
      likes
      tags
      date_created
      comment {
        comment
        likes
        date_created
      }
    }
  }
`;

export const DELETE_BUCKET_LIST = gql`
  mutation deleteBucketList($listId: ID!) {
    deleteBucketList(listId: $listId) {
      _id
      username
      email
      bio
      picture
      banner_picture
      bucketList {
        _id
        progress
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
      progress
      post {
        _id
        description
        images
        likes
        tags
        date_created
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      _id
      description
      images
      likes
      tags
      date_created
      comment {
        comment
        likes
        date_created
      }
    }
  }
`;
