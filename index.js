createAutoComplete({
  root: document.querySelector(".autocomplete"),
  renderOption(movie) {
    // const imgSrc = movie.Poster === "N/A" ? '' : movie.Poster;
    // return `
    // <img src="${imgSrc}"> ${movie.Title} (${movie.Year})`
    return `
    <img src="${movie.thumbnailUrl}"> ${movie.title}`
  },
  onOptionSelect(movie) {
    onMovieSelect(movie);
  },
  inputValue(movie) {
    return movie.Title;
  },
  obtainInfo(searchTerm) {
    return fetchData(searchTerm);
    // The tutorial sticks the whole function here; I do it slightly differly by referencing it.  The tutorial adds the async here, where I leave it down below (could cause bugs later).
  }
});

const fetchData = async searchTerm => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/photos?albumId=1', {
    // params: {
    //   apikey: 'f354532a',
    //   s: searchTerm
    // }
  })
    .catch(() => {
    })
  if (response.data.Error) {
    return [];
  }
  // return response.data.Search;
  return response.data;
};

const onMovieSelect = async movie => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'f354532a',
      i: movie.imdbID
    }
  })
  // console.log(response.data);

  document.querySelector('#summary').innerHTML = movieTemplate(response.data);
}

const movieTemplate = (movieDetail) => {
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
