const fetchData = async searchTerm => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'f354532a',
      s: searchTerm
    }
  })
  console.log(response.data);
};

const userInput = document.querySelector("input");

const onInput = event => {
  fetchData(event.target.value);
};

userInput.addEventListener('input', debounce(onInput));