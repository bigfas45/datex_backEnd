const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Annualreport = require("../models/annualreport");
const { errorHandler } = require("../hlepers/dbErrorHandler");

exports.reportById = (req, res, next, id) => {
  Annualreport.findById(id).exec((err, annualreport) => {
    if (err || !annualreport) {
      return res.status(400).json({
        error: " Report not found"
      });
    }
    req.annualreport = annualreport;
    next();
  });
};

exports.read =(req, res) => {
  req.annualreport.file = undefined
  return res.json(req.annualreport);

}

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "File could not be uploaded" });
    }
    // check for all fields
    const { company, year, filename, security, file } = fields;

    if (!company || !year || !filename || !security ) {
      return res.status(400).json({
        error: " All fields are required "
      });
    }

    let annualreport = new Annualreport(fields);
    if (files.file) {
      console.log("FILES PHOTO", files.file);
      annualreport.file.data = fs.readFileSync(files.file.path);
      annualreport.file.contentType = files.file.type;
    }

    annualreport.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let annualreport = req.annualreport
  annualreport.remove((err, deletedReport) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({
    
      "message": 'Report deleted succesfully'
    })
  })
};


exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "File could not be uploaded" });
    }
    // check for all fields
    const { company, year, filename, security, file } = fields;

    if (!company || !year || !filename || !security ) {
      return res.status(400).json({
        error: " All fields are required "
      });
    }

    let annualreport = req.annualreport
    annualreport = _.extend(annualreport, fields)

    if (files.file) {
      console.log("FILES PHOTO", files.file);
      annualreport.file.data = fs.readFileSync(files.file.path);
      annualreport.file.contentType = files.file.type;
    }

    annualreport.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json(result);
    });
  });
};

