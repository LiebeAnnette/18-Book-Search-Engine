import User from "../models/User.js"; // ✅ Correct default import
import { GraphQLError } from "graphql";

// import { GraphQLError } from "@apollo/server/errors";
import { signToken } from "../services/auth.js";

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError("You must be logged in!");
      }

      const user = await User.findById(context.user._id).select(
        "-__v -password"
      );
      return user;
    },
  },

  Mutation: {
    login: async (_parent: any, { email, password }: any) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new GraphQLError("Wrong password!");
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    addUser: async (_parent: any, { username, email, password }: any) => {
      const user = await User.create({ username, email, password });

      if (!user) {
        throw new GraphQLError("Something went wrong!");
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (
      _parent: any,
      { authors, description, title, bookId, image, link }: any,
      context: any
    ) => {
      if (!context.user) {
        throw new GraphQLError("You must be logged in!");
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        {
          $addToSet: {
            savedBooks: { authors, description, title, bookId, image, link },
          },
        },
        { new: true, runValidators: true }
      );

      return updatedUser;
    },

    removeBook: async (_parent: any, { bookId }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError("You must be logged in!");
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        {
          $pull: { savedBooks: { bookId } },
        },
        { new: true }
      );

      return updatedUser;
    },
  },
};

export default resolvers;
