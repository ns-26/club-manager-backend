const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({

    username : {
        type: String ,
        required : true ,
        min: 6
    },
    password : {
        type : String ,
        required : true,
        min : 8,
    }

});

module.exports = mongoose.model('User',registerSchema);