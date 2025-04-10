import React from 'react'
import { onAuthStateChanged,signOut } from "firebase/auth";
import {auth } from '../utils/Firebase'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addUser,removeUser} from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changelanguage } from '../utils/configSlice';

const Header = () => {
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const user =useSelector((store)=>store.user);
   const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      
    }).catch((error) => {
      navigate("/error");
    });
    
  };

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName} = user;
        dispatch(addUser({
          uid:uid,
          email:email,
          displayName:displayName,
          
        }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return ()=> unsubscribe();
  },[])

  const handleGptSearchClick=()=>{
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange=(e)=>{
    dispatch(changelanguage(e.target.value));
  }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
     <img
     className='w-44 mx-auto md:mx-0'
      src={LOGO} alt="logo"/>
      <div className='flex p-4 justify-between'>
        { showGptSearch && (<select className='p-2 bg-gray-900 text-white m-3 rounded-lg' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang=> <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          
        </select>)}
        <button className=' px-4 mx-4 py-0.5  bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}> { showGptSearch ? "Home" : "Search"}</button>
        <img className='hidden md:block w-10 h-10 mr-3' src="/usericon.jpg" alt="user icon"/>
        <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
      </div>
    </div>
  )
}

export default Header;
