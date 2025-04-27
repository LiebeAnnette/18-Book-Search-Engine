// FROM LESSONS
// Query: {
//   me: async (_parent, _args, context) => {
//     if (!context.req.user) {
//       throw new AuthenticationError("You must be logged in!");
//     }
//     // Fetch and return user info
//   };
// }

// messing around here while re-watching lessons
// import { bookSchema } from '../models/book.js';
const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      // if (!context.req.user) {
      //   throw new AuthenticationError("You must be logged in!");
      // }
      // Fetch and return user info
    },
  },
  Mutation: {
    login: async (_parent: any, _args: any, context: any) => {},
    addUser: async (_parent: any, _args: any, context: any) => {},
  },
};

export default resolvers;
