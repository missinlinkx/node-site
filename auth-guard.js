
module.exports = function (options) {

  // include options for authentication guard, ex. redirectUrl
  options = options || {};
  // either redirect to the sent url, or home page if no option is requested
  options.redirectUrl = options.redirectUrl || '/';

  return function (req,res,next) {
    // if user is not logged in (username not saved in session data),
    if (!req.session.username) {
      // send error message to flashes (to be sent to locals via module)
      req.session.flashes['errorMessage'] = 'Please log in first to access the requested page.';
      // redirect to the page requested in options
      return res.redirect(options.redirectUrl);
    }
    // continue with next module
    next();
  }
}
