const countryManager = new CountryManager();
const submitBtn = document.getElementById("submit");
const countryInput = document.getElementById("input");
const countryList = document.getElementById("country-list-dropdown");
const showAllBtn = document.getElementById("show-all");
const htmlList = document.getElementById("list");
const clearBtn = document.getElementById("clear-all");
const alertUser = document.getElementById("alert");
const countryPicked = document.getElementById("country-picked");
const dropDownList = document.getElementById("drop-down-list");
// countryManager.loadCountries();

function addCountry(name, id) {
  try {
    clearAlert();
    countryManager.addCountry(name, id);
    countryManager.saveCountries();
    renderList();
    clearInput();
    console.log(countryManager.getCountries());
  } catch (err) {
    showAlert(err.message);
    countryManager.currentId--;
  }
}

function saveCountries() {
  countryManager.saveCountries();
}

function renderList() {
  let html = "";
  let countries = countryManager.getCountries();

  for (const country of countries) {
    html += `<li><a class="dropdown-item" onclick= "showCountry (${country.id})" href="#">${country.name}</a></li>`;
  }
  dropDownList.innerHTML = html;
}

function clearInput() {
  countryInput.value = "";
}

function showList() {
  let countries = countryManager.getCountries();
  let listOfCountries = countries
    .sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .map((country) => `<li> ${country.name}</li>`)
    .join("");
  htmlList.innerHTML = listOfCountries;
}
function showCountry(id) {
  let countries = countryManager.getCountries();
  let country = countries[id];
  countryPicked.innerHTML = country.name;
}
function autoFill(value) {
  let countries = countryManager.getCountries();

  countries = countries
    .filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    )
    .map(
      (country) =>
        `<li><a class="dropdown-item" data-country-id= "${country.id}" href="#">${country.name}</a></li>`
    )
    .join("");
  dropDownList.innerHTML = countries;
}

function showAlert(error) {
  alertUser.innerHTML = error;
}
function clearAlert() {
  alertUser.innerHTML = "";
}
function clearEverything() {
  alert;
  countryManager.clearCountries();
  dropDownList.innerHTML = "";
  htmlList.innerHTML = "";
  countryManager.countries = [];
  countryManager.currentId = 0;
  countryPicked.innerHTML = "";
}
submitBtn.addEventListener("click", () => {
  addCountry(countryInput.value, countryManager.currentId++);
});
showAllBtn.addEventListener("click", showList);
countryInput.addEventListener("input", () => {
  autoFill(countryInput.value);
});
clearBtn.addEventListener("click", clearEverything);
// countryInput.addEventListener("click", function (e) {
//   const countryId = e.target;
//   console.log(countryId);
// });
dropDownList.addEventListener("click", function (e) {
  countryPicked.innerHTML = e.target.innerHTML;
});
