

module.exports = function () {
  return function (req,res,next) {
    // save previously entered registration form data from flashes to locals
    // breaks without condition because user module must run before flash module in server.js in order for any data to end up in the flash object
    if (req.session.flashes) {
      res.locals.prevReq = req.session.flashes.prevReq || {};
    }
    // continue with next app module
    next();
  }
}
