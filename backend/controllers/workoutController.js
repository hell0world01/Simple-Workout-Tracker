const Workout = require("../model/workoutModel");
const mongoose = require("mongoose");
//GET route
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
}

const getWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({Msg: "No such workout"});
    }
    const workouts = await Workout.findById(id)

    if(!workouts){
        return res.status(404).json({Msg: "The given id doesn't exist!!"});
    }
    res.status(200).json(workouts);
}

//POST route
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;
    try {
        const workout = await Workout.create({title, reps, load});
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({err: error.message})
    }
}

//UPDATE/PUT route

//DELETE route

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout
}