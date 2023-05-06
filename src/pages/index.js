import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { Nunito_Sans } from "next/font/google";
const nunito_sans = Nunito_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState, useRef } from "react";

export default function Home() {
  const [countryData, setCountryData] = useState([]);
  const [allCountryData, setAllCountryData] = useState([]);
  const [filterOption, setFilterOption] = useState();
  const [countrySearch, setCountrySearch] = useState();

  const filterSelect = useRef();
  let filteredData = [];

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        data.sort(function (a, b) {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        });
        setAllCountryData(data);
        setCountryData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function filterByContinent(e) {
    setFilterOption(e.target.value);
    if (e.target.value == "All") {
      setCountryData(allCountryData);
    } else {
      filteredData = allCountryData.filter(
        (country) => country.continents == e.target.value
      );
      setCountryData(filteredData);
    }
  }

  function searchByCountry(e) {
    setFilterOption("all");
    setCountrySearch(e.target.value);
    let input = e.target.value.toLowerCase();
    filteredData = allCountryData.filter((country) =>
      country.name.official.toLowerCase().includes(input)
    );
    setCountryData(filteredData);
  }

  return (
    <>
      <Head>
        <title>Countries</title>
      </Head>

      {/* Main Body */}
      <div className="container py-10 mx-auto px-10">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row sm:justify-between pb-5">
          {/* Search */}
          <div className="md:w-96 mb-5 md:mb-0">
            <label
              htmlFor="searchField"
              className="text-sm text-lightText dark:text-darkText"
            >
              Search Country
            </label>
            <div className="relative mt-2">
              <input
                id="searchField"
                className="bg-lightElement dark:bg-darkElement placeholder:text-lightInputText text-lightText dark:text-darkText h-10 px-5 rounded-lg text-sm drop-shadow-light dark:drop-shadow-dark w-full"
                name="search"
                placeholder="e.g. Iran"
                onChange={searchByCountry}
                value={countrySearch}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mr-2 px-3 flex h-full items-center"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="[&>*]:text-lightInputText dark:text-darkInputText"
                />
              </button>
            </div>
          </div>
          {/* Filter */}
          <div className="md:w-44">
            <label
              htmlFor="filterContinent"
              className="text-sm text-lightText dark:text-darkText"
            >
              Filter by Continent
            </label>
            <div className="relative mt-2">
              <select
                id="filterContinent"
                className="bg-lightElement dark:bg-darkElement text-lightInputText dark:darkInputText  h-10 px-5 rounded-lg text-sm drop-shadow-light dark:drop-shadow-dark w-full"
                onChange={filterByContinent}
                value={filterOption}
                defaultValue={"default"}
                ref={filterSelect}
              >
                <option value="default" disabled>
                  e.g. Africa
                </option>
                <option value="All">All</option>
                <option value="Africa">Africa</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
              <div className="absolute right-0 top-0 mr-5 flex h-full items-center">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="[&>*]:text-lightInputText dark:text-darkInputText"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Results */}
        <div className="flex flex-wrap px-5 gap-16 justify-between">
          {countryData.map((country, i) => (
            <Link
              key={i}
              href={`/${country.name.common.toLowerCase().replace(/\s/g, "-")}`}
              className="bg-lightElement dark:bg-darkElement drop-shadow-light dark:drop-shadow-dark hover:drop-shadow-lightCountryCard dark:hover:drop-shadow-darkCountryCard rounded-lg w-full h-auto sm:w-5/12 lg:w-1/4 xl:w-1/5"
            >
              <div className="relative">
                <Image
                  src={country.flags.png}
                  alt={`${country.name.common}'s flag`}
                  className="homeFlag drop-shadow-light dark:drop-shadow-dark"
                  fill
                />
              </div>
              <div
                className={`${nunito_sans.className} p-5 text-lightText dark:text-darkText`}
              >
                <h2 className="font-bold pt-2 pb-4 text-lg">
                  {country.name.official}
                </h2>
                <p className="pb-1">
                  <span className="font-semibold">Population:</span>{" "}
                  {country.population.toLocaleString("en-US")}
                </p>
                <p className="pb-1">
                  <span className="font-semibold">Region: </span>
                  {country.subregion ? country.subregion + ", " : null}
                  {country.region}
                </p>

                {country.capital ? (
                  <p className="pb-1">
                    <span className="font-semibold">Capital:</span>{" "}
                    {country.capital}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
