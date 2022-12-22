const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
          const userData = await User.findOne({_id: context.user._id})
          .select("-__v -password")
          .populate("books");

          return userData

        } 
        throw new AuthenticationError("Need to be logged in");
    },
  },
    Mutation: {
      addUser: async(parent, args, context) => {
        const user = await User.create(args);
        const token= signToken(user);

        console.log(token);
        console.log(user);

        return { token, user };
      },
      login: async (parent, { email, password }, context) => {
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
      },
      saveBook: async(parent, {input}, context) => {
        console.log({input});
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            {_id: context.user._id},
            { $addToSet: { savedBooks: {input}}},
            {new: true}
          );

          return updatedUser;
        }

        throw new AuthenticationError("You need to be logged in!");
      },
      removeBook: async(parent, {bookId}, context) => {
        if(context.user) {
          const updatedUser = await User.findOneAndUpdate(
            {_id: context.user._id},
            {$pull: { savedBooks: {bookId: {bookId}}}},
            { new: true}
          ).populate("savedBooks");

          return updatedUser
        }

        throw new AuthenticationError("You need to be logged in");
      }

    }
}


module.exports = resolvers;