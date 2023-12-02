const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, obtainInfo }) => {
  // expect the config object to have a root element
  root.innerHTML = ` 
  <label> <b>Search for a item</b></label>
  <input class = "input" />
  <div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results">
    </div>`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const array = await obtainInfo(event.target.value);
    if (!array.length) {
      dropdown.classList.remove('is-active');
      return;
    }
    resultsWrapper.innerHTML = "";
    dropdown.classList.add('is-active');

    for (let item of array) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);

      resultsWrapper.appendChild(option);
      
      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = inputValue(item)
        onOptionSelect(item);
      })
    }
  };

  const delayedInput = debounce(onInput);

  input.addEventListener('input', delayedInput);

  document.addEventListener('click', event => {
    if (!root.contains(event.target))
      dropdown.classList.remove('is-active');
  })

};