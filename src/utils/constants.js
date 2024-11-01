export const LOGO="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"

export const API_OPTIONS= {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
      'Bearer ' + process.env.REACT_APP_TMDB_KEY,

    },
  };

  export const IMG_CDN_URL="https://image.tmdb.org/t/p/w500";

  export const BG_URL="https://assets.nflxext.com/ffe/siteui/vlv3/0e916f82-036f-468a-a098-52592391d3a8/null/IN-en-20240902-POP_SIGNUP_TWO_WEEKS-perspective_a8d5d4ae-15d5-4414-b272-b12d2fce75cd_small.jpg";

  export const SUPPORTED_LANGUAGES=[
    {identifier:"en",name:"English"},
    {identifier:"hindi",name:"Hindi"},
    {identifier:"spanish",name:"Spanish"}
  ]

  export const OPENAI_KEY=process.env.REACT_APP_OPENAI_KEY;