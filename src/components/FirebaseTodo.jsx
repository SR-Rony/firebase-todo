import React, { useEffect, useState } from 'react'
import { getDatabase, push, ref, set,onValue,remove,update , } from "firebase/database";
import Paragraph from './Paragraph';
import Heading from './Heading';
import Modal from 'react-modal';
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import SR from '../assets/rr.png'
import Button from './Button';
import { activeUser } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'500px'
    },
  };

  Modal.setAppElement('#root');

const FirebaseTodo = () => {
    const auth = getAuth();
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
    const [sendTodo,setSendTodo]=useState('')
    // user info
    let userInfo=useSelector(state=>(state.user.value))
    let navigate =useNavigate()
    let dispatch=useDispatch()
    // modal stat
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    useEffect(()=>{
        const todoRef = ref(db, 'todo-list');
        onValue(todoRef, (snapshot) => {
            let array =[]
            snapshot.forEach((todoItem)=>{
                if(userInfo.uid==todoItem.val().userId){
                    array.push({...todoItem.val(),id:todoItem.key})
                }
            })
            setTodoArray(array)
        });
        // user list
        const todoUserRef = ref(db, 'users');
        onValue(todoUserRef, (snapshot) => {
            let array =[]
            snapshot.forEach((item)=>{
                if(item.key!=userInfo.uid){
                    array.push({...item.val(),id:item.key})
                }

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
                description:todo.description,
                userId:userInfo.uid,
                userName:userInfo.displayName
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
        })
        setUpdet(true)
        setTodoId(item.id)
    }
    //todo update button
    const handleUpdate = ()=>{
        update(ref(db,'todo-list/'+todoId),{
            title:todo.title,
            description:todo.description
        }).then(()=>{
            setTodo({
                title: "",
                description: ""
            })
          }).then(()=>{
              setUpdet(false)
          })
    } 
    // modal function
    function openModal(item) {
        setIsOpen(true);
        setSendTodo(item)
      }
    
    function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
    }
    
    function closeModal() {
    setIsOpen(false);
    }

    // handle send message
    const handleSend =(item)=>{
        // set(push(ref(db, 'todo-list')), {
        //     title:sendTodo.title,
        //     description:sendTodo.description,
        //     sendName:userInfo.displayName,
        //     sendId:userInfo.uid,
        //     receivName:item.userName,
        //     receivId:item.id,
        //   })

        console.log({
            title:sendTodo.title,
            description:sendTodo.description,
            sendName:userInfo.displayName,
            sendId:userInfo.uid,
            receivName:item.userName,
            receivId:item.id,
            id:sendTodo.id
        });
    }  
    // handle logout button
    const handleLogout =()=>{
        signOut(auth).then(() => {
            dispatch(activeUser(null));
            localStorage.removeItem('userdata')
            navigate('/login')
          })
          console.log('logout');
    }

  return (
    <div className="bg-gray-900 w-screen h-screen p-5 box-border">
        <div className='grid grid-cols-7 gap-3 h-full'>
                <div className='col-span-1 bg-white px-2 py-5 text-center'>
                    <img className='w-20 h-20 rounded-full ring bg-slate-800 mx-auto' src={SR} alt="img" />
                    <Heading className='my-5' text={userInfo.displayName}/>
                    <Button onClick={handleLogout} text='Logout'/>
                </div>
                <div className='col-span-3 bg-white p-10 text-center'>
                    <Heading text='TODO LIST'/>
                    <div>
                            <div className='w-full'>
                                <input  className='py-2 px-5 ring my-2 w-full' name='title' onChange={handleChange} type="text" placeholder='title' value={todo.title} />
                                {titleError&&<Paragraph className='text-red-700 my-2' text={titleError}/>}
                            </div>
                            <div className="w-full">
                                <textarea  className='p-2 ring my-2 w-full h-48' name='description' onChange={handleChange} type="text" placeholder='description' value={todo.description} />
                                {descriptionError&&<Paragraph className='text-red-700 my-2' text={descriptionError}/>}
                            </div>
                            {updet
                                ? <Button onClick={handleUpdate} text='Update'/>
                                : <Button onClick={handleAdd} text='Add Todo'/>
                            }
                        </div>
                    </div>
                <div className='col-span-3 bg-white p-2'>
                    <Heading className='text-center' text="All Todo List"/>
                    {todoArray.map((item)=>(
                        <div key={item.id} className=' text-center bg-gray-700 text-white p-2 hover:bg-gray-900 my-2'>
                            <div>
                                <Paragraph text={item.title}/>
                                <Paragraph text={item.description}/>
                            </div>
                            <div className='flex gap-2 justify-center mt-5'>
                                <Button onClick={()=>handleEdit(item)} text='Edit'/>
                                <Button onClick={()=>openModal(item)} text='Send'/>
                                <Button onClick={()=>handleDelet(item.id)} text='Delete'/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* modal */}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <Heading className='text-center' text='User List'/>
                <div>
                    {todoUserArray.map(item=>(
                        <div className='flex justify-between bg-gray-700 text-white p-2 hover:bg-gray-900 my-2'>
                            <Heading text={item.userName}/>
                            <IoIosSend className='text-2xl cursor-pointer' onClick={()=>handleSend(item)} />
                        </div>
                    ))}
                </div>
            </Modal>
    </div>
  )
}

export default FirebaseTodo