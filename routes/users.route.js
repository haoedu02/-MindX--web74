import { Router } from "express";
import {
  accessTokenValidator,
  loginValidator,
  registerValidator,
} from "../middlewares/users.middlewares.js";
import {
  getMeController,
  loginController,
  registerController,
} from "../controllers/users.controller.js";
const userRoute = Router();

userRoute.post("/register", registerValidator, registerController);
userRoute.post("/login", loginValidator, loginController);
userRoute.get("/me", accessTokenValidator, getMeController);

export default userRoute;
