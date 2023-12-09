export const defaultErrorHandler = (err, req, res, next) => {
  return res.json({
    error: err,
  });
};
