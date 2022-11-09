function fetchCountries(name) {  
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => { 
            if (response.status === 404) {
                throw 'Oops, there is no country with that name';
            }
            return response.json();
        });
}

export { fetchCountries };