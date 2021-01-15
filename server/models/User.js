const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Username is required'
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        trim: true,
        required: 'Password is required',
    },
    bio: {
        type: String,
        trim: true,
        maxLength: 300
    },
    picture: {
        type: String,
        trim: true,
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    privacy_mode: {
        type: Boolean,    
        default: false    
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;