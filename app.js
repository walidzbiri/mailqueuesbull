const express= require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { ensureLoggedIn } = require('connect-ensure-login');

const {sendEmail}=require('./emailProducer');
const{serverAdapter}=require('./emailQueue');

const app=express();

passport.use(new LocalStrategy(function (username, password, cb) {
    if (username === 'bull' && password === 'board') {
    return cb(null, { user: 'bull-board' });
    }
    return cb(null, false);
}));

passport.serializeUser((user, cb) => {
cb(null, user);
});

passport.deserializeUser((user, cb) => {
cb(null, user);
});

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({ secret: 'keyboard cat' }));
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json());

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize({}));
app.use(passport.session({}));
app.get('/ui/login',(req, res) => {
  res.render('login');
});

app.post('/ui/login',passport.authenticate('local', { failureRedirect: '/ui/login' }),
(req, res) => {
  res.redirect('/admin/queues');
});


app.use('/admin/queues', ensureLoggedIn({ redirectTo: '/ui/login' }),serverAdapter.getRouter());

app.post('/send-mail',async(req,res)=>{
    await sendEmail(req.body);
    res.send({status:"ok"});
})

app.listen(5000,()=>{console.log("App running on port 5000")})

