import React, { useEffect, useState } from 'react'

const LocalTodo = () => {
    const [todo,setTodo]=useState('');
    const [todoArray,setTodoArray]=useState([])
    useEffect(()=>{
      let localTodo=localStorage.getItem('todo').JSON.parse(todoArray);
      console.log(localTodo)
    })


    // todo input change
    const handleChange = (e) =>{
        setTodo(e.target.value)
    }
    // todo handle add button`
    const handleAdd = () =>{
      todoArray.push(todo)
      setTodoArray([...todoArray])
      localStorage.setItem('todo',JSON.stringify(todoArray))
    }


  return (
    <div className='todo'>
        <input onChange={handleChange} type="text" placeholder='inter your list' value={todo} />
        <button onClick={handleAdd}>add todo</button>
        {todoArray.map((item,index)=><li key={index}>{item}</li>)}
    </div>
  )
}

export default LocalTodo