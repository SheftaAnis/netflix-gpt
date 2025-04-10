import React, { useRef, useState } from 'react'
import Header from './Header';
import {checkValidateData} from "../utils/Validate";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {auth} from "../utils/Firebase";
import { BG_URL } from '../utils/constants';


const Login = () => {
     const[isSignInForm,setIsSignForm]=useState(true);
     const[errorMessage,setErrorMessage]=useState(null);
     
     const name=useState('');
     const email =useRef(null);
     const password =useRef(null);

    
     const handleButtonClick=()=>{
    
      const message= checkValidateData(email.current.value,password.current.value);
      setErrorMessage(message);

      if(message){
          return;
      }

      if(!isSignInForm){
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name,
            photoURL:"https://avatars.githubusercontent.com/u/12824231?v=4"
          }).then(() => {
            // Profile updated!
          
          }).catch((error) => {
            // An error occurred
            // ...
          });
          
        
         
         
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
          // ..
        });
      }
      else{
        signInWithEmailAndPassword(auth,email.current.value,password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
         
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });
      
      }
      
     };
    const toggleSignInForm=()=>{
       setIsSignForm(!isSignInForm);
    }
  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img className='h-screen md:h-full object-cover' src={BG_URL} alt="body"  loading="eager"/>
      </div>
      <form onSubmit={(e)=> e.preventDefault()} className= 'absolute p-12 bg-black w-full md:w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
      <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign in" : "Sign up"}</h1>
      {!isSignInForm &&(
         <input 
         type='text' 
         placeholder='Full Name' 
         className='p-2 my-2 w-full bg-gray-700'
         />
      )
      }
        <input 
        ref={email}
        type='text' 
        placeholder='Email Address' 
        className='p-2 my-2 w-full bg-gray-700'
        />
        <input 
        ref={password}
        type='password' 
        placeholder='Password' 
        className='p-2 my-2 w-full  bg-gray-700'
        />
        <p className='text-red-600 font-bold text-lg py-2'>{errorMessage}</p>
        <button 
        onClick={handleButtonClick} 
        className='p-4 my-6 w-full bg-red-800 rounded-lg'
        >
          {isSignInForm ? "Sign in" : "Sign up"}  
        </button>
        <p 
        className='py-4 cursor-pointer' 
        onClick={toggleSignInForm}
        >
          {isSignInForm ? "New to Netflix? Sign Up Now":"Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  )
}

export default Login
