const fetchData = async searchTerm => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'f354532a',
      s: searchTerm
    }
  })
  .catch(() =>{
  })
  if (response.data.Error){
    return [];
  }
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
    <p>${movie.Title}</p>
    <img src="${movie.Poster}" alt="image of one movie poster">
    `
    document.querySelector("#target").append(div);
  }
};

const delayedInput = debounce(onInput);

userInput.addEventListener('input', delayedInput);