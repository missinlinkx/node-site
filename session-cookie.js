const uuidV4 = require('uuid/v4');
var Redis = require('ioredis');
var redis = new Redis();

module.exports = function() {
  return function(req, res, next) {
    var sid = req.cookies.sid || ('' + uuidV4());

    res.on('finish', function () {
      console.log('Saving session ' + sid + ' to REDIS!!!11', JSON.stringify(req.session));
      redis.set('sid.'+sid, JSON.stringify(req.session), 'EX', 30 * 60);
    });

    if (req.cookies.sid === undefined) {
      console.log('creating new session', sid);
      res.cookie('sid', sid);
      req.session = {};
      return next();
    }

    console.log('Getting session ' + sid + ' from REDIS!!')
    return redis.get('sid.'+sid, function (err, sessionData) {
      console.log('Session data for session ' + sid, sessionData);
      req.session = JSON.parse(sessionData) || {};
      next();
    });
  }
}
