import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import contents from "../../data.json";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegions, setSelectedRegions] = useState("All");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleFetchApi = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(contents);
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };

  useEffect(() => {
    handleFetchApi();
  }, []);

  const regions = [
    "All",
    ...new Set(countries.map((country) => country.region)),
  ];

  useEffect(() => {
    let results = countries;

    if (selectedRegions !== "All") {
      results = results.filter((country) => country.region === selectedRegions);
    }

    if (searchQuery) {
      results = results.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCountries(results);
  }, [searchQuery, selectedRegions, countries]);

  const toggleRegion = () => {
    document.getElementById("region").classList.toggle("hidden");
  };

  return (
    <main className="py-10 w-full px-5 lg:px-10 mx-auto">
      <section className="flex flex-col md:flex-row md:items-center gap-5 md:justify-between mb-10">
        <div className="relative md:w-96 lg:w-1/2 2xl:w-1/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 absolute top-4 left-2 text-slate-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            name="search"
            value={searchQuery}
            id="search"
            placeholder="Search for a country..."
            className="w-full p-3 rounded-md dark:bg-slate-800 shadow-lg indent-6 outline-none"
          />
        </div>

        <div className="relative w-1/2 md:w-1/4 lg:w-56">
          <button
            onClick={toggleRegion}
            className="w-full flex items-center justify-between mb-2 dark:bg-slate-800 p-3 shadow-lg rounded-md"
          >
            <span className="text-sm sm:text-base">Filter by Region</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
          <select
            value={selectedRegions}
            onChange={(e) => setSelectedRegions(e.target.value)}
            className="dark:bg-slate-800 bg-white outline-none shadow-lg p-3 space-y-2 rounded-md absolute w-full hidden"
            id="region"
          >
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <div
              onClick={() => setSelectedCountry(country)}
              key={index}
              className="dark:bg-slate-800 bg-gray-50 shadow-xl rounded-md cursor-pointer"
            >
              <img
                src={country.flag}
                className="rounded-t-md object-cover w-full h-1/2 mb-5"
              />
              <div className="px-5">
                <h1 className="mb-3 font-semibold">{country.name}</h1>
                <div className="space-y-1">
                  <p>
                    Population:{" "}
                    <span className="dark:text-slate-400">
                      {country.population.toLocaleString()}
                    </span>
                  </p>
                  <p>
                    Region:{" "}
                    <span className="dark:text-slate-400">
                      {country.region}
                    </span>
                  </p>
                  <p>
                    Capital:{" "}
                    <span className="dark:text-slate-400">
                      {country.capital}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-2 flex flex-col justify-center items-center max-w-6xl mx-auto animate-pulse">
            <h1 className="text-2xl md:text-4xl font-bold">Ooops!</h1>
            <p className="text-xl md:text-2xl">No matches found</p>
          </div>
        )}
      </section>

      <section>
        {selectedCountry && (
          <div className="fixed z-20 top-10">
            <button
              onClick={() => setSelectedCountry("")}
              className="bg-white dark:bg-slate-700 rounded-md py-2 mb-5 lg:mb-24 px-5 shadow-lg"
            >
              <span>←</span> Back
            </button>
            <div className="flex items-center gap-24">
              <img
                src={selectedCountry.flag}
                className="lg:w-[520px] w-full h-80 object-cover border-[15px] border-slate-700 rounded-lg border-opacity-10"
              />
              <div>
                <h1 className="font-bold text-xl md:text-3xl mb-5">
                  {selectedCountry.name}
                </h1>
                <div className="flex items-start gap-12 mb-5">
                  <section className="space-y-2">
                    <p className="font-semibold">
                      Native Name:{" "}
                      <span className="font-normal text-sm">
                        {selectedCountry.nativeName}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Population:{" "}
                      <span className="font-normal text-sm">
                        {selectedCountry.population.toLocaleString()}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Region:{" "}
                      <span className="font-normal text-sm">
                        {selectedCountry.region}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Sub Region:{" "}
                      <span className="font-normal text-sm">
                        {selectedCountry.subregion}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Capital:{" "}
                      <span className="font-normal text-sm">
                        {selectedCountry.capital}
                      </span>
                    </p>
                  </section>
                  <section className="space-y-2">
                    <p className="font-semibold">
                      Top Level Domain:{" "}
                      <span className="font-normal text-sm">
                        {selectedCountry.topLevelDomain}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Currencies:{" "}
                      <span className="font-normal text-sm">
                        {selectedCountry.currencies ? (
                          selectedCountry.currencies.map(
                            (currency) => currency.name
                          )
                        ) : (
                          <p></p>
                        )}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Languages:{" "}
                      <span className="font-normal text-sm">
                        {selectedCountry.languages.map(
                          (language) => language.name + " "
                        )}
                      </span>
                    </p>
                  </section>
                </div>
                <p className="flex items-center gap-10">
                  <span className="font-semibold text-lg">
                    Border Countries:{" "}
                  </span>
                  <span className="flex items-center gap-5">
                    {selectedCountry.borders ? (
                      selectedCountry.borders.map((border, index) => (
                        <p
                          key={index}
                          className="dark:bg-slate-700 px-4 py-1 text-sm rounded-md bg-gray-100"
                        >
                          {border}
                        </p>
                      ))
                    ) : (
                      <p className="dark:bg-slate-700 px-4 py-1 text-sm rounded-md bg-gray-100">
                        No borders available
                      </p>
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <section>
        {selectedCountry && (
          <div className="fixed top-0 left-0 bottom-0 z-10 right-0 bg-white dark:bg-slate-800"></div>
        )}
      </section>
    </main>
  );
};

export default Home;
