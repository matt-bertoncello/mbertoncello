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
  console.log('[INFO] req.user data:');
  console.log(req.user);
  res.render('user', { user: req.user });
});

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}

module.exports = router;
