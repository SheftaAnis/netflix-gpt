import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import lang from '../utils/languageConstants';
import client from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';

const GptSearchBar = () => {

  const langkey=useSelector(store=> store.config.lang);
  const searchText=useRef(null);

  const searchMovieTmdb= async(movie)=>{
     const data=await fetch('https://api.themoviedb.org/3/search/movie?query='+ movie +'&include_adult=false&language=en-US&page=1', API_OPTIONS);

     const json= await data.json();
     return json.results;
  }

  const handleGptSearchClick= async ()=>{
    console.log(searchText.current.value);

    const gptQuery="Act as a movie Recommendation system and suggest some movies for the query" + searchText.current.value + "only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults=await client.chat.completions.create({
      messages: [{ role: 'user', content:  gptQuery}],
      model: 'gpt-3.5-turbo',
    });

    if(!gptResults.choices){

    }

    console.log(gptResults.choices?.[0].message?.content);

    const gptMovies=gptResults.choices?.[0].message?.content.split(",")

    const promiseArray=gptMovies.map(movie=>searchMovieTmdb(movie));

    const tmdbResults= await Promise.all(promiseArray);
    console.log(tmdbResults);
  };


  return (
    <div className='pt-[45%] md:pt-[10%] flex justify-center'>
      <form className=' w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=> e.preventDefault()}>
        <input
        ref={searchText}
        type='text'
        className='p-4 m-4 col-span-9'
        placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg' onClick={handleGptSearchClick}>{lang[langkey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar