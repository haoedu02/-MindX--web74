import User from "../models/schemas/User.schema.js";
import { signToken } from "../utils/jwt.js";
import databaseService from "./database.service.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

class UserService {
  async register(payload) {
    const user_id = new ObjectId();
    await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        password: bcrypt.hashSync(payload.password, 10),
      })
    );
    const access_token = await signToken({
      payload: user_id,
    });
    return access_token;
  }
  async login(req) {
    const user_id = req.user._id;
    const access_token = await signToken({
      payload: user_id,
    });
    return access_token;
  }
  async getMe(user_id) {
    const user = await databaseService.users.findOne(
      {
        _id: new ObjectId(user_id),
      },
      {
        projection: {
          password: 0,
        },
      }
    );
    return user;
  }
}

export const userService = new UserService();
