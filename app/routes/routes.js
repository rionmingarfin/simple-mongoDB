"use strict"

module.exports = (app) => {
    const category = require('../controller/category.controllers');
    const notes = require('../controller/notes.controllers');
    const user = require('../controller/user.cotrollers');
    const validateBody = require('../helpers/routeHelpers').validateBody;
    const passport = require('passport');
    const passportCon = require('./../../passport')
    const passportJwt =passport.authenticate('jwt',{session : false});
    const passportSigin = passport.authenticate('local',{session : false})
    //category
    app.post('/category', category.create);
    app.get('/category', category.findAll);
    app.get('/category/:Id', category.findOne);
    app.patch('/category/:Id', category.update);
    app.delete('/category/:Id', category.delete);
    //notes
    app.post('/notes', notes.create);
    app.get('/notes', notes.getNotes);
    app.get('/notes/:Id', notes.getById);
    app.patch('/notes/:Id', notes.update);
    app.delete('/notes/:Id', notes.delete);
    // user

    app.post('/signup',user.signUp);
    app.post('/signin',passportSigin,user.signIn);
    app.get('/screet',passportJwt,user.screet);
   
}