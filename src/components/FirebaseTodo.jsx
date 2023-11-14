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
    const [titleError,setTitleError]= useState('')
    const [descriptionError,setDescriptionError]= useState('')

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
        if(e.target.name=='title'){
            setTitleError('')
        }
        if(e.target.name=='description'){
            setDescriptionError('')
        }
    }

    // todo add button
    const handleAdd = () =>{

        if(!todo.title){
            setTitleError('please inter your title')
        }
        if(!todo.description){
            setDescriptionError('please inter your description')
        }
        if(todo.title&& todo.description){
            setTodo({
                title: "",
                description: ""
            })
            set(push(ref(db, 'todo-list')), {
                title:todo.title,
                description:todo.description
              }).then(()=>{
                setTodo({
                    title: "",
                    description: ""
                })
              })
        }

    }
    // todo delete button
    const handleDelet = (id) =>{
        remove(ref(db, 'todo-list/'+id))
    }

    // todo edit button
    const handleEdit = (item)=>{
        setTodo({
            title:item.title,
            description: item.description
        }).then(()=>{
            setUpdet(true)
            setTodoId(item.id)
        })
    }
    //todo update button
    const handleUpdate = ()=>{
        update(ref(db,'todo-list/'+todoId),{
            title:todo.title,
            description:todo.description
        }).then(()=>{
            setTodo('')
          }).then(()=>{
              setUpdet(false)
          })
    } 


  return (
    <div className="bg-blue-900">
        <div className="container mx-auto">
            <div className='grid grid-cols-3 justify-center items-center h-screen'>
                <div className='col-span-2 bg-white p-10 text-center'>
                    <Hedding text='TODO LIST'/>
                    <div className="">
                        <div>
                            <div className='w-full'>
                                <input  className='py-2 px-5 ring my-5 w-1/2' name='title' onChange={handleChange} type="text" placeholder='title' value={todo.title} />
                                {titleError&&<Paragraph className='text-red-700 my-2' text={titleError}/>}
                            </div>
                            <div className="w-full">
                                <input  className='py-2 px-5 ring my-5 w-1/2' name='description' onChange={handleChange} type="text" placeholder='description' value={todo.description} />
                                {descriptionError&&<Paragraph className='text-red-700 my-2' text={descriptionError}/>}
                            </div>
                            {updet
                                ? <button className='py-2 px-5 bg-blue-800 text-white mx-2' onClick={handleUpdate}>update</button>
                                :<button className='py-2 px-5 bg-blue-800 text-white mx-2' onClick={handleAdd}>add todo</button>
                            }
                        </div>
                    </div>
                    
                    <ul>
                        {todoArray.map((item,id)=>(
                            <div className='flex justify-between items-center w-1/2 bg-gray-700 text-white p-2 box-border hover:bg-gray-900 my-2 mx-auto'>
                                <div>
                                    <li key={id}>{item.title}</li>
                                    <li key={id}>{item.description}</li>
                                </div>
                                <div className='text-end'>
                                    <button className='py-2 px-5 bg-blue-800 text-white mx-2 block my-2' onClick={()=>handleEdit(item)}>edit</button> 
                                    <button className='py-2 px-5 bg-blue-800 text-white mx-2 block my-2' onClick={()=>handleDelet(item.id)}>delete</button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className='col-span-1 bg-white p-2 ml-5 text-center'>
                    <Hedding text="User list"/>
                    {todoUserArray.map(item=>(
                        <div className='flex justify-between bg-gray-700 text-white text-center my-2 hover:bg-gray-800 px-2'>
                            <Hedding text={item.userName}/>
                            <button className='py-2 px-5 bg-blue-800 text-white'>access</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default FirebaseTodo