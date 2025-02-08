//react hooks
import { useEffect } from 'react'
import useWorkoutsContext from '../hooks/useWorkoutsContext';

//components
import WorkoutDetails from '../components/WorkoutDetails';
import CreateWorkout from '../components/CreateWorkout';

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext();
  
  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json();

      if(response.ok){
        dispatch({type: "SET_WORKOUTS", payload: json})
      }
    }
    fetchWorkout();
  },[])

  return (
    <div className='home'>
      <div className="workouts">
        {workouts && workouts.map( workout => (
          <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
      </div>
      <CreateWorkout />
    </div>
  )
}

export default Home