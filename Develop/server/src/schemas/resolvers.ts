// FROM LESSONS
// Query: {
//   me: async (_parent, _args, context) => {
//     if (!context.req.user) {
//       throw new AuthenticationError("You must be logged in!");
//     }
//     // Fetch and return user info
//   };
// }

// import { saveBook } from "../controllers/user-controller";

// messing around here while re-watching lessons
// import { bookSchema } from '../models/book.js';
import { User } from "../models/index";
import { AuthenticationError, signToken } from "../services/auth";

interface ILoginUser {
  email: string;
  password: string;
}

interface IAdduserArgs {
  username: string;
  email: string;
  password: string;
}

interface ISaveBookArgs {
  authors: string[];
  description: string;
  title: string;
  bookId: string;
  image: string;
  link: string;
}

interface IRemoveBookArgs {
  bookId: string;
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.req.user) {
        throw new AuthenticationError("You must be logged in!");
      }
      // Fetch and return user info
    },
  },
  Mutation: {
    login: async (_parent: any, _args: any, context: any) => {},
    addUser: async (_parent: any, _args: any, context: any) => {},
    saveBook: async (_parent: any, _args: any, context: any) => {},
    removeBook: async (_parent: any, _args: any, context: any) => {},
  },
};

export default resolvers;
