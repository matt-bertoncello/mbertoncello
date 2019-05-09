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
  console.log('[INFO] req.session.passport.user data:');
  console.log(req.session.passport.user);
  res.render('user', {req: req});
});

function checkAuthentication(req,res,next){
    if(req.session.passport.user){
        //req.isAuthenticated() will return true if user is logged in
        console.log('[SUCCESS] user is logged-in as: '+req.session.passport.user.email);
        next();
    } else{
      console.log('[ERROR] user is not logged-in. Redirect to login page');
      res.redirect("/login");
    }
}

module.exports = router;
