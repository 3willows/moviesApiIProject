const autCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? '' : movie.Poster;
    return `
    <img src="${imgSrc}"> ${movie.Title} (${movie.Year})`
  },
  inputValue(movie) {
    return movie.Title;
  },
  obtainInfo(searchTerm) {
    return fetchData(searchTerm);
    // my approach here differs from the tutorial.  
    // The tutorial sticks the whole function here; I do it slightly differly by referencing it.  The tutorial adds the async here, where I leave it down below (could cause bugs later).
  }
};

createAutoComplete({
  ...autCompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector("#left-summary"), 'left');
  }
});

createAutoComplete({
  ...autCompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector("#right-summary"), 'right');
  }
});

const fetchData = async searchTerm => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'f354532a',
      s: searchTerm
    }
  })
    .catch(() => {
    })
  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'f354532a',
      i: movie.imdbID
    }
  })
  // console.log(response.data);

  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === 'left'){
    leftMovie = response.data;
  }
  if (side === 'right'){
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie){
    runComparison();
  }
}

const runComparison = () => {
  // console.log ("time for comparison")
  console.log (leftMovie)
  console.log (rightMovie)
}

const movieTemplate = (movieDetail) => {

  const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));

  // console.log(dollars);

  const metaScore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));

  const awards = movieDetail.Awards.split(' ')
  .reduce((prev, word) => {
    const value = parseInt(word);
    if (isNaN(value))
    {
      return prev;
    } else{
      return prev + value;
    }
  }, 0);

    console.log(awards);

    // console.log(metaScore, imdbRating, imdbVotes);

  return `
  <article class="'media">
    <figure class="media-left">
      <p class="image">
        <img src="${movieDetail.Poster}" alt="" />
      </p>
    </figure>
    <div class="media-content">
    <div class="content">
      <h1>${movieDetail.Title}</h1>
      <h4>${movieDetail.Genre}</h4>
      <p>${movieDetail.Plot}</p>
    </div>
    </div>
    </article>
    <article class="notification is-primary">
  <p class="title">${movieDetail.Awards}</p>
  <p class="subtitle">Awards</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
  </article>
    `;
}
