import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const signToken = ({ payload }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { user_id: payload },
      process.env.PRIVATE_KEY,
      { algorithm: "HS256", expiresIn: "1d" },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

export const verifyToken = ({ token, secretOrPublicKey }) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};
