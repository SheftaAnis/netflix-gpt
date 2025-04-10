import React, { useState } from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import { BG_URL } from '../utils/constants';

const GPTSearch = () => {
  const [tmdbResults, setTmdbResults] = useState([]);

  return (
    <>
      <div className='fixed -z-10'>
        <img className='h-screen md:h-full object-cover' src={BG_URL} alt="body"  loading="eager" />
      </div>
      <div>
        <GptSearchBar setTmdbResults={setTmdbResults} />
        <GptMovieSuggestion movies={tmdbResults} />
      </div>
    </>
  );
};

export default GPTSearch;
