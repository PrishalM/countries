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
