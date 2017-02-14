var app = require('express')();
var router = require('express').Router();
var path = require('path');
var User = require('../api/users/user.model');



router.post('/', (req, res, next) => {

  //console.log('body', req.body)
  User.findOne({ where: req.body})
  .then((userInstance) => {

    if (userInstance) {

      req.session.userId = userInstance.id;
      console.log('session:', req.session)
      console.log('email/password', userInstance.email, userInstance.password)
      //res.json(userInstance.id)
      res.json({ success: true, user: userInstance});
      //res.sendStatus(200);
    } else {
      res.json({ success: false});
      //res.sendStatus(401);
    }
  })
  .catch(next)

});

module.exports = router;
