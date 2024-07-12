const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petsSchema = new Schema({
    petName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likedUsers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikedUsers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
})

module.exports = mongoose.model("Pets", petsSchema)