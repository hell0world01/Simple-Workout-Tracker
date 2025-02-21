const Workout = require("../model/workoutModel");
const mongoose = require("mongoose");

//GET route
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    if(!workouts) return res.status(500).json({msg:"Something went wrong with server!"})
    res.status(200).json(workouts);
}

//GET route (get workout by its id)
const getWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"});
    }
    const workouts = await Workout.findById(id)

    if(!workouts){
        return res.status(404).json({Msg: "The given id doesn't exist!!"});
    }
    res.status(200).json(workouts);
}

//POST/CREATE route
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;
    const emptyInputs = [];

    if(!title){
        emptyInputs.push("title");
    }
    if(!reps){
        emptyInputs.push("reps");
    }
    if(!load){
        emptyInputs.push("load");
    }

    if(emptyInputs.length > 0){
        return res.status(400).json({error: "Input all the fields", emptyInputs})
    }
    try {
        const workout = await Workout.create({title, reps, load});
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({err: error.message})
    }
}

//UPDATE/PUT route
const updateWorkout = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({Msg: "No such workout!"})
    }
    const workout = await Workout.findOneAndUpdate({_id:id}, {...req.body});
    if(!workout){
        return res.status(400).json({Msg: "The given id doesn't exist!!"});
    }
    res.status(200).json(workout);
}

//DELETE route
const deleteWorkout = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({Msg: "No such workout!"})
    }
    const workout = await Workout.findByIdAndDelete({_id: id});
    console.log(workout);
    if(!workout){
        return res.status(400).json({Msg: "The given id doesn't exist!!"});
    }
    res.status(200).json(workout);
}
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}