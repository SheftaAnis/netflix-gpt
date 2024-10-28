import React from 'react'
import { onAuthStateChanged,signOut } from "firebase/auth";
import {auth } from '../utils/Firebase'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addUser,removeUser} from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const user =useSelector((store)=>store.user);
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

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
     <img
     className='w-44'
      src={LOGO} alt="logo"/>
      <div className='flex p-2'>
        <img className='w-12 h-12 ' src="https://occ-0-2164-3467.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABcLtVOXjghzlDrVwmPHGQtkXjoJPmpISBttze62ZpxaaFWq-LZVH5yZxMD15UVLU6nd4GIUtTSHOMsbUOdPCIYRL2-2bGNU.png?r=b38" alt="user icon"/>
        <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
      </div>
    </div>
  )
}

export default Header;
