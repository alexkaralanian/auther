

var router = require('express').Router();
var session = require('express-session');

router.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool', // or whatever you like
  // these options are recommended and reduce session concurrency issues
  resave: false,
  saveUnitialized: false
}));

router.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

// place right after the session setup middleware
router.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

module.exports = router;
