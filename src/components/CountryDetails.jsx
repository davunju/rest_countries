import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CountryDetails = ({ countries }) => {
  const { countryName } = useParams();
  const country = countries.find((c) => c.name === countryName);

  return (
    <section>
      <img src={country.flag} />
    </section>
  );
};

export default CountryDetails;
