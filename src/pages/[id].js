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

import {
  getAllCountryIds,
  getCountryData,
  getBorderCountriesData,
} from "../lib/country";

export default function Country({ countryData, borderCountriesData }) {
  const country = JSON.parse(countryData);
  const borders = JSON.parse(borderCountriesData);

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
        <title>{`${country.name.common} - Countries`}</title>
        <link rel="icon" type="image/x-icon" href="/countries.png"></link>
      </Head>
      {/* Main Body */}
      <div className="container py-10 mx-auto px-10">
        {/* Back Btn */}
        <div className="flex flex-start pb-5">
          <Link href="/">
            <button className="px-10 py-2.5 bg-lightElement dark:bg-darkElement drop-shadow-light dark:drop-shadow-dark rounded-md flex items-center text-lightText dark:text-darkText hover:bg-darkElement dark:hover:bg-lightElement hover:text-darkText dark:hover:text-lightText">
              <FontAwesomeIcon icon={faArrowLeftLong} className="pr-2 icon" />
              Back
            </button>
          </Link>
        </div>

        {/* Country data */}
        <div
          className={`${nunito_sans.className} text-lightText dark:text-darkText flex flex-col lg:flex-row lg:pt-10 lg:justify-between`}
        >
          <div className="w-full lg:w-5/12">
            <Image
              src={country.flags.png}
              alt={`${country.name.common}'s flag`}
              fill
              className="relative py-8 lg:py-0 h-auto"
            />
          </div>

          <div className="lg:w-6/12 lg:flex lg:flex-col lg:justify-center">
            <h1 className="font-bold  text-3xl lg:text-4xl py-5 lg:pt-0">
              {country.name.official}
            </h1>
            <div className="flex flex-col lg:flex-row ">
              <div className="[&>*]:py-2 lg:pr-5">
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
              <div className="[&>*]:py-2 pt-10 lg:pt-0">
                {country.tdl ? (
                  <p>
                    <span className="font-semibold">Top Level domain:</span>{" "}
                    {country.tld}
                  </p>
                ) : null}

                {country.currencies ? (
                  <p>
                    <span className="font-semibold">Currencies: </span>
                    {currencies}
                  </p>
                ) : null}
                {country.languages ? (
                  <p>
                    <span className="font-semibold">Languages:</span>{" "}
                    {languages}
                  </p>
                ) : null}
              </div>
            </div>
            {/* Borders */}
            {country.borders ? (
              <div className="pt-10">
                <p className="font-semibold text-xl">Border Countries: </p>
                <div className="flex pt-5 flex-wrap justify-start gap-4">
                  {borders.map((border, i) => (
                    <Link key={i} href={`/${border.id}`}>
                      <p className="px-6 py-1.5 bg-lightElement dark:bg-darkElement drop-shadow-light dark:drop-shadow-dark rounded-sm text-lightText dark:text-darkText hover:bg-darkElement dark:hover:bg-lightElement hover:text-darkText dark:hover:text-lightText">
                        {border.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Spacing */}
        <div className="lg:h-96"></div>
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
  const countryRawData = await getCountryData(params.id);
  const countryData = JSON.stringify(countryRawData);

  const borderCountriesRawData = await getBorderCountriesData(params.id);
  const borderCountriesData = JSON.stringify(borderCountriesRawData);

  return {
    props: {
      countryData: countryData,
      borderCountriesData: borderCountriesData,
    },
  };
}
