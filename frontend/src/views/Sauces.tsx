import { useState, useEffect } from 'react';
import SaucesDataService from '../utils/SaucesServices';

import SauceCard from '../components/SauceCard';
import { CreateSaucePayload, Sauce } from '../types/Sauce';
import SauceForm from '../components/SauceForm';
import { Modal } from '../components/Modal';

function SaucesList() {
  const [sauceFormActive, setsauceFormActive] = useState(false);
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

  const handleSubmit = async (newSauceData: CreateSaucePayload) => {
    try {
      const newSauce = await SaucesDataService.createOne(newSauceData);
      console.log(newSauce);
      setSauces([newSauce, ...sauces]);
      setsauceFormActive(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="flex mb-14">
        <button onClick={() => setsauceFormActive(true)} className="btn btn-secondary mx-auto">
          Add a new sauce
        </button>
      </section>
      <Modal open={sauceFormActive} closeModal={() => setsauceFormActive(false)}>
        <SauceForm onDataSubmit={handleSubmit} />
      </Modal>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {sauces && sauces.map((sauce, index) => <SauceCard sauce={sauce} key={index} />)}
      </div>
    </>
  );
}

export default SaucesList;
