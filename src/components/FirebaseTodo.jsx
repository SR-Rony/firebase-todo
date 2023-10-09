import React, { useEffect, useState } from 'react'
import { getDatabase, push, ref, set,onValue,remove,update   } from "firebase/database";

const FirebaseTodo = () => {
    const db = getDatabase();
    const [todo,setTodo]=useState('');
    const [todoArray,setTodoArray]=useState([])
    const [todoId,setTodoId]= useState('')
    const [updet,setUpdet]= useState(false)

    useEffect(()=>{
        const todoRef = ref(db, 'todo-list');
        onValue(todoRef, (snapshot) => {
            let array =[]
            snapshot.forEach((todoItem)=>{
                array.push({...todoItem.val(),id:todoItem.key})
            })
            setTodoArray(array)
        });
    },[])

    // todo input change
    const handleChange = (e) =>{
        setTodo(e.target.value)
    }

    // todo add button
    const handleAdd = () =>{
        set(push(ref(db, 'todo-list')), {
            todo:todo
          }).then(()=>{
            setTodo('')
          })

    }
    // todo delete button
    const handleDelet = (id) =>{
        remove(ref(db, 'todo-list/'+id))
    }

    // todo edit button
    const handleEdit = (item)=>{
        setTodo(item.todo)
        setTodoId(item.id)
        setUpdet(true)
    }
    //todo update button
    const handleUpdate = ()=>{
        update(ref(db,'todo-list/'+todoId),{
            todo:todo
        }).then(()=>{
            setTodo('')
          }).then(()=>{
              setUpdet(false)
          })
    } 


  return (
    <div className='todo'>
        <h1>TODO LIST</h1>
        <input onChange={handleChange} type="text" placeholder='inter your list' value={todo} />
        {updet
            ? <button onClick={handleUpdate}>update</button>
            :<button onClick={handleAdd}>add todo</button>
        }
        <ul>
            {todoArray.map((item,id)=>(
                <li key={id}>{item.todo}<button onClick={()=>handleEdit(item)}>edit</button> <button onClick={()=>handleDelet(item.id)}>delete</button></li>
            ))}
        </ul>
    </div>
  )
}

export default FirebaseTodo