const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
async (email, password, done) => {
    try {
        const user = await User.create({email, password});
        return done(null, user)
    } catch (error) {
        console.log(error);
        return done(error);
    }
}
));

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
async (email, password, done) => {
    try{
        const user = await User.findOne({email});
        if(!user){
            return done(null, false, {message: "User not found"});
        }
        const validate = await user.isValidPassword(password);
        if(!validate){
            return done(null, false, {message: "Wrong password"});
        }
        return done(null, user, {message: "Logged in successfully"});
    }catch(err){
        console.log(err);
        return done(err);
    }
}
));

passport.use(new JWTStrategy(
    {
        secretOrKey: 'TOP-SECRET',
        jwtFromRequest:ExtractJWT.fromUrlQueryParameter('secret-token')
    },
    async (token, done) => {
        try{
            return done(null, token.user)
        }catch(err){
            console.log(err);
            done(err);
        }
    }
))