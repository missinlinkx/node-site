

module.exports = function () {
  return function (req,res,next) {
    // save previously entered registration form data from flashes to locals
    res.locals.prevReq = req.session.flashes.prevReq || {}
    console.log('res', res.locals.prevReq);
    console.log(req.session.flashes.prevReq);
    // continue with next app module
    next();
  }
}
