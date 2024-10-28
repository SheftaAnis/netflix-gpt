import React, { useRef, useState } from 'react'
import Header from './Header';
import {checkValidateData} from "../utils/Validate";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {auth} from "../utils/Firebase";


const Login = () => {
     const[isSignInForm,setIsSignForm]=useState(true);
     const[errorMessage,setErrorMessage]=useState(null);
     
     const name=useState('');
     const email =useRef(null);
     const password =useRef(null);

    
     const handleButtonClick=()=>{
     // console.log(email);
      //console.log(password);
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
            console.log(user.name);
          }).catch((error) => {
            // An error occurred
            // ...
          });
          
          //console.log(name.current.value);
          console.log(user);
         
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
          console.log(user);
          
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
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/0e916f82-036f-468a-a098-52592391d3a8/null/IN-en-20240902-POP_SIGNUP_TWO_WEEKS-perspective_a8d5d4ae-15d5-4414-b272-b12d2fce75cd_small.jpg" alt="body"/>
      </div>
      <form onSubmit={(e)=> e.preventDefault()} className= 'absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
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
