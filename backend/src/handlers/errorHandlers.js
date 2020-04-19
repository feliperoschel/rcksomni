exports.catchErrors = (fn) => function (req, res, next) {
  return fn(req, res, next).catch(next);
};

exports.notFound = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
};

// eslint-disable-next-line no-unused-vars
exports.developmentErrors = (error, req, res, next) => {
  const errorDetails = {
    message: error.message,
    status: error.status,
    stack: error.stack,
  };

  res.status(error.status || 500).send(errorDetails);
};

// eslint-disable-next-line no-unused-vars
exports.productionErrors = (error, req, res, next) => {
  const errorDetails = {
    message: error.message,
    error: {},
  };

  res.status(error.status || 500).send(errorDetails);
};
