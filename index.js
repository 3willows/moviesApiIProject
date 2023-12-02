const root = document.querySelector(".autocomplete");
root.innerHTML = ` 
<label> <b>Search for a Movie</b></label>
<input class = "input" />
<div class="dropdown">
<div class="dropdown-menu">
  <div class="dropdown-content results">
  </div>`;

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

const userInput = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async () => {
  // makes more sense to do this before calling wait;
  const movies = await fetchData(userInput.value);
  if (!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }

  resultsWrapper.innerHTML = "";

  // same as event.target.value;
  console.log(movies);
  dropdown.classList.add('is-active');
  for (let movie of movies) {
    const optionAnchor = document.createElement('a');
    const imgSrc = movie.Poster === "N/A" ? '' : movie.Poster;

    optionAnchor.classList.add('dropdown-item')
    optionAnchor.innerHTML = `<img src="${imgSrc}" />${movie.Title}`

    optionAnchor.addEventListener('click', () => {
      dropdown.classList.remove('is-active');
      userInput.value = `${movie.Title}`;
    })

    resultsWrapper.appendChild(optionAnchor);
  }
};

const delayedInput = debounce(onInput);

userInput.addEventListener('input', delayedInput);
document.addEventListener('click', event => {
  if (!root.contains(event.target))
    dropdown.classList.remove('is-active');
})