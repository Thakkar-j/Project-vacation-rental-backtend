import UserSchema from "../models/userModel.js";
import { oauth2Client } from "../utils/GoogleConfig.js";
import axios from "axios";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

//THis function act as addUser function
const googleLogin = async (req, res) => {
  try {
    // 1. Get the authorization code sent by the frontend
    const { code, role } = req.query;

    // 2. Exchange the code for access tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // 3. Fetch the user's Google profile
    const googleRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    );
    const data = googleRes.data;

    // 4. Check if the user exists in your database, otherwise create them
    let user = await UserSchema.findOne({ email: data.email });

    if (!user) {
      user = await UserSchema.create({
        name: data.name,
        email: data.email,
        profilePic: data.picture,
        role: role || "user", // Save the role if passed from frontend, otherwise default to "user"
      });
    }

    const { _id, email, role: userRole } = user;
    const token = jwt.sign(
      { _id, email, role: userRole },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TIMEOUT,
      },
    );

    // 5. Send the user data back to the client
    res.status(200).json({
      message: "Google login successful(backend)",
      token,
      data: user,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Google login failed", error: error.message });
  }
};

export default { googleLogin };
