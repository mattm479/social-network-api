const { Schema, model } = require('mongoose');
const { ObjectId } = require("mongodb");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            unique: true,
            required: true,
            default: new ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: format_date
        }
    },
    {
        _id: false
    }
);

function format_date(createdAt) {
    return createdAt.toLocaleDateString();
}

module.exports = reactionSchema;