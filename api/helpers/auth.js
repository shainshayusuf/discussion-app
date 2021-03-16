module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      
      return next();
    }
    console.log(req.isAuthenticated())
    res.redirect('/');
  },
};