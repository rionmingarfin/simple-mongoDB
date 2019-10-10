"use strict"

const mongose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
// register
User.pre('save', async function (next) {
    try {
        //geneeet salt
        const salt = await bcrypt.genSaltSync(10);
        //generet password hash and salt
        const passwordHash = await bcrypt.hashSync(this.password, salt)
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error)
    }
})
//login
User.methods.isValidatPassword = async function(newPassword){
    try {
        // console.log(this.password);
        // di convvert ke semula toeknnya dengan compire
        return await bcrypt.compare(newPassword,this.password)
    } catch (error) {
        throw new error('error valid',error)
    }
}
module.exports = mongose.model('User', User)