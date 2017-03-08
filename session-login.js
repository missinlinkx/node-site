

module.exports = function () {
  return function (req,res,next) {
    // save username from session data to locals when logged in OR set to undefined
    res.locals.username = req.session.username || undefined;

    // save login token from session data to locals OR set to false
    res.locals.loggedIn = req.session.loggedIn || false;

    // continue with next app module
    next();
  }
}
