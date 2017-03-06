

module.exports = function () {
  return function (req,res,next) {
    res.locals.username = req.session.username || undefined;
    res.locals.loggedIn = req.session.loggedIn || false;
    next();
  }
}
