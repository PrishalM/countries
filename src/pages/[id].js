import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { Nunito_Sans } from "next/font/google";
const nunito_sans = Nunito_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import { getAllCountryIds, getCountryData } from "../lib/country";

export default function Country({ countryData }) {
  const country = JSON.parse(countryData);
  let currencies;
  if (country.currencies) {
    const currenciesObj = Object.values(country.currencies);
    currencies = currenciesObj[0].name;
    if (currenciesObj.length > 1) {
      for (let i = 1; i < currenciesObj.length; i++) {
        currencies = currencies + ", " + currenciesObj[i].name;
      }
    }
  }
  let languages;
  if (country.languages) {
    const languagesObj = Object.values(country.languages);
    languages = languagesObj[0];
    if (languagesObj.length > 1) {
      for (let i = 1; i < languagesObj.length; i++) {
        languages = languages + ", " + languagesObj[i];
      }
    }
  }

  return (
    <>
      <Head>
        <title>{JSON.stringify(country.name.common)} - Countries</title>
      </Head>
      {/* Main Body */}
      <div className="container py-10 mx-auto px-10">
        {/* Back Btn */}
        <div className="flex flex-start pb-5">
          <Link href="/">
            <button className="px-10 py-2.5 bg-lightElement dark:bg-darkElement drop-shadow-light dark:drop-shadow-dark rounded-md text-lightText dark:text-darkText hover:bg-darkElement dark:hover:bg-lightElement hover:text-darkText dark:hover:text-lightText">
              <FontAwesomeIcon icon={faArrowLeftLong} className="pr-2" />
              Back
            </button>
          </Link>
        </div>

        {/* Country data */}
        <div
          className={`${nunito_sans.className} text-lightText dark:text-darkText`}
        >
          <Image
            src={country.flags.png}
            alt={`${country.name.common}'s flag`}
            fill
            className="relative py-8"
          />

          <div className="">
            <h1 className="font-bold text-xl py-5">{country.name.official}</h1>
            <div className="[&>*]:py-2">
              {country.name.nativeName && (
                <p>
                  <span className="font-semibold">Native name:</span>{" "}
                  {Object.values(country.name.nativeName)[0].official}
                </p>
              )}

              <p>
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString("en-US")}
              </p>
              {country.subregion && (
                <p>
                  <span className="font-semibold">Sub Region: </span>
                  {country.subregion}
                </p>
              )}
              <p>
                <span className="font-semibold">Region: </span>

                {country.region}
              </p>

              {country.capital ? (
                <p>
                  <span className="font-semibold">Capital:</span>{" "}
                  {country.capital}
                </p>
              ) : null}
            </div>
            <div className="[&>*]:py-2 pt-10">
              <p>
                <span className="font-semibold">Top Level domain:</span>{" "}
                {country.tld}
              </p>
              {country.currencies ? (
                <p>
                  <span className="font-semibold">Currencies: </span>
                  {currencies}
                </p>
              ) : null}
              {country.languages ? (
                <p>
                  <span className="font-semibold">Languages:</span> {languages}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getAllCountryIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getCountryData(params.id);
  const countryData = JSON.stringify(data);
  return {
    props: {
      countryData,
    },
  };
}
