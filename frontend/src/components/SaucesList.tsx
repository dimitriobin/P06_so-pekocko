import { useState, useEffect } from "react";
import SaucesDataService from "../services/SaucesServices";

import SauceCard from "./SauceCard";
// import AddSauce from "./AddSauce";
import { Sauce } from "../types/Sauce";

function SaucesList() {
  //   const [sauceFormActive, setsauceFormActive] = useState(false);
  const [sauces, setSauces] = useState<Sauce[]>([]);

  useEffect(() => {
    retrieveSauces();
  }, []);

  const handleClick = () => {
    console.log("set sauce form to active");
    // setsauceFormActive(true);
  };

  const retrieveSauces = async () => {
    try {
      const response = await SaucesDataService.getAll();
      const data = await response?.data;
      setSauces(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleSubmit = async (
  //     newSauceData: React.FormEvent<HTMLFormElement>
  //   ) => {
  //     try {
  //       const response = await SaucesDataService.createOne(newSauceData);
  //       const data = await response.data;
  //       setSauces([data, ...sauces]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <>
      <button
        onClick={handleClick}
        className="underline mb-8 mx-auto block text-xl"
      >
        Add a new sauce
      </button>
      {/* {sauceFormActive && (
        <AddSauce
          showSauceForm={setsauceFormActive}
          onDataSubmit={handleSubmit}
        />
      )} */}
      <div className="grid grid-cols-auto-fill xl:grid-cols-4 gap-10 content-center justify-center">
        {sauces &&
          sauces.map((sauce, index) => <SauceCard sauce={sauce} key={index} />)}
      </div>
    </>
  );
}

export default SaucesList;
