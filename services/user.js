const User = require("../models/user");
const { OAuth2Client } = require('google-auth-library');

const addUser = async (data) => {
    try {
        const user = new User(data);
        await user.save();
        return user;
    } catch (err) {
        throw err;
    }
};

const findUser = async (query) => {
  try {
    const user = await User.findOne(query);
    return user;
  } catch (err) {
    throw err;
  }
};

const getGoogleUserData = async (token) => {
    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;
    } catch (error) {
        throw error;
    }
}

module.exports = {
  findUser,
  addUser,
  getGoogleUserData
};
