var counter = 0;
var session = {};

module.exports = function() {
  return function(req,res,next) {
    var sid = req.cookies.sid;
    if (sid === undefined) {
      sid = counter++;
      res.cookie('sid', ''+sid);
      session[sid] = {};
    }
    req.session = session[sid];
    next();
  }
}
