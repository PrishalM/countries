export async function getAllCountryIds() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countryData = await res.json();
  return countryData.map((country) => {
    let countryName = country.name.common;
    let id = countryName.toLowerCase().replace(/\s/g, "-");
    return {
      params: {
        id: id,
      },
    };
  });
}

export async function getCountryData(id) {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countryData = await res.json();
  return countryData.find((country) => {
    let idName = country.name.common.toLowerCase().replace(/\s/g, "-");
    if (idName === id) {
      return country;
    }
  });
}

export async function getBorderCountriesData(id) {
  const countryData = await getCountryData(id);
  const res = await fetch("https://restcountries.com/v3.1/all");
  const allCountriesData = await res.json();

  let borderCountryData = [];

  if (countryData.borders) {
    let bordersCode = Object.values(countryData.borders);
    for (let i = 0; i < bordersCode.length; i++) {
      for (let j = 0; j < allCountriesData.length; j++) {
        if (bordersCode[i] == allCountriesData[j].cca3) {
          borderCountryData.push({
            name: allCountriesData[j].name.common,
            id: allCountriesData[j].name.common
              .toLowerCase()
              .replace(/\s/g, "-"),
          });
        }
      }
    }
    return borderCountryData;
  } else {
    return null;
  }
}
