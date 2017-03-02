

module.exports = function () {
  return function (req,res,next) {
    req.flash = req.session.flashes || {};
    req.session.flashes = {};
    next();
  }
}
