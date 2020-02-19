const Security = require("../models/security");
const { errorHandler } = require("../hlepers/dbErrorHandler");

exports.securityById = (req, res, next, id) => {
  Security.findById(id).exec((err, security) => {
    if (err || !security) {
      return res.status(400).json({
        error: "Security does not exist"
      });
    }
    req.security = security;
    next();
  });
};

exports.create = (req, res) => {
  const security = new Security(req.body);
  security.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.security)
}


exports.update = (req, res) => {
  const security = req.security
  security.security = req.body.security
  security.symbol = req.body.symbol
  security.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const security = req.security

  security.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: 'Security Deleted'
    });
  });
};

exports.list = (req, res) => {
  Security.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  })
};
