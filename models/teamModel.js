const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
    {
        // team_members : [
        //     {
        //         user: {
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: 'users', 
        //             required: true,
        //         }
        //     },
        // ]
        team_members: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "users",
            default: [],
        },
    },
    {
        timestamps: true,
    }
)

const Team = mongoose.model("teams", teamSchema);
module.exports = Team;