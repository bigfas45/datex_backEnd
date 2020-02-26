const User = require('../models/user')


exports.userById = (req, res, next, id) => {
User.findById(id).exec((err, user) => {
    if (err || !user) {
        return res.status(400).json({
            error: 'User not found'
        });
    }
    req.profile = user
    next();
});
};



exports.userByIdGet = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: " User not found"
        });
      }
      req.user = user;
      next();
    });
  };
  

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
}


exports.update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id},
        { $set: req.body}, 
        { new: true},
        (err, user) => {

           if (err) {
               return res.status(400).json({
                   error: 'You are not allowed to perform this action'
               });
           }
           user.hashed_password = undefined;
           user.slat = undefined;
            res.json(user);
        }
        
        );
};


exports.update2 = (req, res) => {
  User.findOneAndUpdate(
      { _id: req.user._id},
      { $set: req.body}, 
      { new: true},
      (err, user) => {

         if (err) {
             return res.status(400).json({
                 error: 'You are not allowed to perform this action'
             });
         }
         user.hashed_password = undefined;
         user.slat = undefined;
          res.json(user);
      }
      
      );
};





exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  
    User.find()
      .select("-hashed_password")
      .select("-salt")
      .sort([[sortBy, order]])
    
      .exec((err, users) => {
        if (err) {
          return res.status(400).json({
            error: "Users not found"
          });
        }
        res.json(users);
      });
  };


  exports.remove = (req, res) => {
    let user = req.user;
    user.remove((err, dletedUser) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json({
        message: "User deleted succesfully"
      });
    });
  };
  

