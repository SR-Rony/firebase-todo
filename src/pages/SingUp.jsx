import React, { useState } from 'react'
import { Button } from 'keep-react'
import Hedding from '../components/Hedding'
import { Label,TextInput } from "keep-react";

const SingUp = () => {
    const [inputValue,setInputValue]=useState()



    // input change
    const handleChange =(e)=>{
        console.log(e.target.value);
    }
  return (
    <div className="flex w-full h-screen items-center justify-center bg-blue-900">
        <div className="bg-white p-5 w-1/4">
            <Hedding text='Todo SingUp pages'/>
            <form action="" className='my-5'>
                <Label value="name" />
                <TextInput
                    id="#id-8"
                    placeholder="inter your name"
                    color="gray"
                    name='name'
                    onChange={handleChange}
                />
            </form>
        </div>
    </div>
  )
}

export default SingUp