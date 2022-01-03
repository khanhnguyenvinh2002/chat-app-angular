const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    room:{
        type:[String]
    }
})

const User = mongoose.model('user', userSchema);
module.exports = User;
