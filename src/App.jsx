import React from 'react'
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import SingUp from './pages/SingUp';
import Login from './pages/Login';
import Home from './pages/Home';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<SingUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Route>
    )
  );

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
