import { CreateSaucePayload, Sauce } from '../types/Sauce';
import SauceForm from '../components/SauceForm';
import { Modal } from '../components/Modal';
import { useState } from 'react';
import SaucesDataService from '../utils/SaucesServices';

interface Props {
  handleNewSauce: (sauce: Sauce) => void;
}

export function AddSauceSection({ handleNewSauce }: Props) {
  const [sauceFormActive, setsauceFormActive] = useState(false);

  const handleSubmit = async (newSauceData: CreateSaucePayload) => {
    try {
      const formdata = new FormData();
      Object.entries(newSauceData).forEach(([k, v]) => {
        if (k === 'imageUrl') {
          formdata.append('imageUrl', v as File);
        }
        formdata.append(k, v.toString());
      });
      const newSauce = await SaucesDataService.createOne(newSauceData);
      handleNewSauce(newSauce);
    } catch (error) {
      console.error(error);
    } finally {
      setsauceFormActive(false);
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
    </>
  );
}
