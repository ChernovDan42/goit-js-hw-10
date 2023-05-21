import './css/styles.css';
import { CountryApi } from './js/fetchCountries'
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputRef=document.getElementById('search-box')
const ulRef = document.querySelector('.country-list')
const infoRef=document.querySelector('.country-info')

const countrysApiService= new CountryApi()

inputRef.addEventListener('input',debounce(onInput,DEBOUNCE_DELAY))

function onInput(e) {

    countrysApiService.query = e.target.value.trim();
    
    if (countrysApiService.query === '') {
        clearAllMarkup()
        return
    }

    countrysApiService.fetchCountries().then(renderUserList).catch(error => {
        if (error.message = '404') {
          error404()  
        }
        console.log(error);
    })
}


function renderUserList(countrys) {

    if (countrys.length > 10) {
        tooManyMatchesNotify()
    } else if (countrys.length === 1) {
        elementMarkup(countrys)
        clearListMarkup()
    } else {
        listMurkup(countrys)
        clearElementMarkup();
    }

}



function elementMarkup(countrys) {
    const markup = countrys
            .map((country) => {
                const { name: { official }, capital, population, flags: { svg }, languages } = country;

                const langs=Object.values(languages)

                return `<li><div class='flex'><img src='${svg}' class='flag' width='50' height='30'/>
      <p class='name'>${official}</p></div>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Languages</b>: ${langs}</p>
        </li>`;
            })
            .join("");
        infoRef.innerHTML = markup;
}

function listMurkup(countrys) {
    const markup = countrys
            .map((country) => {
                const { name: { official },flags: { svg }  } = country;
                return `<li class='country-item'>
      <img src='${svg}' class='flag' width='50' height='30'/>
          <p>${official}</p>
        </li>`;
            })
            .join("");
        ulRef.innerHTML = markup;
}

function clearListMarkup() {
    ulRef.innerHTML = ''
}

function clearElementMarkup() {
    infoRef.innerHTML = '';
}

function clearAllMarkup() {
    ulRef.innerHTML = '';
    infoRef.innerHTML = '';
}


function tooManyMatchesNotify() {
    clearAllMarkup()
    return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
}

function error404() {
    clearAllMarkup()
    return Notiflix.Notify.failure("Oops, there is no country with that name");
}