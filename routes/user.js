var express = require('express');
var router = express.Router();

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/login')
// }
//
// /* GET users listing. */
// router.get('/', ensureAuthenticated, function(req, res, next) {
//   res.render('pages/user', { user: req.user });
// });

router.get('/',checkAuthentication,function(req,res){
  res.render('user', {req: req});
});

function checkAuthentication(req,res,next){
    /* If session has never been initialised on client side, also redirect to login page */
    if(req.session.passport && req.session.passport.user){
        next();
    } else{
      console.log('[ERROR] user is not logged-in. Redirect to login page');
      res.redirect("/login");
    }
}

module.exports = router;
