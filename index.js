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

const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    func.apply(null, args)},
    delay)  
  };
};

const onInput = event => {
  fetchData(event.target.value);
};

userInput.addEventListener('input', debounce(onInput));