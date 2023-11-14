import React, { useEffect, useState } from 'react'
import { getDatabase, push, ref, set,onValue,remove,update   } from "firebase/database";
import Hedding from './Hedding';
import { Button } from 'keep-react';
import Paragraph from './Paragraph';

const FirebaseTodo = () => {
    const db = getDatabase();
    const [todo,setTodo]=useState('');
    const [todoArray,setTodoArray]=useState([])
    const [todoId,setTodoId]= useState('')
    const [updet,setUpdet]= useState(false)
    const [error,setError]= useState('')

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

        if(!todo){
            setError('please inter your list')
        }else{
            setError('')
            set(push(ref(db, 'todo-list')), {
                todo:todo
              }).then(()=>{
                setTodo('')
              })
        }

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
    <div className='grid justify-center items-center bg-gray-900 h-screen'>
        <div className='bg-white p-10 text-center'>
        <Hedding text='TODO LIST'/>
        <input  className='py-2 px-5 ring my-5' onChange={handleChange} type="text" placeholder='inter your list' value={todo} />
        {updet
            ? <button className='py-2 px-5 bg-blue-800 text-white mx-2' onClick={handleUpdate}>update</button>
            :<button className='py-2 px-5 bg-blue-800 text-white mx-2' onClick={handleAdd}>add todo</button>
        }
        {error&&<Paragraph className='text-red-700 mb-3' text={error}/>}
        <ul>
            {todoArray.map((item,id)=>(
                <li className='bg-gray-700 text-white py-3 flex justify-between px-5 box-border my-2 hover:bg-gray-900' key={id}>{item.todo}<button onClick={()=>handleEdit(item)}>edit</button> <button onClick={()=>handleDelet(item.id)}>delete</button></li>
            ))}
        </ul>
    </div>
    </div>
  )
}

export default FirebaseTodo