import { userService } from "../services/users.service.js";

export const registerController = async (req, res, next) => {
  const access_token = await userService.register(req.body);
  return res.json({
    message: "Register successfully",
    result: {
      access_token,
    },
  });
};
export const loginController = async (req, res, next) => {
  const access_token = await userService.login(req);
  return res.json({
    message: "Login successfully",
    result: {
      access_token,
    },
  });
};

export const getMeController = async (req, res, next) => {
  const { user_id } = req.decode_authorization;
  const result = await userService.getMe(user_id);
  return res.json({
    message: "Get me successfully",
    result,
  });
};
