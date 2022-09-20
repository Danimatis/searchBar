class CountryManager {
  currentId = 0;
  countries = [];
  addCountry(name, id) {
    let country = new Country();
    country.createCountry(name, id);
    if (country.name.length > 2) {
      this.countries.push(country);
    } else {
      throw new Error("You need to add a Country");
    }
  }
  saveCountries() {
    localStorage.setItem("countries", JSON.stringify(this.countries));
  }
  getCountries() {
    return this.countries;
  }
  loadCountries() {
    if (localStorage.getItem("countries"))
      this.countries = JSON.parse(localStorage.getItem("countries"));
  }
  clearCountries() {
    localStorage.clear("countries");
  }
}
class Country {
  name;
  id;
  createCountry(name, id) {
    this.name = name;
    this.id = id;
  }
}
