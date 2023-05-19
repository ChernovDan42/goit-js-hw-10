export default class CountryApi{
    constructor() {
        this.searchQuery = '';
     
    }

fetchCountries() {
    return fetch(`https://restcountries.com/v3.1/name/${this.searchQuery}`).then(response => {
        console.log(response);
        if (!response.ok) {
      throw new Error(response.statusText);
    }
       return response.json()
    })
    }

    get query() {
        return this.searchQuery
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
}
 
}
    
    
    