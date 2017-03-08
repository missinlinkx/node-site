

module.exports = function () {
  return function (req,res,next) {
    // create flash object to store session flash data OR set to empty object
    req.flash = req.session.flashes || {};

    // send flash data to locals in the response
    res.locals.flashes = req.flash;

    // empty session flash data
    req.session.flashes = {};

    // move on to next module
    next();
  }
}
