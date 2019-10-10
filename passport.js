const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local')
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./app/models/user.models');
require('dotenv/config');


//JSON WEB TOKENS STARTEGY
//scret token
passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SCRET
}, async (payload, done) => {
    try {
        //find the user specified in token
        const user = await User.findById(payload.sub)
        console.log('user register',payload.sub)
        //if user doesn't it handle it exists
        if (!user) {
            return done(null, false)
        }
        //otherwise, return the user
        done(null, user)
        // console.log('useru',user)
    } catch (error) {
        done(error, false)
    }
}))

//LOCAL STRATEGY
passport.use( new localStrategy({
    usernameField : 'email'
},async (email,password,done) => {
    try {
        //find the user given the email
        const user =await User.findOne({email})
        console.log('user tes',user)
        //if not handle it
        if (!user) {
            return done(null, false, {message:'Unable to login'})
        }
        //check it the password incoret
        const isMatch = await user.isValidatPassword(password)
        //if not,handle it
        if (!isMatch) {
            return done(null,false)
        }
        //otherwise,return the user
        done(null,user)
    } catch (error) {
        done('eroro user',error,{message:'Unable to login'})
    }
}
))