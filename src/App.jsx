import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import data from "../data.json";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [countries, setCountries] = useState(data);

  return (
    <>
      <Navbar />
      <Home />
      <BrowserRouter>
        <Routes>
          <Route
            path="country/:countryName"
            element={<CountryDetails countries={countries} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
