const Participant = require("../models/participant");
const { errorHandler } = require("../hlepers/dbErrorHandler");

exports.participantById = (req, res, next, id) => {
  Participant.findById(id).exec((err, participant) => {
    if (err || !participant) {
      return res.status(400).json({
        error: "participant does not exist"
      });
    }
    req.participant = participant;
    next();
  });
};

exports.update = (req, res) => {
  Participant.findOneAndUpdate(
    { _id: req.participant._id },
    { $set: req.body },
    { new: true },
    (err, participant) => {
      if (err) {
        return res.status(400).json({
          error: "You are not allowed to perform this action"
        });
      }

      res.json(participant);
    }
  );
};

exports.create = (req, res) => {
  const participant = new Participant(req.body);
  participant.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.participant);
};

exports.list = (req, res) => {
  Participant.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};
