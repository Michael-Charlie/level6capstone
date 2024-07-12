const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    pets: {
        type: Schema.Types.ObjectId,
        ref: "Pets"
    }
})

module.exports = mongoose.model("Comment", commentSchema);