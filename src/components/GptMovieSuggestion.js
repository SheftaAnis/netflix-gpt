import React from 'react';

const GptMovieSuggestion = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  const filteredMovies = movies.filter((movie) => movie.poster_path);

  return (
    <div className='p-6 md:p-10 bg-black bg-opacity-80'>
      <h2 className='text-white text-2xl font-semibold mb-6 text-center'>Search Results</h2>
      <div className='flex flex-wrap justify-center gap-8'>
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className='w-[140px] md:w-[180px] rounded-xl overflow-hidden shadow-md bg-gray-900 text-white transition transform hover:scale-105'
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className='w-full h-[220px] object-cover'
            />
            <div className='p-2'>
              <h3 className='text-sm font-semibold truncate'>{movie.title}</h3>
              <p className='text-xs text-gray-400'>
                {movie.release_date || 'Unknown'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
