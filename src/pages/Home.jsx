import React, { useEffect } from 'react'
import FirebaseTodo from '../components/FirebaseTodo'
import { useSelector } from 'react-redux'

const Home = () => {

  let userInfo=useSelector(state=>(state.user.value))
  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }
  },[])

  return (
    <div>
        <FirebaseTodo/>
    </div>
  )
}

export default Home