const userInput = document.querySelector("#movieName");

let timeoutId;

userInput.addEventListener("keypress", () => {

  const searchTerm = userInput.value;
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => { console.log(`${searchTerm}`)
  axios.get(`https://www.omdbapi.com/?t=${searchTerm}&apikey=f354532a`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    }); 
}, 2000)
});

