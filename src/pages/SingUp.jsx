import React, { useState } from 'react'
import Heading from '../components/Heading'
// import {TextInput } from "keep-react";
import Paragraph from '../components/Paragraph';
import { getAuth, createUserWithEmailAndPassword,updateProfile,sendEmailVerification } from "firebase/auth";
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import { getDatabase,ref, set } from "firebase/database";
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'

const SingUp = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [inputValue,setInputValue]=useState({fullName:'',email:'',password:''})
    let {fullName,email,password}=inputValue
    const [passworeShow,setPasswordShow]=useState(false)
    const [lodding,setLodding]=useState(false)
    // all error state
    const [nameError,setNameError]=useState('')
    const [emailError,setEmailError]=useState('')
    const [passwordError,setPasswordError]=useState('')
    let navigate=useNavigate()

    // input change
  const handleChange =(e)=>{
    setInputValue({...inputValue,[e.target.name]:e.target.value})
    if(e.target.name=='fullName'){
      setNameError('')
    }
    if(e.target.name=='email'){
      setEmailError('')
    }
    if(e.target.name=='password'){
      setPasswordError('')
    }
  }


  // form submit
 const handleSubmit =(e)=>{
    if(!fullName){
      setNameError('please inter your name')
    }
    if(!email){
      setEmailError('please inter your email')
    }
    if(!password){
      setPasswordError('please inter your passwod')
    }
    if(fullName&& email&&password){
      setLodding(true)
      setInputValue({fullName:'',email:'',password:''})
      createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setLodding(false)
        updateProfile(auth.currentUser, {
          displayName: fullName, photoURL: "profile img"
        }).then(() => {
          sendEmailVerification(auth.currentUser)
          .then(() => {
            toast("chack your email");
            set(ref(db, 'users/'+user.user.uid),{
              userName: fullName,
              email: email,
              profile_picture : 'profile pic'
            });
          });
        }).catch((error) => {
          console.log(error);
        });
        navigate('/login')
      })
      .catch((error) => {
        setLodding(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorMessage.includes('auth/email-already-in-use')){
          toast.error('🦄 email-already-in-use !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
        if(errorMessage.includes('auth/weak-password')){
          toast.error('🦄 Password should be at least 6 characters !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
        console.log(errorMessage);
      });
    }
    e.preventDefault()
   } 


    
  return (
    <div className='grid justify-center items-center bg-gray-900 h-screen'>
        <div className='bg-white p-10 text-center'>
            <Heading text={`Get started with easily`} span=' register'/>
            <form onSubmit={handleSubmit} className='my-10' action="">
                <div className=''>
                <input  className='w-full py-3 px-5 ring ring-primary focus-visible:ring-0 my-5' onChange={handleChange} type="text" name='fullName' value={fullName} placeholder="full name"/>
                {nameError&& <Paragraph className='text-red-500' text={nameError}/>}
                </div>
                <div className=''>
                <input  className='w-full py-3 px-5 ring ring-primary focus-visible:ring-0 my-5' onChange={handleChange} type="email" name='email' value={email} placeholder='email'/>
                {emailError&& <Paragraph className='text-red-500' text={emailError}/>}
                </div>
                <div>
                <div className='relative'>
                <input  className='w-full py-3 px-5 ring ring-primary focus-visible:ring-0 my-5' onChange={handleChange} type={passworeShow ? 'text' : 'password'} name='password' value={password} placeholder='password'/>
                    {passworeShow 
                    ? <AiFillEye onClick={()=>setPasswordShow(false)} className='absolute top-1/2 right-5 translate-y-[-50%] cursor-pointer' /> 
                    :<AiFillEyeInvisible onClick={()=>setPasswordShow(true)} className='absolute top-1/2 right-5 translate-y-[-50%] cursor-pointer' />
                    }
                </div>
                {passwordError&& <Paragraph className='text-red-500 mb-3' text={passwordError}/>}
                
                </div>
                {lodding 
                ?<div className='px-14 py-3 bg-blue-800 text-white text-center inline-block'>
                    <RotatingLines
                    strokeColor="white"
                    strokeWidth="1"
                    animationDuration="0.75"
                    width="30"
                    visible={true}
                    />
                </div>
                :<button className='bg-blue-800 text-white py-3 px-7' type='submit'>SingUp</button>
                }
            </form>
            <Paragraph text='Already have an acount ? ' link='Login' path='/login'/>
        </div>
    </div>
  )
}

export default SingUp