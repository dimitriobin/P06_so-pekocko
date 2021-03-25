import { useState, useEffect } from "react";
import SaucesDataService from "../services/SaucesServices";

import SauceCard from "./SauceCard";
import AddSauce from "./AddSauce";

function SaucesList() {
  const [sauceFormActive, setsauceFormActive] = useState(false);
  const [sauces, setSauces] = useState([]);

  useEffect(() => {
    retrieveSauces();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    setsauceFormActive(true);
  };

  const retrieveSauces = () => {
    SaucesDataService.getAll()
      .then((response) => {
        setSauces(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayNewSauce = (data) => {
    console.log(data);
    setSauces([data, ...sauces]);
    console.log(sauces);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="underline mb-8 mx-auto block text-xl"
      >
        Add a new sauce
      </button>
      {sauceFormActive && (
        <AddSauce
          showSauceForm={setsauceFormActive}
          onDataSubmit={displayNewSauce}
        />
      )}
      <div className="grid grid-cols-auto-fill xl:grid-cols-4 gap-10 content-center justify-center">
        {sauces &&
          sauces.map((sauce, index) => <SauceCard sauce={sauce} key={index} />)}
      </div>
    </>
  );
}

export default SaucesList;
