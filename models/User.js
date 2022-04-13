const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema (
    
    {
        username: {
            type: String,
            unique: true,
            required: 'Please enter a username!',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            validate: function(valid) {
                return /^([a-zA-Z0-9_\.-]+)@([\da-z-]+)\.([a-z]{2,6})$/.test(valid);
            },
            required: [true, 'Please enter an email']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);

const User = model('User', UserSchema);

module.exports = User;