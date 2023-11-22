import { useState, useEffect } from 'react';
import SaucesDataService from '../utils/SaucesServices';
import { Sauce } from '../types/Sauce';

import SauceCard from '../components/SauceCard';
import { AddSauceSection } from '../components/AddSauceSection';

function SaucesList() {
  const [sauces, setSauces] = useState<Sauce[]>([]);

  useEffect(() => {
    retrieveSauces();
  }, []);

  const retrieveSauces = async () => {
    try {
      const response = await SaucesDataService.getAll();
      setSauces(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AddSauceSection handleNewSauce={(newSauce) => setSauces([newSauce, ...sauces])} />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {sauces && sauces.map((sauce, index) => <SauceCard sauce={sauce} key={index} />)}
      </div>
    </>
  );
}

export default SaucesList;
