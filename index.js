const fetchData = async searchTerm => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'f354532a',
      s: searchTerm
    }
  })
  return response.data.Search;
};

const userInput = document.querySelector("input");

const onInput = async () => {
  const movies = await fetchData(userInput.value);
  // same as event.target.value;
  console.log(movies);
  for (let movie of movies){
    const div = document.createElement('div');
    div.innerHTML = `
    <li>
    <p>${movie.Title}</p>
    <img src="${movie.Poster}" alt="image of one movie poster">
    </li>
    `
    document.body.append(div);
  }
};

const delayedInput = debounce(onInput);

userInput.addEventListener('input', delayedInput);