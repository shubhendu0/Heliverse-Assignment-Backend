const Team = require("../models/teamModel")

// CREATE TEAM
const createTeam = async(req, res) => {
    try{
        if(req.body.length>0){
          const newTeam = new Team({team_members : req.body});
          const savedTeam = await newTeam.save();
          return res.status(201).json({ team: savedTeam });
        }
        else{
          return res.status(500).json({"message" : "Data is missing"});
        }
    }
    catch(err){
        return res.status(500).json({"message" : err});
    }
}


//GET TEAMS
const getTeams = async (req, res) => {
    try {
      const teams = await Team.find().populate('team_members');
      return res.status(200).json(teams);
    } 
    catch (err) {
        return res.status(500).json({"message" : err});
    }
}


//GET TEAM 
const getTeam = async (req, res) => {
  const id = req.params.id
  try {
    const team = await Team.findById(id).populate('team_members');
    return res.status(200).json(team);
  } 
  catch (err) {
    return res.status(500).json({"message" : err});
  }
}


module.exports = {
    createTeam,
    getTeams, 
    getTeam
};