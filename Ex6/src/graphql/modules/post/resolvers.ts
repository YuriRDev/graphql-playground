import db from "../../../db";

import { ForbiddenError } from "apollo-server";

export default {
  Post: {
    author: (obj) => {
      return db.authors[obj.author_id];
    },
  },
  Query: {
    listPost: (_, __) => {
      return db.posts;
    },
    getPostById: (_, { id }) => {
      return db.posts.find((post) => post.id == id);
    },
    createPost: (_, { data }, { reqId }) => {
      if (reqId) {
        const newPost = {
          id: db.posts.length,
          title: data.title,
          content: data.content,
          author_id: reqId,
        };

        db.posts.push(newPost);

        return newPost;
      } else {
        throw new ForbiddenError("Not authenticated");
      }
    },
    deletePost: (_, { id }, { reqId }) => {
      const findedPost = db.posts.find((post) => post.id == id);
      if (findedPost) {
        if (findedPost.author_id == reqId) {
          db.posts.splice(id, 1);
          return true;
        } else {
          throw new ForbiddenError("You are not the owner of this post");
        }
      } else {
        throw new Error("Could not find Post!");
      }
    },
    editPost: (_, { id, data }, { reqId }) => {
      let findedPost = db.posts.find((post) => post.id == id);
      if (findedPost) {
        if (findedPost.author_id == reqId) {
          findedPost = {
            id: findedPost.id,
            author_id: reqId,
            ...data,
          };

          //@ts-ignore
          db.posts[id] = findedPost;
          return findedPost;
        } else {
          throw new ForbiddenError("You are not the owner of this post");
        }
      } else {
        throw new Error("Could not find post!");
      }
    },
  },
};
