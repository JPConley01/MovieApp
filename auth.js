var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

/** Express Session Setup **/

var session = require('express-session');
app.sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
});
app.use(app.sessionMiddleware);


/** End Express Session Setup **/


/** Body Parser Setup **/
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/** End Body Parser Setup **/

/** Database setup **/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user');

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mcollection: { type: [Object]},
    vcollection: { type: [Object]},
    bcollection: { type: [Object]}
});
var User = mongoose.model('user', userSchema);
/** End database setup **/


/** Passport Config **/
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize()); // Tells server that we want to use passport.  Gives passport access to what's going on in our server
app.use(passport.session());  // Sessions are how our servers remember who we are - so we give passport access to them.  Passport will automatically store / retrieve data from our sessions for us

// cookies are strings. strings are "SERIAL" data.
passport.serializeUser(function(user, done) {
    done(null, user.id);
}); // What passport is storing on the client (cookie)
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
}); // How passport finds the corresponding user using the cookie

// When someone tries to log in to our site, how do we determine that they are who they say they are?
var bcrypt = require('bcryptjs');
// the user will POST to /login, with req.body.username and req.body.password
// by default, passport looks at req.body.username / req.body.password
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false); // No error and no user
            }
            // If we got this far, then we know that the user exists. But did they put in the right password?
            bcrypt.compare(password, user.password, function(error, matched){
                if (matched === true){
                    return done(null,user); // No error and this is the user they should be signed in as
                }
                else {
                    return done(null, false); // Passwords didn't match no error and no user
                }
            });
        });
    }
));
/** End Passport Config **/

/** Middleware **/
app.isAuthenticated = function(req, res, next){
    // If the current user is logged in...
    if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue.
        return next();
    }
    // If not, redirect to login
    console.log('get outta here!');
    res.redirect('/');
};


app.isAuthenticatedAjax = function(req, res, next){
    // If the current user is logged in...
    if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue.
        return next();
    }
    // If not, redirect to login
    res.send({error:'not logged in'});
};

// app.isJohnAuthenticated = function(req,res,next){
//     if (req.isAuthenticated() && req.user.username.toLowerCase() === 'john' ) {
//         console.log("Here req.authenticated");
//         return next();
//     }
//     res.redirect('/');
// };

/** END Middleware **/








app.get('/', function(req, res){
    console.log('session?', req.session);
    if ( req.session.views === undefined ) { req.session.views = 0}
    else { req.session.views++}
    res.sendFile('/html/login.html', {root: './public'});
} )













app.post('/signup', function(req, res){

    bcrypt.genSalt(11, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
            var newUser = new User({
                username: req.body.username,
                password: hash,
            });
            newUser.save(function(saveErr, user){
                if ( saveErr ) { res.send({ err:saveErr }); }
                else {
                    req.logIn(user, function(loginErr){
                        if ( loginErr ) { res.send({ err:loginErr }); }
                        else { res.send({success: 'success'}); }
                    });
                }
            });
        });
    });
});

app.post('/login', function(req, res, next){
    //function being passed into authenticate method as the 2nd argument is the done function from the LocalStrategy
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({error : 'something went wrong :('}); }
        req.logIn(user, function(err) {
          console.log("Hello req.login", err);
            if (err) { return next(err); }
            return res.send({success:'success'});
        });
    })(req, res, next);
});


// 2 kinds of middleware
// app.use is like 'vertical middleware'. They get evaluated from top to bottom.
// there is also inline, or 'horizontal' middleware.
app.get('/movies', app.isAuthenticated, function(req, res){
    console.log("Here res.send");
    res.sendFile('/html/movies.html', {root: './public'});
});

app.get('/api/me', app.isAuthenticatedAjax, function(req, res){
    res.send({user:req.user});
});

// Stupid simple err catcher
app.use(function(req, res){
    res.send({err : 'Something bad happened'});
});

app.listen(process.env.PORT || 3000);
