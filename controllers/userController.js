const User = require("../models/userModel")

// CREATE USER
const createUser = async(req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        return res.status(201).json({ user: savedUser });
    } 
    catch (err) {
        return res.status(500).json({"message" : err});
    }
}


// GET USERS
const getUsers = async(req, res) => {
    const qSearch = req.query.search;
    const qDomain = req.query.domain;
    const qGender = req.query.gender;
    const qAvailability = req.query.availability;
    const qLimit = parseInt(req.query.limit);
    const qPage = parseInt(req.query.page);
    try{
        const users = await User.aggregate([
            {
                $match: {
                    $or : [
                        {
                            first_name : qSearch !== "" ? { $regex: new RegExp(qSearch , 'i') } : { $exists: true }
                        },
                        {
                            last_name : qSearch !== "" ? { $regex: new RegExp(qSearch , 'i') } : { $exists: true }
                        }
                    ]
                } 
            },
            {
                $match: {
                    domain:  qDomain !== "" ? { $regex: new RegExp(`^${qDomain}$` , 'i') } : { $exists: true } , // Filter by domain if provided
                },
            },
            {
                $match: {
                    gender : qGender !== "" ? { $regex: new RegExp(`^${qGender}$` , 'i') } : { $exists: true }  // Filter by gender if provided
                },
            },            
            {
                $match: {
                    available : qAvailability !== "" ? qAvailability === "true" : { $exists: true }                      
                },
            },
        ])
        //.skip((qPage-1)*qLimit).limit(qLimit);

        const domainList = [... new Set(users.map(user => user.domain))]

        const startIndex = (qPage - 1) * qLimit;
        const endIndex = startIndex + qLimit;
        // Slicing items from array according to page and limit
        const items = users.slice(startIndex, endIndex);     
        // Calculate the total number of pages
        const totalPages = Math.ceil(users.length / qLimit);

        if(users.length > 0){
            res.status(200).json({items, totalPages, domainList});
        }
        else{
            res.status(400).json({ "message" : "No items Found."});
        }
    }
    catch(err){
        return res.status(500).json({"message" : err});
    }
}


// GET USER
const getUser = async(req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findById({_id : id});
        if (!user) {
            return res.status(500).json({"message" : "User Not Found"});
        }
        return res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json({"message" : err});
    }
}


// UPDATE USER
const updateUser = async(req, res) => {
    try{
        const id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(500).json({"message" : "User Not Found"});
        }
        return res.status(204).json({"message" : "User Updated"});
    }
    catch(err){
        return res.status(500).json({"message" : err});
    }
}


// DELETE USER
const deleteUser = async(req, res) => {
    try{
        const id = req.params.id;
        const deletedUser = await User.findByIdAndRemove(id);
        if (!deletedUser) {
            return res.status(500).json({"message" : "User Not Found"});
        }
        
        return res.status(204).json({"message" : "User Deleted"});
    }
    catch(err){
        return res.status(500).json({"message" : err});
    }
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
}