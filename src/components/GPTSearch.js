import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG_URL } from '../utils/constants'

const GPTSearch = () => {
  return (
    <>
      <div className='fixed -z-10'>
        <img className='h-screen md:h-full object-cover' src={BG_URL} alt="body"/>
      </div>
    <div className=''>
      <GptSearchBar/>
      <GptMovieSuggestion/>
    
    </div>
    </>
  )
}

export default GPTSearch