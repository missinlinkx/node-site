
module.exports = function (options) {
  options = options || {};
  options.redirectUrl = options.redirectUrl || '/';

  return function (req,res,next) {
    if (!req.session.username) {
      req.session.flashes['errorMessage'] = 'Please log in first to access the requested page.';
      return res.redirect(options.redirectUrl);
    }
    next();
  }
}
