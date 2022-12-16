const { AuthenticationError } = require('apollo-server-express');
const { isContext } = require('vm');
const { User, Book } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args) => {
          if (context.user) {
          const userData = await User.findOne({_id: context.user._id})
          .select("-__v -password")
          .populate("books");

          return userData

        } 
        throw new AuthenticationError("Need to be logged in");
    },
    Mutation: {
      addUser: async() => {
        const user = await User.create(args);

        return user;
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const token = signToken(user);
        return { token, user };
      }
    }
}
}