

module.exports = function () {
  return function (req,res,next) {
    req.flash = req.session.flashes || {};
    res.locals.flashes = req.flash;
    req.session.flashes = {};
    next();
  }
}
