import { validationResult } from "express-validator";

export const validator = (validation) => {
  return async (req, res, next) => {
    await validation.run(req);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    next(errors.mapped());
  };
};
