import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import { API_OPTIONS } from '../utils/constants';
import { toast } from 'react-toastify';

const languageMap = {
  en: 'en-US',
  hindi: 'hi-IN',
  spanish: 'es-ES',
};

const GptSearchBar = ({ setTmdbResults }) => {
  const langkey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const tmdbLang = languageMap[langkey] || 'en-US';

  const detectLanguage = (text) => {
    const hindiRegex = /[\u0900-\u097F]/g;
    const englishRegex = /[a-zA-Z]/g;

    const hindiMatch = text.match(hindiRegex)?.length || 0;
    const englishMatch = text.match(englishRegex)?.length || 0;

    if (hindiMatch > englishMatch) return 'hindi';
    if (englishMatch > hindiMatch) return 'english';
    return 'unknown';
  };

  const handleTmdbSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query) return;

    const inputLang = detectLanguage(query);

    if (langkey === 'en' && inputLang === 'hindi') {
      toast.error("Please type your query in English.");
      return;
    }

    if (langkey === 'hindi' && inputLang === 'english') {
      toast.error("कृपया अपनी क्वेरी हिंदी में टाइप करें।");
      return;
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=${tmdbLang}&page=1`,
      API_OPTIONS
    );
    const json = await response.json();

    if (json.results && json.results.length > 0) {
      setTmdbResults(json.results);
    } else if (langkey === 'hindi') {
      const fallback = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_original_language=hi&language=hi-IN&page=1`,
        API_OPTIONS
      );
      const fallbackJson = await fallback.json();
      setTmdbResults(fallbackJson.results || []);
    } else {
      setTmdbResults([]);
    }
  };

  return (
    <div className='pt-[45%] md:pt-[10%] flex justify-center'>
      <form
        className='w-full md:w-1/2 bg-black grid grid-cols-12'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type='text'
          className='p-4 m-4 col-span-9'
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button
          className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
          onClick={handleTmdbSearchClick}
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
