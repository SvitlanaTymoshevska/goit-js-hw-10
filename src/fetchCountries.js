export default function fetchCountries(name) {
    
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            console.log(response.status);
            if (response.status !== 200) {
                throw new Error(response.status)
            };
            response.json();
        })
}
