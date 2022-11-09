import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    searchQuery: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}
const DEBOUNCE_DELAY = 300;

refs.searchQuery.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) { 
    e.preventDefault();

    const queryValue = e.target.value.trim();

    if (queryValue === '') {
        clearCountryListInfo();
        return;
    };
    
    fetchCountries(queryValue)
        .then(countres => {
            const countriesNumber = countres.length;

            if (countriesNumber === 1) {
                refs.countryList.innerHTML = makeCountryInfo(countres[0]);
            } else if (countriesNumber > 1 && countriesNumber <= 10) {
                clearCountryListInfo();
                refs.countryList.insertAdjacentHTML('beforeend', countres.map(makeCountryList).join(''));
            } else if (countriesNumber > 10) { 
                clearCountryListInfo();
                Notify.info('Too many matches found. Please enter a more specific name.');
            }   
        })
        .catch(error => { 
            clearCountryListInfo();
            Notify.failure(error);
        });
}

function makeCountryList ({ name, flags }) {
  const itemsEl = `<li class = "country-info-item"> 
                        <img
                            src=${flags.svg} 
                            alt= "${name.common} flag"> 
                        <p>${name.common}</p>
                     </li>`;
  
  return itemsEl;
};

function makeCountryInfo({ flags, name, capital, population, languages }) {
    const itemsEl = `<div class = "country-info-item">
                        <img src=${flags.svg} alt="${name.common} flag">
                        <h1>${name.common}</h1>
                    </div>
                    <div class="country-info-item">
                        <h2 class="country-info-name">Capital:</h2>
                        <p>${capital}</p>
                    </div>
                    <div class="country-info-item">
                        <h2 class="country-info-name">Population:</h2>
                        <p>${population}</p>
                    </div>
                    <div class="country-info-item">
                        <h2 class="country-info-name">Languages:</h2>
                        <p>${Object.values(languages).join(', ')}</p>
                    </div>
                    </div>`;
    return itemsEl;
}

function clearCountryListInfo () {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}