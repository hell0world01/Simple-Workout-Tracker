import React, { useState } from 'react'
import useWorkoutsContext from '../hooks/useWorkoutsContext';
import { use } from 'react';
const CreateWorkout = () => {
    const [title, setTitle] = useState("");
    const [reps, setReps] = useState("");
    const [load, setLoad] = useState("");
    const [error, setError] = useState("");
    const [emptyInputs, setEmptyInputs] = useState([]);

    const {dispatch} = useWorkoutsContext();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = {
            title, 
            reps, 
            load,
        }
        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json();
        console.log(json);
        if(!response.ok){
            setError(json.error)
            setEmptyInputs(json.emptyInputs)
        }
        if(response.ok){
            setTitle("");
            setReps("");
            setLoad("");
            setError(null);
            setEmptyInputs([])
            dispatch({type: "CREATE_WORKOUT", payload: json})
        }
    }
  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New workout</h3>
        <label htmlFor="title">Exercise Title:</label>
        <input id='title' value={title} type="text" className={emptyInputs.includes("title") ? "error" : ""} onChange={(e) => setTitle(e.target.value)}/>

        <label htmlFor="load">Load (Kg):</label>
        <input id='load' value={load} type="number" className={emptyInputs.includes("load") ? "error" : ""} onChange={(e) => setLoad(e.target.value)}/>

        <label htmlFor="reps">Reps:</label>
        <input id='reps' value={reps} type="number" className={emptyInputs.includes("reps") ? "error" : ""} onChange={(e) => setReps(e.target.value)}/>
        
        <button>
            Add workout
        </button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default CreateWorkout