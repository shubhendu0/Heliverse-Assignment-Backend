const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        id : {
            type: String,
            required: [true, "Please provide id"]
        },
        first_name : {
            type: String,
            required: [true, "Please provide name"]
        },
        last_name : {
            type: String,
            required: [true, "Please provide last name"]
        },
        email : {
            type: String,
            required: [true, "Please provide unique email"],
            unique: [true, "This email is already in use"],
        },
        gender : {
            type: String,
            required: [true, "Please provide gender"]
        },
        avatar: {
            type: String,
            required: [true, "Please add a avatar"]
        },
        domain : {
            type: String,
            required: [true, "Please provide domain"]
        },
        available : {
            type: Boolean,
            required: [true, "Please provide availability"]
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("users", userSchema);
module.exports = User;