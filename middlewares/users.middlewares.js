import { checkSchema } from "express-validator";
import { validator } from "../utils/validation.js";
import databaseService from "../services/database.service.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../utils/jwt.js";

export const registerValidator = validator(
  checkSchema(
    {
      email: {
        isEmail: {
          errorMessage: "Email is inValid",
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const isEmailExist = await databaseService.users.findOne({
              email: value,
            });
            if (isEmailExist) {
              throw new Error("Your email is already exists");
            }
            return true;
          },
        },
      },
      password: { isLength: { options: { min: 8 } } },
      confirm_password: {
        isLength: { options: { min: 8 } },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error("Confirm password must be same as password");
            }
            return true;
          },
        },
      },
    },
    ["body"]
  )
);
export const loginValidator = validator(
  checkSchema(
    {
      email: {
        isEmail: {
          errorMessage: "Email is inValid",
        },
        trim: true,
        custom: {
          options: (value, { req }) => {
            const isEmailExist = databaseService.users.findOne({
              email: value,
            });
            if (!isEmailExist) {
              throw new Error("Your email is not registered");
            }
            return true;
          },
        },
      },
      password: {
        isLength: { options: { min: 8 } },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({
              email: req.body.email,
            });
            if (!bcrypt.compareSync(value, user.password)) {
              throw new Error(`Your Password is incorrect`);
            }
            req.user = user;
            return true;
          },
        },
      },
    },
    ["body"]
  )
);

export const accessTokenValidator = validator(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new Error("Access token is required");
            }
            const access_token = (value || "").split(" ")[1];
            const decode_authorization = await verifyToken({
              token: access_token,
              secretOrPublicKey: process.env.PRIVATE_KEY,
            });
            req.decode_authorization = decode_authorization;
            return true;
          },
        },
      },
    },
    ["headers"]
  )
);
