import React from 'react';

const MovieCard = ({ posterPath, title }) => {
  const imageURL = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : '/no-image.jpg'; // fallback

  return (
    <div className='w-[150px] m-2 text-center'>
      <img
        className='w-full h-[225px] object-cover rounded-md shadow-md'
        src={imageURL}
        alt={title}
      />
      <p className='text-sm mt-2'>{title}</p>
    </div>
  );
};

export default MovieCard;
