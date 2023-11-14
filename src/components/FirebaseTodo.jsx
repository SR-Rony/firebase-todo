import React, { useEffect, useState } from 'react'
import { getDatabase, push, ref, set,onValue,remove,update   } from "firebase/database";
import Hedding from './Hedding';
import { Button } from 'keep-react';
import Paragraph from './Paragraph';

const FirebaseTodo = () => {
    const db = getDatabase();
    const [todo,setTodo]=useState({
        title: "",
        description: ""
    });
    const [todoArray,setTodoArray]=useState([])
    const [todoUserArray,setTodoUserArray]=useState([])
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
        // user list
        const todoUserRef = ref(db, 'users');
        onValue(todoUserRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                array.push({...item.val(),id:item.key})
            })
            setTodoUserArray(array)
        });
    },[])

    // todo input change
    const handleChange = (e) =>{
        setTodo({...todo, [e.target.name]:e.target.value})
    }

    // todo add button
    const handleAdd = () =>{

        if(!todo){
            setError('please inter your list')
        }else{
            setError('')
            set(push(ref(db, 'todo-list')), {
                title:todo.title,
                description:todo.description
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
    <div className='flex justify-center items-center bg-gray-900 h-screen'>
        <div className='bg-white p-10 text-center w-1/3'>
        <Hedding text='TODO LIST'/>
        <input  className='py-2 px-5 ring my-5' name='title' onChange={handleChange} type="text" placeholder='title' value={todo.title} />
        <input  className='py-2 px-5 ring my-5' name='description' onChange={handleChange} type="text" placeholder='description' value={todo.description} />
        {updet
            ? <button className='py-2 px-5 bg-blue-800 text-white mx-2' onClick={handleUpdate}>update</button>
            :<button className='py-2 px-5 bg-blue-800 text-white mx-2' onClick={handleAdd}>add todo</button>
        }
        {error&&<Paragraph className='text-red-700 mb-3' text={error}/>}
        <ul>
            {todoArray.map((item,id)=>(
                <div>
                    <li className='bg-gray-700 text-white py-3 flex justify-between px-5 box-border my-2 hover:bg-gray-900' key={id}>{item.title+" "+item.description}<button onClick={()=>handleEdit(item)}>edit</button> <button onClick={()=>handleDelet(item.id)}>delete</button></li>
                    {/* <li className='bg-gray-700 text-white py-3 flex justify-between px-5 box-border my-2 hover:bg-gray-900' key={id}>{item.description}</li> */}
                </div>
            ))}
        </ul>
    </div>
    <div className='bg-white w-1/3 p-2'>
        <Hedding text="User list"/>
        <div className=''>
        {todoUserArray.map(item=>(
        <div className='flex justify-between'>
        <Hedding text={item.userName}/>
        <button className='bg-red-500 p-2 text-white bold'>access</button>
        </div>
    ))}
        </div>
        
    </div>
    
    
    </div>
  )
}

export default FirebaseTodo