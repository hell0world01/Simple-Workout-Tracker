import React from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
//Component
import useWorkoutsContext from '../hooks/useWorkoutsContext';

const WorkoutDetails = ({workout:{_id, title, reps, load,createdAt}}) => {

  const {dispatch} = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + _id,{
      method: "DELETE"
    })
    const json = await response.json();

    if(response.ok){
      dispatch({type:"DELETE_WORKOUT", payload: json})
    }
  }
  return (
    <div className='workout-details'>
        <h4>{title}</h4>
        <p><strong>Load (kg):</strong> {load}</p>
        <p><strong>Reps: </strong>{reps}</p>
        <p>{formatDistanceToNow( new Date(createdAt), {addSuffix: true})}</p>
        <span onClick={handleClick}>
        <MdOutlineDeleteOutline className='text-xl'/>
        </span>
    </div>
  )
}

export default WorkoutDetails