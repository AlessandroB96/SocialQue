const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Please enter a reaction!',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Please enter a username'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtValue => dateFormat(createdAtValue)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const thoughtSchema = new Schema (
    {
    thoughtText: {
        type: String,
        required: 'Please enter a thought!',
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtValue => dateFormat(createdAtValue)
    },
    username: {
        type: String,
        required: 'Please type in your username',
    },
    reactions: [reactionSchema]       
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce((total, thoughts) => total + thoughts.reactions.length + 1, 0)
})

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;