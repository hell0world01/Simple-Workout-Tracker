import {React, useContext} from 'react'
import { WorkoutsContext } from '../context/WorkoutContext'

const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);
  if(!context){
    throw Error("useWorkoutsContext must be used inside an WorkoutContextProvider!!")
  }
  return context
}

export default useWorkoutsContext